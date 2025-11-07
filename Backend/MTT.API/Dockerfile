FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS base
USER $APP_UID
WORKDIR /app
EXPOSE 5000
EXPOSE 5001

FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
ARG BUILD_CONFIGURATION=Release
WORKDIR /src/Backend
COPY ["MTN.API/MTN.API.csproj", "MTN.API/"]
COPY MTN.Domain.DependencyInjection/Loan.Domain.DependencyInjection.csproj MTN.Domain.DependencyInjection/
COPY MTN.Storage.DependencyInjection/Loan.Storage.DependencyInjection.csproj MTN.Storage.DependencyInjection/
COPY MTN.Domain/Loan.Domain.csproj MTN.Domain/
COPY MTN.Storage/Loan.Storage.csproj MTN.Storage/
RUN dotnet restore "MTN.API/MTN.API.csproj"
COPY . .
WORKDIR "/src/MTN.API"
RUN dotnet build "MTN.API.csproj" -c $BUILD_CONFIGURATION -o /app/build

FROM build AS publish
ARG BUILD_CONFIGURATION=Release
RUN dotnet publish "MTN.API.csproj" -c $BUILD_CONFIGURATION -o /app/publish /p:UseAppHost=false

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENV ASPNETCORE_URLS=http://+:5000
ENTRYPOINT ["dotnet", "MTN.API.dll"]
