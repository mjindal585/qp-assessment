#!/bin/bash

echo "MySQL Host: $MYSQL_HOST"
echo "MySQL Port: $MYSQL_PORT"
echo "MySQL User: $MYSQL_USER"
echo "MySQL Password: $MYSQL_PASSWORD"

# mysql -h"$MYSQL_HOST" -P"$MYSQL_PORT" -u"$MYSQL_USER" -p"$MYSQL_PASSWORD" -e "SELECT 1;"


# Wait for MySQL to be ready
until mysql -h"$MYSQL_HOST" -P"$MYSQL_PORT" -u"$MYSQL_USER" -p"$MYSQL_PASSWORD" -e "SELECT 1;" &> /dev/null; do
  echo 'Waiting for MySQL to be ready...'
  sleep 1
done

echo 'MySQL is ready!'
