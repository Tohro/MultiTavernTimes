using MediatR;
using Microsoft.Extensions.Logging;
using MTT.Domain.Model;

namespace MTT.Domain.UseCases.NewsOperations.UpdateNews;

public class UpdateNewsUseCase(
    ILogger<UpdateNewsUseCase> logger,
    IUnitOfWork unitOfWork)
    : IRequestHandler<UpdateNewsCommand,Result<News>>
{
    public async Task<Result<News>> Handle(UpdateNewsCommand request, CancellationToken cancellationToken)
    {
        await using var scope = await unitOfWork.StartScope(cancellationToken);
        
        var newsStorage = scope.GetStorage<IUpdateNewsStorage>();
        
        var newsCreated = await newsStorage.UpdateNewsAsync(
            request.NewsId,
            request.ImageFileName,
            request.Language,
            request.Title,
            request.Subtitle,
            request.Text,
            cancellationToken);
        
        if (newsCreated == null)
            return Result<News>.Fail($"Новость {request.NewsId} не найдена");

        await scope.Commit(cancellationToken);

        return Result<News>.Ok(newsCreated);
    }
}
