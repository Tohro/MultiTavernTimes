namespace MTT.API.Models;

public record News(
    Guid NewsId,
    string ImageFileName,
    string Language,
    string Title,
    string Subtitle,
    string Text,
    DateTimeOffset CreatedAt,
    DateTimeOffset ModifiedAt);
public record CreateNews(
    string ImageFileName,
    string Language,
    string Title,
    string Subtitle,
    string Text
    );
public record UpdateNews(
    Guid NewsId,
    string ImageFileName,
    string Language,
    string Title,
    string Subtitle,
    string Text
);