#!/bin/bash

# Setup SSL certificate for 0sokrat0.ru using Let's Encrypt

# Install certbot if not installed
if ! command -v certbot &> /dev/null; then
    echo "Installing certbot..."
    apt update
    apt install -y certbot python3-certbot-nginx
fi

# Create nginx directory for SSL
mkdir -p /etc/nginx/ssl

# Get SSL certificate
echo "Getting SSL certificate for 0sokrat0.ru..."
certbot certonly --nginx -d 0sokrat0.ru -d www.0sokrat0.ru --non-interactive --agree-tos --email admin@0sokrat0.ru

# Copy certificates to nginx directory
if [ -f "/etc/letsencrypt/live/0sokrat0.ru/fullchain.pem" ]; then
    cp /etc/letsencrypt/live/0sokrat0.ru/fullchain.pem /etc/nginx/ssl/0sokrat0.ru.crt
    cp /etc/letsencrypt/live/0sokrat0.ru/privkey.pem /etc/nginx/ssl/0sokrat0.ru.key
    echo "SSL certificates copied successfully!"
else
    echo "Failed to get SSL certificates. Please check your domain configuration."
    exit 1
fi

# Test nginx configuration
nginx -t

# Reload nginx
systemctl reload nginx

echo "SSL setup completed! Your site should now be available at https://0sokrat0.ru"
