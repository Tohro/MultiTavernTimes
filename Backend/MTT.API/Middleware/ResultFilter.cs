using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.AspNetCore.Mvc.Infrastructure;
using MTT.API.Infrastructure;
using MTT.Domain.UseCases;

namespace MTT.API.Middleware;

public class ResultFilter(ProblemDetailsFactory detailsFactory, ILogger<ResultFilter> logger) : IAsyncResultFilter
{
    public async Task OnResultExecutionAsync(ResultExecutingContext context, ResultExecutionDelegate next)
    {
        if (context.Result is ObjectResult objectResult)
        {
            var resultType = objectResult.Value?.GetType();
            if (resultType is not null &&
                resultType.IsGenericType &&
                resultType.GetGenericTypeDefinition() == typeof(Result<>))
            {
                var successProp = resultType.GetProperty("Success");
                var errorMessageProp = resultType.GetProperty("ErrorMessage");
                var valueProp = resultType.GetProperty("Value");

                var success = (bool?)successProp?.GetValue(objectResult.Value) ?? false;
                var error = (string?)errorMessageProp?.GetValue(objectResult.Value);
                var value = valueProp?.GetValue(objectResult.Value);

                if (success)
                {
                    logger.LogInformation("Successful ResultFilter execution. Type: {ValueType}, Path: {Path}",
                        value?.GetType().Name ?? "unknown", context.HttpContext.Request.Path);

                    context.Result = new ObjectResult(value)
                    {
                        DeclaredType = value?.GetType() ?? typeof(object),
                        StatusCode = StatusCodes.Status200OK,
                        ContentTypes = { "application/json" }
                    };
                }
                else
                {
                    var problemDetails = detailsFactory.CreateFromEmptyData(context.HttpContext, error);

                    logger.LogWarning("Failed ResultFilter execution. Status: {Status}, Detail: {Detail}, Path: {Path}",
                        problemDetails.Status, problemDetails.Detail, context.HttpContext.Request.Path);

                    context.Result = new ObjectResult(problemDetails)
                    {
                        DeclaredType = typeof(ProblemDetails),
                        StatusCode = problemDetails.Status,
                        ContentTypes = { "application/json" }
                    };
                }
            }
        }

        await next();
    }
}