IF NOT EXISTS (SELECT * FROM sys.databases WHERE name = '$(Database)')
    BEGIN
        CREATE DATABASE [$(Database)];
    END
GO

IF NOT EXISTS (SELECT loginname FROM MASTER.dbo.syslogins WHERE NAME = '$(User)' AND dbname = '$(Database)')
    BEGIN
        USE [$(Database)]
        CREATE LOGIN [$(User)] with password = '$(Password)', 
            CHECK_POLICY = OFF, 
            CHECK_EXPIRATION = OFF, 
            DEFAULT_DATABASE=[$(Database)];
    END

IF NOT EXISTS (SELECT * FROM sys.database_principals WHERE NAME = '$(User)')
    BEGIN
        USE [$(Database)]
        CREATE USER [$(User)] FROM LOGIN [$(User)];
        exec sp_addrolemember 'db_owner', '$(User)'
    END

