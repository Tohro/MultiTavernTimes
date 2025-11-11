using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using MTT.Domain.UseCases.NewsOperations.UpdateNews;
using MTT.Storage.Entities;
using News = MTT.Domain.Model.News;

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
            .Include(n => n.Translations)
            .Where(n => n.NewsId == newsId)
            .FirstOrDefaultAsync(cancellationToken);



        if (news is null)
        {
            logger.LogWarning("Новость с переводом на язык {Language} не найдена", language);
            return null;
        }

        var translation = news.Translations.FirstOrDefault(t => t.Language == language);

        news.ModifiedAt = DateTimeOffset.UtcNow;

        if (translation is null)
        {
            // Добавляем новый перевод
            translation = new NewsTranslation
            {
                TranslationId = guidFactory.GetGuid(),
                Language = language,
                Title = title,
                Subtitle = subtitle,
                Text = text,
                NewsId = news.NewsId
            };
            // Явно указываем EF, что это новая сущность
            context.Entry(translation).State = EntityState.Added;
            
            logger.LogInformation("Добавлен новый перевод для языка {Language}", language);
        }
        else
        {
            // Обновляем существующий перевод
            translation.Title = title;
            translation.Subtitle = subtitle;
            translation.Text = text;
            
            // Явно указываем, что сущность изменилась
            context.Entry(translation).State = EntityState.Modified;

            logger.LogInformation("Обновлен перевод для языка {Language}", language);
        }

        

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