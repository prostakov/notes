# Build scripts

## Build notes-web image:
docker build -t prostakov/notes-web:latest -f ./NotesWeb/Dockerfile ./NotesWeb/.

## Build notes-api image:
docker build -t prostakov/notes-api:latest -f ./NotesApi/Dockerfile ./NotesApi/.

## Build database image:
docker build -t prostakov/mssql:latest -f ./database-setup/Dockerfile ./database-setup/

# Launch from release compose file (copy docker-compose.release.yml and release.env first):
docker-compose -f docker-compose.release.yml --env-file release.env up -d