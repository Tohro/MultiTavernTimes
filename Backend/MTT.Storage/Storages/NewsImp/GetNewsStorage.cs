using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using MTT.Domain.Model;
using MTT.Domain.UseCases.NewsOperations.GetNews;

namespace MTT.Storage.Storages.NewsImp;

internal class GetNewsStorage(
    DbNewsContext context,
    IGuidFactory guidFactory,
    ILogger<GetNewsStorage> logger) : IGetNewsStorage
{
    public async Task<News?> GetNewsByIdAsync(Guid newsId, string language, CancellationToken cancellationToken)
    {
        var entity = await context.News
            .Include(n => n.Translations)
            .Where(n => n.NewsId == newsId)
            .Select(n => new
            {
                n.NewsId,
                n.ImageFileName,
                n.CreatedAt,
                n.ModifiedAt,
                Translation = n.Translations.FirstOrDefault(t => t.Language == language)
            })
            .FirstOrDefaultAsync(cancellationToken);

        if (entity?.Translation is null)
            return null;

        return new News
        {
            NewsId = entity.NewsId,
            ImageFileName = entity.ImageFileName,
            Language = entity.Translation.Language,
            Title = entity.Translation.Title,
            Subtitle = entity.Translation.Subtitle,
            Text = entity.Translation.Text,
            CreatedAt = entity.CreatedAt,
            ModifiedAt = entity.ModifiedAt
        };
    }

    public async Task<(IEnumerable<News>,int totalCount)> GetNewsListAsync(string language, int skip, int take, CancellationToken token)
    {
        var query = context.News
            .Where(n => n.Translations.Any(t => t.Language == language));

        var totalCount = await query.CountAsync(token);

        var entities = await query
            .Select(n => new {
                n.NewsId,
                n.ImageFileName,
                n.CreatedAt,
                n.ModifiedAt,
                Translation = n.Translations
                    .Where(t => t.Language == language)
                    .Select(t => new {
                        t.Language,
                        t.Title,
                        t.Subtitle,
                        t.Text
                    })
                    .FirstOrDefault()
            })
            .OrderByDescending(n => n.CreatedAt)
            .Skip(skip)
            .Take(take)
            .ToListAsync(token);

        return (entities.Select(x => new News {
            NewsId = x.NewsId,
            ImageFileName = x.ImageFileName,
            Language = x.Translation!.Language,
            Title = x.Translation.Title,
            Subtitle = x.Translation.Subtitle,
            Text = x.Translation.Text,
            CreatedAt = x.CreatedAt,
            ModifiedAt = x.ModifiedAt
        }), totalCount);
    }
}