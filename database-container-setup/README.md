# Database container setup

## Build database image:
docker build -t mssql .

## Create container with database params:
docker run -e "ACCEPT_EULA=Y" -e "MSSQL_SA_PASSWORD=SomePassword!" \
    -e "DATABASE=NotesDatabase" -e "USER=NotesUser" -e "PASSWORD=NotesPassword" \
    --name 'mssql' -p 1500:1433 \
    --restart always \
    -v mssqldata:/var/opt/mssql \
    -d mssql