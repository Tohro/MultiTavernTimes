using Microsoft.EntityFrameworkCore.Storage;
using Microsoft.Extensions.DependencyInjection;
using MTT.Domain;
using MTT.Domain.UseCases;

namespace MTT.Storage;

internal class UnitOfWork(IServiceProvider serviceProvider) : IUnitOfWork
{
    public async Task<IUnitOfWorkScope> StartScope(CancellationToken cancellationToken)
    {
        var scope =  serviceProvider.CreateAsyncScope();
        var dbContext = scope.ServiceProvider.GetRequiredService<DbNewsContext>();
        var transaction = await dbContext.Database.BeginTransactionAsync(cancellationToken);
        
        return new UnitOfWorkScope(scope, transaction);
    }
}

internal class UnitOfWorkScope(
    IServiceScope scope,
    IDbContextTransaction transaction) : IUnitOfWorkScope
{
    public TStorage GetStorage<TStorage>() where TStorage : IStorage =>
        scope.ServiceProvider.GetRequiredService<TStorage>();

    public Task Commit(CancellationToken cancellationToken) =>
        transaction.CommitAsync(cancellationToken);

    public async ValueTask DisposeAsync()
    {
        await transaction.DisposeAsync();
        if (scope is IAsyncDisposable scopeAsyncDisposable)
            await scopeAsyncDisposable.DisposeAsync();
        else
            scope.Dispose();
    }
}