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
        base.OnModelCreating(modelBuilder);
    }
}