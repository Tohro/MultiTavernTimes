using MTT.Domain.Model;

namespace MTT.Domain.UseCases.NewsOperations.CreateNews;

public interface ICreateNewsStorage : IStorage
{
    Task<News> CreateNewsAsync(
        string imageName,
        string language,
        string title,
        string subtitle,
        string text,
        CancellationToken cancellationToken);
}