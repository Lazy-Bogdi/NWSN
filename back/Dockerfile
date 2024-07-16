# Use the official PHP image as base
FROM php:8.2-fpm

# Set working directory
WORKDIR /var/www/html

# Install system dependencies
RUN apt-get update && apt-get install -y \
    git \
    unzip \
    libpq-dev \
    libzip-dev \
    && docker-php-ext-install pdo pdo_mysql zip

# Install Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Copy existing application directory contents
COPY . /var/www/html

# Install PHP dependencies
RUN composer install --no-scripts --no-interaction --optimize-autoloader --no-dev

# Change ownership of application directory
RUN chown -R www-data:www-data /var/www/html

# Expose port 9000 and start php-fpm server
EXPOSE 9000

# Run make:migration and doctrine:migrations:migrate
CMD ["sh", "-c", "php bin/console doctrine:database:create --if-not-exists && php bin/console make:migration && php bin/console doctrine:migrations:migrate --no-interaction && php-fpm"]
