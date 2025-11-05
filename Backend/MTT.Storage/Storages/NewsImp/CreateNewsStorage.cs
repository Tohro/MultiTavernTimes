using Microsoft.Extensions.Logging;
using MTT.Domain.UseCases.NewsOperations.CreateNews;
using MTT.Storage.Entities;
using News = MTT.Domain.Model.News;

namespace MTT.Storage.Storages.NewsImp;

internal class CreateNewsStorage (
    DbNewsContext context,
    IGuidFactory guidFactory,
    ILogger<CreateNewsStorage> logger) : ICreateNewsStorage
{
    public async Task<News> CreateNewsAsync(string imageName, string language, string title, string subtitle, string text,
        CancellationToken cancellationToken)
    {
      
        var newsId = guidFactory.GetGuid();
        var translationId = guidFactory.GetGuid();

        var news = new Entities.News
        {
            NewsId = newsId,
            ImageFileName = imageName
        };

        var translation = new NewsTranslation
        {
            TranslationId = translationId,
            NewsId = newsId,
            Language = language,
            Title = title,
            Subtitle = subtitle,
            Text = text
        };

        news.Translations.Add(translation);

        await context.News.AddAsync(news, cancellationToken);
        await context.SaveChangesAsync(cancellationToken);


        logger.LogInformation("Создана новость {NewsId} с переводом на {Language}", newsId, language);

        var newsDomain = new News
        {
            NewsId = news.NewsId,
            ImageFileName = news.ImageFileName,
            Language = translation.Language,
            Title = translation.Title,
            Subtitle = translation.Subtitle,
            Text = translation.Text
        };
        
        return newsDomain;
    }
}