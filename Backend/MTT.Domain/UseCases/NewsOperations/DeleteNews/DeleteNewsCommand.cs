using FluentValidation;
using MediatR;

namespace MTT.Domain.UseCases.NewsOperations.DeleteNews;

public record DeleteNewsCommand(Guid NewsId): IRequest<Result<Guid>>;

public class DeleteNewsCommandValidator : AbstractValidator<DeleteNewsCommand>
{
    public DeleteNewsCommandValidator()
    {
        RuleFor(x => x.NewsId)
            .NotEmpty().WithMessage("Идентификатор новости обязателен.")
            .Must(id => id != Guid.Empty).WithMessage("Недопустимый идентификатор новости.");
    }
}