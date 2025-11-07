using FluentValidation;
using Microsoft.Extensions.DependencyInjection;
using MTT.Domain.UseCases.NewsOperations.CreateNews;
using MTT.Domain;

namespace MTT.Domain.DependencyInjection;


public static class ServiceCollectionExtensions
{
    public static IServiceCollection AddDomain(this IServiceCollection services)
    {

        services.AddValidatorsFromAssemblyContaining<CreateNewsCommandValidator>();

        services.AddMediatR(cfg =>
        {
            cfg.RegisterServicesFromAssemblyContaining<CreateNewsCommandValidator>();
            cfg.AddOpenBehavior(typeof(ValidationBehavior<,>));
        });

        return services;
    }
}
