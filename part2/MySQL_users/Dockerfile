FROM mysql

COPY create_schema_users.sql /docker-entrypoint-initdb.d/
COPY populate_database_users.sql /docker-entrypoint-initdb.d/