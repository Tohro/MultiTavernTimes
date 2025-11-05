using MTT.Domain.Model;

namespace MTT.Domain.UseCases.NewsOperations.GetNews;

public interface IGetNewsStorage : IStorage
{
    Task<News?> GetNewsByIdAsync(Guid newsId,string language,CancellationToken cancellationToken);
    Task<IEnumerable<News>> GetNewsListAsync(string language,int skip,int take,CancellationToken token);
}