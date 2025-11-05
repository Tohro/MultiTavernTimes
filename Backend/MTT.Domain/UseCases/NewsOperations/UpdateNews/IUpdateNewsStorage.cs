using MediatR;
using MTT.Domain.Model;

namespace MTT.Domain.UseCases.NewsOperations.UpdateNews;

public interface IUpdateNewsStorage : IStorage
{
    Task<News?> UpdateNewsAsync(
        Guid newsId,
        string imageFileName,
        string language,
        string title,
        string subtitle,
        string text,
        CancellationToken cancellationToken
    );

}