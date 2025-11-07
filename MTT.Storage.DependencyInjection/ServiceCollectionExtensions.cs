using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using MTT.Domain.UseCases;
using MTT.Domain.UseCases.NewsOperations.CreateNews;
using MTT.Domain.UseCases.NewsOperations.DeleteNews;
using MTT.Domain.UseCases.NewsOperations.GetNews;
using MTT.Domain.UseCases.NewsOperations.UpdateNews;
using MTT.Storage.Storages;
using MTT.Storage.Storages.NewsImp;

namespace MTT.Storage.DependencyInjection;

public static class ServiceCollectionExtensions
{
    public static IServiceCollection AddDomainStorage(this IServiceCollection services, string? dbConnectionString)
    {
        services.AddDbContextPool<DbNewsContext>(x => x.UseNpgsql(dbConnectionString))
            .AddScoped<IGuidFactory, GuidFactory>();
    
        services.AddScoped<ICreateNewsStorage, CreateNewsStorage>()
            .AddScoped<IGetNewsStorage, GetNewsStorage>()
            .AddScoped<IDeleteNewsStorage, DeleteNewsStorage>()
            .AddScoped<IUpdateNewsStorage, UpdateNewsStorage>();

      
        services.AddSingleton<IUnitOfWork>(s => new UnitOfWork(s));
        return services;
    }
}