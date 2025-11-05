using MediatR;
using MTT.Domain.Model;

namespace MTT.Domain.UseCases.NewsOperations.UpdateNews;

public record UpdateNewsCommand(
    Guid NewsId,
    string ImageFileName,
    string Language,
    string Title,
    string Subtitle,
    string Text
) : IRequest<Result<News>>;