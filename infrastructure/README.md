# Database container setup

## Build and run everything
docker-compose up -d --build

## Build notes-web image:
docker build -t notes-web -f ./NotesWeb/Dockerfile ./NotesWeb/.

## Build notes-api image:
docker build -t notes-api -f ./NotesApi/Dockerfile ./NotesApi/.

## Build database image:
docker build -t mssql -f ./database-setup/Dockerfile ./database-setup/

## Create container with database params:
docker run -e 'ACCEPT_EULA=Y' -e 'MSSQL_SA_PASSWORD=SomePassword123' \
    -e 'DATABASE=NotesDatabase' -e 'USER=NotesUser' -e 'PASSWORD=NotesPassword' \
    --name 'mssql-notes' -p 9101:1433 \
    --restart always \
    -v mssqldata-notes:/var/opt/mssql \
    -d mssql