CREATE USER 'betess'@'%' IDENTIFIED BY 'pass';
GRANT ALL PRIVILEGES ON betess_users.* TO 'betess'@'%' WITH GRANT OPTION;
GRANT ALL PRIVILEGES ON betess_events.* TO 'betess'@'%' WITH GRANT OPTION;
ALTER USER 'betess'@'%' IDENTIFIED WITH mysql_native_password BY 'pass';
FLUSH PRIVILEGES;
