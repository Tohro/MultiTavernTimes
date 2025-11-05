using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace MTT.Storage.Entities.EFTableConf;

public class NewsTranslationConfiguration : IEntityTypeConfiguration<NewsTranslation>
{
    public void Configure(EntityTypeBuilder<NewsTranslation> builder)
    {
        builder.ToTable("news_translation");

        builder.HasKey(t => t.TranslationId);
        builder.Property(t => t.TranslationId)
            .HasColumnName("translation_id")
            .IsRequired();

        builder.Property(t => t.NewsId)
            .HasColumnName("news_id")
            .IsRequired();

        builder.Property(t => t.Language)
            .HasColumnName("language")
            .HasMaxLength(5)
            .IsRequired();

        builder.Property(t => t.Title)
            .HasColumnName("title")
            .HasMaxLength(150)
            .IsRequired();

        builder.Property(t => t.Subtitle)
            .HasColumnName("subtitle")
            .HasMaxLength(250);

        builder.Property(t => t.Text)
            .HasColumnName("text")
            .IsRequired();

        //Уникальный индекс: один перевод на один язык для одной новости
        builder.HasIndex(t => new { t.NewsId, t.Language })
            .IsUnique()
            .HasDatabaseName("IX_news_translation_unique_language_per_news");
    }
}
