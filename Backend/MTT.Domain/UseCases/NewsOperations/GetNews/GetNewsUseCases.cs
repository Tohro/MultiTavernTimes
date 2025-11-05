using MediatR;
using Microsoft.Extensions.Logging;
using MTT.Domain.Model;

namespace MTT.Domain.UseCases.NewsOperations.GetNews;

public class GetNewsUseCases(
    ILogger<GetNewsUseCases> logger,
    IUnitOfWork unitOfWork)
    : IRequestHandler<GetNewsByIdQuery, Result<News>>
{
    public Task<Result<News>> Handle(GetNewsByIdQuery request, CancellationToken cancellationToken)
    {
        throw new NotImplementedException();
    }
}