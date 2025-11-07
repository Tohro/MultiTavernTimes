using FluentValidation;
using MediatR;
using Microsoft.Extensions.Logging;

namespace MTT.Domain;

internal class ValidationBehavior<TRequest,TResponse>(
    IValidator<TRequest> validator,
    ILogger<ValidationBehavior<TRequest,TResponse>> logger) 
    : IPipelineBehavior<TRequest,TResponse>
    where TRequest : IRequest<TResponse>
{
    
    
    public async Task<TResponse> Handle(TRequest request, RequestHandlerDelegate<TResponse> next, CancellationToken cancellationToken)
    {

        try
        {
            await validator.ValidateAndThrowAsync(request, cancellationToken);
            var res = await next.Invoke();
            logger.LogInformation("Command successfully handled {Command}", request);

            return res;
        }
        catch (Exception e)
        {
            logger.LogError(e,"Unhandled error caught while handling command {Command}",request);
            throw;
        }
    }
}