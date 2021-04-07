# https://hub.docker.com/_/microsoft-dotnet
FROM mcr.microsoft.com/dotnet/sdk:5.0 AS build
WORKDIR /src

# copy csproj and restore as distinct layers
COPY src/*.sln .
COPY src/NotesApi/*.csproj ./NotesApi/
RUN dotnet restore

# copy everything else and build app
COPY src/NotesApi/. ./NotesApi/
WORKDIR /src/NotesApi
RUN dotnet clean
RUN dotnet build
RUN dotnet publish -c release -o /app --no-restore

# final stage/image
FROM mcr.microsoft.com/dotnet/aspnet:5.0
RUN apt-get update && apt-get install -y wget && rm -rf /var/lib/apt/lists/*
WORKDIR /app
COPY --from=build /app ./
ENTRYPOINT ["dotnet", "NotesApi.dll"]