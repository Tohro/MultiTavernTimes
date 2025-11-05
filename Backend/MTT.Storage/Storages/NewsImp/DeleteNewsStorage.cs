using Microsoft.Extensions.Logging;
using MTT.Domain.UseCases.NewsOperations.DeleteNews;

namespace MTT.Storage.Storages.NewsImp;

internal class DeleteNewsStorage(
    DbNewsContext context,
    IGuidFactory guidFactory,
    ILogger<DeleteNewsStorage> logger) : IDeleteNewsStorage
{
    public async Task<Guid> DeleteNewsAsync(Guid newsId, CancellationToken cancellationToken)
    {
        var news = await context.News
            .FindAsync([newsId], cancellationToken);

        context.News.Remove(news);
        await context.SaveChangesAsync(cancellationToken);

        logger.LogInformation("Новость {NewsId} успешно удалена", newsId);

        return newsId;

    }
}