FROM mcr.microsoft.com/mssql/server:2019-CU3-ubuntu-18.04

# Bundle app source
COPY . /app

# Grant permissions for the import-data script to be executable
USER root
RUN chmod +x /app/initialize_database.sh

# Switch back to mssql user and run the entrypoint script
USER mssql
ENTRYPOINT /bin/bash /app/entrypoint.sh $MSSQL_SA_PASSWORD $DATABASE $USER $PASSWORD