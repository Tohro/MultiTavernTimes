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
        //TODO проверки try или глобальный
        await using var scope = await unitOfWork.StartScope(cancellationToken);
        
        var newsStorage = scope.GetStorage<IDeleteNewsStorage>();

        var newsId = await newsStorage.DeleteNewsAsync(request.NewsId,cancellationToken);
        
        if (newsId == Guid.Empty)
        {
            return Result<Guid>.Fail($"Новость {request.NewsId} не найдена");
        }
        await scope.Commit(cancellationToken);
        
        return Result<Guid>.Ok(newsId);  
      
    }
}