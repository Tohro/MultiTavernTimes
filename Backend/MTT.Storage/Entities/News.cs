namespace MTT.Storage.Entities;

public class News
{
    public Guid NewsId { get; set; }
    public ICollection<NewsTranslation> Translations { get; set; } = new List<NewsTranslation>();
    
    public string ImageFileName { get; set; }
}

public class NewsTranslation
{
    public Guid TranslationId { get; set; }
    public Guid NewsId { get; set; } 


    public string Language { get; set; } = "ru"; // "en", "ru", etc.
    
    public string Title { get; set; } = string.Empty;

    public string Subtitle { get; set; }
    public string Text { get; set; } = string.Empty;
}