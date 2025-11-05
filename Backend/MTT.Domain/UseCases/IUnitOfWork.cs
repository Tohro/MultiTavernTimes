namespace MTT.Domain.UseCases;

public interface IUnitOfWork
{
    Task<IUnitOfWorkScope> StartScope(CancellationToken cancellationToken);
}

public interface IUnitOfWorkScope : IAsyncDisposable
{
    TStorage GetStorage<TStorage>() where TStorage : IStorage;
    Task Commit(CancellationToken cancellationToken);
}