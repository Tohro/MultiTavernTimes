FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS base
USER $APP_UID
WORKDIR /app
EXPOSE 5270
EXPOSE 5001

FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
ARG BUILD_CONFIGURATION=Release
WORKDIR /src
COPY ["Backend/MTT.API/MTT.API.csproj", "Backend/MTT.API/"]
COPY Backend/MTT.Domain.DependencyInjection/MTT.Domain.DependencyInjection.csproj Backend/MTT.Domain.DependencyInjection/
COPY Backend/MTT.Storage.DependencyInjection/MTT.Storage.DependencyInjection.csproj Backend/MTT.Storage.DependencyInjection/
COPY Backend/MTT.Domain/MTT.Domain.csproj Backend/MTT.Domain/
COPY Backend/MTT.Storage/MTT.Storage.csproj Backend/MTT.Storage/
RUN dotnet restore "Backend/MTT.API/MTT.API.csproj"
COPY . .
WORKDIR "/src/Backend/MTT.API"
RUN dotnet build "MTT.API.csproj" -c $BUILD_CONFIGURATION -o /app/build

FROM build AS publish
ARG BUILD_CONFIGURATION=Release
RUN dotnet publish "MTT.API.csproj" -c $BUILD_CONFIGURATION -o /app/publish /p:UseAppHost=false

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENV ASPNETCORE_URLS=http://+:5270
ENTRYPOINT ["dotnet", "MTT.API.dll"]
