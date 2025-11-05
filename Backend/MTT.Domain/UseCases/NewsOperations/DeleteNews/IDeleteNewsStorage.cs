namespace MTT.Domain.UseCases.NewsOperations.DeleteNews;

public interface IDeleteNewsStorage : IStorage
{
    Task<Guid> DeleteNewsAsync(Guid newsId, CancellationToken cancellationToken);
}