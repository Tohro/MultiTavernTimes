using FluentValidation;
using MediatR;
using MTT.Domain.Model;

namespace MTT.Domain.UseCases.NewsOperations.GetNews;

public record GetNewsByIdQuery(Guid NewsId,string Language) : IRequest<Result<News>>;

public record GetNewsListQuery(string Language,int Skip,int Take):IRequest<Result<IEnumerable<News>>>;


public class GetNewsByIdQueryValidator : AbstractValidator<GetNewsByIdQuery>
{
    public GetNewsByIdQueryValidator()
    {
        RuleFor(x => x.Language)
            .NotEmpty().WithMessage("Язык обязателен.")
            .Length(2, 5).WithMessage("Код языка должен быть от 2 до 5 символов.")
            .Matches("^[a-z]{2}(-[A-Z]{2})?$").WithMessage("Неверный формат языка (например, 'ru' или 'en-US').");
        
        RuleFor(x => x.NewsId)
            .NotEmpty().WithMessage("Идентификатор новости обязателен.")
            .Must(id => id != Guid.Empty).WithMessage("Недопустимый идентификатор новости.");
    }
}


public class GetNewsListQueryValidator : AbstractValidator<GetNewsListQuery>
{
    public GetNewsListQueryValidator()
    {
        RuleFor(x => x.Language)
            .NotEmpty().WithMessage("Язык обязателен.")
            .Length(2, 5).WithMessage("Код языка должен быть от 2 до 5 символов.")
            .Matches("^[a-z]{2}(-[A-Z]{2})?$").WithMessage("Неверный формат языка (например, 'ru' или 'en-US').");
        
        RuleFor(x => x.Skip)
            .GreaterThanOrEqualTo(0).WithMessage("Параметр Skip не может быть отрицательным.");

        RuleFor(x => x.Take)
            .GreaterThan(0).WithMessage("Параметр Take должен быть больше нуля.")
            .LessThanOrEqualTo(100).WithMessage("Максимальное количество элементов за запрос — 100.");
    }
}
