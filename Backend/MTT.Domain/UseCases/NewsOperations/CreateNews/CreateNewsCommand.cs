using FluentValidation;
using MediatR;
using MTT.Domain.Model;

namespace MTT.Domain.UseCases.NewsOperations.CreateNews;

public record CreateNewsCommand(
        string ImageFileName,
        string Language,
        string Title,
        string Subtitle,
        string Text
        ) : IRequest<Result<News>>;
        
        
public class CreateNewsCommandValidator : AbstractValidator<CreateNewsCommand>
{
    public CreateNewsCommandValidator()
    {
        RuleFor(x => x.Language)
            .NotEmpty().WithMessage("Язык обязателен.")
            .Length(2, 5).WithMessage("Код языка должен быть от 2 до 5 символов.")
            .Matches("^[a-z]{2}(-[A-Z]{2})?$").WithMessage("Неверный формат языка (например, 'ru' или 'en-US').");

        RuleFor(x => x.Title)
            .NotEmpty().WithMessage("Заголовок обязателен.")
            .MaximumLength(150).WithMessage("Заголовок не должен превышать 150 символов.");

        RuleFor(x => x.Subtitle)
            .MaximumLength(250).WithMessage("Подзаголовок не должен превышать 250 символов.");

        RuleFor(x => x.Text)
            .NotEmpty().WithMessage("Текст новости обязателен.")
            .MinimumLength(20).WithMessage("Текст должен содержать минимум 20 символов.");
    }
}
