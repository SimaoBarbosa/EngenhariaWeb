FROM mysql

COPY create_schema_events.sql /docker-entrypoint-initdb.d/
COPY populate_database_events.sql /docker-entrypoint-initdb.d/