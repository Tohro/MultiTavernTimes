using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.EntityFrameworkCore;
using MTT.API.Middleware;
using MTT.Domain.DependencyInjection;
using MTT.Storage;
using MTT.Storage.DependencyInjection;

namespace MTT.API;

public class Program
{
    public static void Main(string[] args)
    {
        var builder = WebApplication.CreateBuilder(args);

        // Add services to the container.

        builder.Services.AddControllers(options =>
        {
            options.Filters.Add<ResultFilter>();
        });
        // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
        builder.Services.AddEndpointsApiExplorer();
        builder.Services.AddSwaggerGen();
        builder.Services.AddAuthorization();
        builder.Services.AddAuthentication(CookieAuthenticationDefaults.AuthenticationScheme)
            .AddCookie(CookieAuthenticationDefaults.AuthenticationScheme, options =>
            {
                options.Cookie.Name = "AdminAuth";
                options.Events = new CookieAuthenticationEvents
                {
                    OnRedirectToLogin = context =>
                    {
                        context.Response.StatusCode = 401;
                        return Task.CompletedTask;
                    },
                    OnRedirectToAccessDenied = context =>
                    {
                        context.Response.StatusCode = 403;
                        return Task.CompletedTask;
                    }
                };
            });

        
        // Добавляем CORS
        builder.Services.AddCors(options =>
        {
            options.AddPolicy("AllowFrontend", policy =>
            {
                var origins = builder.Configuration.GetSection("CORS:AllowedOrigins").Get<string[]>();
                policy.WithOrigins(origins ?? Array.Empty<string>())
                    .AllowAnyHeader()
                    .AllowAnyMethod();
            });
        });
        
        var zsConnection=builder.Configuration.GetConnectionString("Postgres");
        builder.Services.AddDomain().AddDomainStorage(zsConnection);
        builder.Services.AddTransient<DbNewsContext>();

        var app = builder.Build();

        // Configure the HTTP request pipeline.
        if (app.Environment.IsDevelopment())
        {
            app.UseSwagger();
            app.UseSwaggerUI();
            
            // Автоматическая миграция
            using (var scope = app.Services.CreateScope())
            {
                var db = scope.ServiceProvider.GetRequiredService<DbNewsContext>();
                db.Database.Migrate(); // применяет все доступные миграции
            }
        }
        // Используем CORS
        app.UseCors("AllowFrontend");

        //app.UseHttpsRedirection();
        app.MapControllers();
        app.UseAuthentication();
        app.UseAuthorization();


        app.MapControllers();
        app.UseMiddleware<ErrorHandlerMiddleware>();

        app.Run();
    }
}