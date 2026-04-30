# Stage 1: Build
FROM mcr.microsoft.com/dotnet/sdk:9.0 AS build
WORKDIR /src

# Copy project file and restore dependencies
COPY ["server.csproj", "./"]
RUN dotnet restore "server.csproj"

# Copy the rest of the code and publish
COPY . .
RUN dotnet publish "server.csproj" -c Release -o /app/publish /p:UseAppHost=false

# Stage 2: Runtime
FROM mcr.microsoft.com/dotnet/aspnet:9.0 AS final
WORKDIR /app
COPY --from=build /app/publish .

# Render provides the PORT environment variable. 
# ASP.NET Core can be configured to listen on this port.
# Defaulting to 8080 as it's the standard for .NET 8/9.
ENV ASPNETCORE_URLS=http://+:8080
EXPOSE 8080

ENTRYPOINT ["dotnet", "server.dll"]
