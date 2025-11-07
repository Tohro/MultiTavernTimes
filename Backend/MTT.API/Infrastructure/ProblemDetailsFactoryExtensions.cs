using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Infrastructure;
using Microsoft.AspNetCore.Mvc.ModelBinding;
using FluentValidation;

namespace MTT.API.Infrastructure;


public static class ProblemDetailsFactoryExtensions
{

    public static ProblemDetails CreateFromValidation(this ProblemDetailsFactory factory, 
        HttpContext context,
        ValidationException validationException,
        int code)
    {
        var modelStateDictionary = new ModelStateDictionary();

        foreach (var error in validationException.Errors)
        {
            modelStateDictionary.AddModelError(error.PropertyName,error.ErrorMessage);
        }
        
        return factory.CreateValidationProblemDetails(context, modelStateDictionary, code,
            "validation failed");
    }
    
    public static ProblemDetails CreateFromEmptyData(this ProblemDetailsFactory factory, HttpContext context,string? message) =>
        factory.CreateProblemDetails(context, StatusCodes.Status204NoContent,
            "Empty data", detail: message);
}