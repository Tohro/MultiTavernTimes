using FluentValidation;
using MediatR;
using MTT.Domain.Model;

namespace MTT.Domain.UseCases.NewsOperations.GetNews;

public record GetNewsByIdQuery(Guid NewsId) : IRequest<Result<News>>;

public record GetNewsListQuery(int Skip,int Take):IRequest<Result<IEnumerable<News>>>;


public class GetNewsByIdQueryValidator : AbstractValidator<GetNewsByIdQuery>
{
    public GetNewsByIdQueryValidator()
    {
        RuleFor(x => x.NewsId)
            .NotEmpty().WithMessage("Идентификатор новости обязателен.")
            .Must(id => id != Guid.Empty).WithMessage("Недопустимый идентификатор новости.");
    }
}


public class GetNewsListQueryValidator : AbstractValidator<GetNewsListQuery>
{
    public GetNewsListQueryValidator()
    {
        RuleFor(x => x.Skip)
            .GreaterThanOrEqualTo(0).WithMessage("Параметр Skip не может быть отрицательным.");

        RuleFor(x => x.Take)
            .GreaterThan(0).WithMessage("Параметр Take должен быть больше нуля.")
            .LessThanOrEqualTo(100).WithMessage("Максимальное количество элементов за запрос — 100.");
    }
}
