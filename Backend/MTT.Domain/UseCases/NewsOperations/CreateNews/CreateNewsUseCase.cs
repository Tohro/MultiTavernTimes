using MediatR;
using Microsoft.Extensions.Logging;
using MTT.Domain.Model;

namespace MTT.Domain.UseCases.NewsOperations.CreateNews;

public class CreateNewsUseCase(
    ILogger<CreateNewsUseCase> logger,
    IUnitOfWork unitOfWork)
    : IRequestHandler<CreateNewsCommand,Result<News>>
{
    public async Task<Result<News>> Handle(CreateNewsCommand request, CancellationToken cancellationToken)
    {
        await using var scope = await unitOfWork.StartScope(cancellationToken);
        
        var newsStorage = scope.GetStorage<ICreateNewsStorage>();
        
        var newsCreated = await newsStorage.CreateNewsAsync(
            request.ImageFileName,
            request.Language,
            request.Title,
            request.Subtitle,
            request.Text,
            cancellationToken);

        await scope.Commit(cancellationToken);

        return Result<News>.Ok(newsCreated);
    }
}