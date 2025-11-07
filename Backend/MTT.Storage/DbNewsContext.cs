using System.Reflection;
using Microsoft.EntityFrameworkCore;
using MTT.Storage.Entities;

namespace MTT.Storage;
public class DbNewsContext : DbContext
{
    public DbNewsContext() { }    
    public DbNewsContext(DbContextOptions options) : base(options) { }
    
    public DbSet<News> News { get; set; }
    public DbSet<NewsTranslation> NewsTranslations { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.ApplyConfigurationsFromAssembly(Assembly.GetExecutingAssembly());

        
        modelBuilder.Entity<News>().HasData(
            NewsSeedData.GetNews().Select(n => new
            {
                n.NewsId,
                n.CreatedAt,
                n.ModifiedAt,
                n.ImageFileName
            })
                .Cast<object>()
                .ToArray()
        );

        modelBuilder.Entity<NewsTranslation>().HasData(
            NewsSeedData.GetNews()
                .SelectMany(n => n.Translations.Select(t => new
                {
                    t.TranslationId,
                    t.NewsId,
                    t.Language,
                    t.Title,
                    t.Subtitle,
                    t.Text
                }))
                .Cast<object>()
                .ToArray()
        );
        
        base.OnModelCreating(modelBuilder);
    }
}