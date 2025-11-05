using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace MTT.Storage.Entities.EFTableConf;

public class NewsConfiguration : IEntityTypeConfiguration<News>
{
    public void Configure(EntityTypeBuilder<News> builder)
    {
        builder.ToTable("news");

        builder.HasKey(n => n.NewsId);
        builder.Property(n => n.NewsId)
            .HasColumnName("news_id")
            .IsRequired();

        builder.Property(n => n.ImageFileName)
            .HasColumnName("image_file_name")
            .HasMaxLength(255);

        builder.HasMany(n => n.Translations)
            .WithOne()
            .HasForeignKey(t => t.NewsId)
            .OnDelete(DeleteBehavior.Cascade);
    }
}
