# Wait to be sure that SQL Server came up
sleep 40s

# Run the setup script to create the DB and the schema in the DB
echo 'Start database initialization'
/opt/mssql-tools/bin/sqlcmd \
    -d master \
    -S localhost -U sa -P $1 \
    -v Database="$2" \
    -v User="$3" \
    -v Password="$4" \
    -i /app/initialize_database.sql
echo 'Database initialization has finished'