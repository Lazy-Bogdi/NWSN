#!/bin/sh
set -e

# Wait for MySQL to be ready
until nc -z -v -w30 mysql 3306; do
  echo 'Waiting for MySQL...'
  sleep 1
done
echo "MySQL is up and running"

# Install dependencies
composer install --no-interaction --optimize-autoloader
# Create the database if it doesn't exist
php bin/console doctrine:database:create --if-not-exists

# Run migrations
# php bin/console doctrine:migrations:diff --no-interaction --allow-empty-diff
# php bin/console doctrine:migrations:migrate --no-interaction 

# Jwt tokens
php bin/console lexik:jwt:generate-keypair --skip-if-exists

# Start PHP-FPM
php-fpm
