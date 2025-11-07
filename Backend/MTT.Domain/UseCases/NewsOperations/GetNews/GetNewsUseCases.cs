using MediatR;
using Microsoft.Extensions.Logging;
using MTT.Domain.Model;

namespace MTT.Domain.UseCases.NewsOperations.GetNews;

public class GetNewsUseCases(
    ILogger<GetNewsUseCases> logger,
    IUnitOfWork unitOfWork)
    : IRequestHandler<GetNewsByIdQuery, Result<News>>,
        IRequestHandler<GetNewsListQuery,Result<IEnumerable<News>>>
{
    public async Task<Result<News>> Handle(GetNewsByIdQuery request, CancellationToken cancellationToken)
    {
        await using var scope = await unitOfWork.StartScope(cancellationToken);
        
        var newsStorage = scope.GetStorage<IGetNewsStorage>();

        var news = await newsStorage.GetNewsByIdAsync(request.NewsId,request.Language,cancellationToken);
        
        if (news == null)
        {
            return Result<News>.Fail($"Новость {request.NewsId} не найдена");
        }
        await scope.Commit(cancellationToken);
        
        return Result<News>.Ok(news);
    }

    public async Task<Result<IEnumerable<News>>> Handle(GetNewsListQuery request, CancellationToken cancellationToken)
    {
        await using var scope = await unitOfWork.StartScope(cancellationToken);
        
        var newsStorage = scope.GetStorage<IGetNewsStorage>();

        var newsList = 
            await newsStorage.GetNewsListAsync(request.Language,request.Skip,request.Take,cancellationToken);
     
        await scope.Commit(cancellationToken);
        
        return Result<IEnumerable<News>>.Ok(newsList);
    }
}