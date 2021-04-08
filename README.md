# Database container setup

## Launch from release compose file (do not forget about .env file with variables)
docker-compose -f docker-compose.release.yml up -d

## Build and run everything
docker-compose up -d --build

## Build only notes-api image:
docker build -t notes-api -f ./NotesApi/Dockerfile ./NotesApi/.

## Build only database image:
docker build -t mssql -f ./database-setup/Dockerfile ./database-setup/

## Create container with database params:
docker run -e 'ACCEPT_EULA=Y' -e 'MSSQL_SA_PASSWORD=SomePassword123' \
    -e 'DATABASE=NotesDatabase' -e 'USER=NotesUser' -e 'PASSWORD=NotesPassword' \
    --name 'mssql-notes' -p 9101:1433 \
    --restart always \
    -v mssqldata-notes:/var/opt/mssql \
    -d mssql