using MediatR;
using Microsoft.Extensions.Logging;
using MTT.Domain.Model;
using MTT.Domain.UseCases.NewsOperations.CreateNews;

namespace MTT.Domain.UseCases.NewsOperations.DeleteNews;

public class DeleteNewsUseCase(
    ILogger<DeleteNewsUseCase> logger,
    IUnitOfWork unitOfWork)
    : IRequestHandler<DeleteNewsCommand, Result<Guid>>
{
    public async Task<Result<Guid>> Handle(DeleteNewsCommand request, CancellationToken cancellationToken)
    {
        await using var scope = await unitOfWork.StartScope(cancellationToken);
        
        var newsStorage = scope.GetStorage<IDeleteNewsStorage>();

        var news = await newsStorage.DeleteNewsAsync(request.NewsId,cancellationToken);
        
        await scope.Commit(cancellationToken);
        
        return Result<Guid>.Ok(news);  
      
    }
}