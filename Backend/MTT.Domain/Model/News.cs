namespace MTT.Domain.Model;

public class News
{
    public Guid NewsId { get; set; }
    public string ImageFileName { get; set; }
    public string Language { get; set; }
    public string Title { get; set; }
    public string Subtitle { get; set; }
    public string Text { get; set; }
}