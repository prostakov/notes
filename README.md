# Database container setup

## Set up database

### Build database image:
docker build -t mssql -f ./database-setup/Dockerfile.mssql ./database-setup/

### Create container with database params:
docker run -e 'ACCEPT_EULA=Y' -e 'MSSQL_SA_PASSWORD=SomePassword123' \
    -e 'DATABASE=NotesDatabase' -e 'USER=NotesUser' -e 'PASSWORD=NotesPassword' \
    --name 'mssql-notes' -p 9101:1433 \
    --restart always \
    -v mssqldata-notes:/var/opt/mssql \
    -d mssql