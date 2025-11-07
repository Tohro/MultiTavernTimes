using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Infrastructure;
using FluentValidation;
using MTT.API.Infrastructure;

namespace MTT.API.Middleware;

public class ErrorHandlerMiddleware
{
    private readonly RequestDelegate next;

    public ErrorHandlerMiddleware(RequestDelegate next)
    {
        this.next = next;
    }

    public async Task InvokeAsync(HttpContext context,
        ProblemDetailsFactory detailsFactory,
        ILogger<ErrorHandlerMiddleware> logger)
    {
        try
        {
            await next.Invoke(context);
        }
        catch (Exception exception)
        {
            logger.LogError(exception,
                "Error has happened with {RequestPath}, the message is {ErrorMessage}",
                context.Request.Path.Value,exception.Message);
            
            var httpStatusCode = exception switch
            {
                ValidationException => StatusCodes.Status400BadRequest,
                _ => StatusCodes.Status500InternalServerError
            };
            
            ProblemDetails problemDetails;
            switch (exception)
            {

                case ValidationException validationException :
                    problemDetails = detailsFactory.CreateFromValidation(context, validationException,httpStatusCode);
                    logger.LogError(validationException,"Somebody sent invalid request.");
                    break;
           
                 
                default:
                    problemDetails = detailsFactory.CreateProblemDetails(context,
                        StatusCodes.Status500InternalServerError, "Unhandled error! Nani");
                    logger.LogError(exception,"Unhandled exception occured");
                    break;
            };
            context.Response.StatusCode = problemDetails.Status?? StatusCodes.Status500InternalServerError;
            await context.Response.WriteAsJsonAsync(problemDetails,problemDetails.GetType());
        }
    }
}