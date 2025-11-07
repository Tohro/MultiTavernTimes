using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using MTT.Domain.Model;
using MTT.Domain.UseCases.NewsOperations.UpdateNews;

namespace MTT.Storage.Storages.NewsImp;

internal class UpdateNewsStorage(
    DbNewsContext context,
    IGuidFactory guidFactory,
    ILogger<UpdateNewsStorage> logger) : IUpdateNewsStorage
{
    public async Task<News?> UpdateNewsAsync(Guid newsId,string imageFileName, string language, string title, string subtitle, string text,
        CancellationToken cancellationToken)
    {
       
        // Ищем новость с нужным переводом
        var news = await context.News
            .Where(n=>n.NewsId==newsId)
            .Include(n => n.Translations)
            .Where(n => n.Translations.Any(t => t.Language == language))
            .FirstOrDefaultAsync(cancellationToken);

        if (news is null)
        {
            logger.LogWarning("Новость с переводом на язык {Language} не найдена", language);
            return null;
        }

        var translation = news.Translations.First(t => t.Language == language);

        news.ModifiedAt = DateTimeOffset.UtcNow;
        // Обновляем перевод
        translation.Title = title;
        translation.Subtitle = subtitle;
        translation.Text = text;
        

        // Обновляем изображение, если передано новое имя
        if (!string.IsNullOrWhiteSpace(imageFileName))
        {
            news.ImageFileName = imageFileName;
        }

        await context.SaveChangesAsync(cancellationToken);

        logger.LogInformation("Новость {NewsId} обновлена для языка {Language}", news.NewsId, language);

        var newsDomain = new News
        {
            NewsId = news.NewsId,
            ImageFileName = news.ImageFileName,
            Language = translation.Language,
            Title = translation.Title,
            Subtitle = translation.Subtitle,
            Text = translation.Text,
            CreatedAt = news.CreatedAt,
            ModifiedAt = news.ModifiedAt
        };
        
        return newsDomain;

    }
}