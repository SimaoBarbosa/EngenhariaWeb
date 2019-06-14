FROM mysql

COPY create_schema_users.sql /docker-entrypoint-initdb.d/
COPY populate_database_users.sql /docker-entrypoint-initdb.d/
COPY create_schema_events.sql /docker-entrypoint-initdb.d/
COPY populate_database_events.sql /docker-entrypoint-initdb.d/
COPY access.sql /docker-entrypoint-initdb.d/
COPY my.cnf /docker-entrypoint-initdb.d/
