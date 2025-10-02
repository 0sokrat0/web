#!/bin/bash

# Скрипт для настройки SSL сертификата Let's Encrypt для домена 0sokrat0.ru

set -e

DOMAIN="0sokrat0.ru"
EMAIL="admin@0sokrat0.ru"  # Замените на ваш email
NGINX_CONTAINER="project-exchange-nginx"

echo "🔧 Настройка SSL сертификата для домена $DOMAIN"

# Проверяем, что домен указывает на сервер
echo "📡 Проверяем DNS запись для $DOMAIN..."
if ! nslookup $DOMAIN | grep -q "46.31.24.155"; then
    echo "❌ Ошибка: Домен $DOMAIN не указывает на IP 46.31.24.155"
    echo "Пожалуйста, настройте A-запись для $DOMAIN на IP 46.31.24.155"
    exit 1
fi

echo "✅ DNS запись настроена корректно"

# Устанавливаем Certbot
echo "📦 Устанавливаем Certbot..."
apt update
apt install -y certbot python3-certbot-nginx

# Останавливаем nginx контейнер
echo "🛑 Останавливаем nginx контейнер..."
docker stop $NGINX_CONTAINER || true

# Получаем сертификат
echo "🔐 Получаем SSL сертификат..."
certbot certonly --standalone \
    --email $EMAIL \
    --agree-tos \
    --no-eff-email \
    --domains $DOMAIN,www.$DOMAIN \
    --non-interactive

# Создаем директории для сертификатов
echo "📁 Создаем директории для сертификатов..."
mkdir -p /etc/nginx/ssl

# Копируем сертификаты
echo "📋 Копируем сертификаты..."
cp /etc/letsencrypt/live/$DOMAIN/fullchain.pem /etc/nginx/ssl/$DOMAIN.crt
cp /etc/letsencrypt/live/$DOMAIN/privkey.pem /etc/nginx/ssl/$DOMAIN.key

# Устанавливаем правильные права доступа
chmod 644 /etc/nginx/ssl/$DOMAIN.crt
chmod 600 /etc/nginx/ssl/$DOMAIN.key

# Обновляем nginx конфигурацию для SSL
echo "⚙️ Обновляем nginx конфигурацию..."
cat > /etc/nginx/conf.d/default.conf << 'EOF'
# HTTP to HTTPS redirect
server {
    listen 80;
    server_name 0sokrat0.ru www.0sokrat0.ru;
    
    # Redirect www to non-www
    if ($host = www.0sokrat0.ru) {
        return 301 https://0sokrat0.ru$request_uri;
    }
    
    # Redirect all HTTP to HTTPS
    return 301 https://$server_name$request_uri;
}

# HTTPS server
server {
    listen 443 ssl;
    http2 on;
    server_name 0sokrat0.ru www.0sokrat0.ru;
    
    # Redirect www to non-www
    if ($host = www.0sokrat0.ru) {
        return 301 https://0sokrat0.ru$request_uri;
    }
    
    # SSL configuration
    ssl_certificate /etc/nginx/ssl/0sokrat0.ru.crt;
    ssl_certificate_key /etc/nginx/ssl/0sokrat0.ru.key;
    
    # SSL security settings
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers ECDHE-RSA-AES128-GCM-SHA256:ECDHE-RSA-AES256-GCM-SHA384:ECDHE-RSA-AES128-SHA256:ECDHE-RSA-AES256-SHA384;
    ssl_prefer_server_ciphers off;
    ssl_session_cache shared:SSL:10m;
    ssl_session_timeout 10m;
    
    # Security headers
    add_header Strict-Transport-Security "max-age=31536000; includeSubDomains" always;
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header Referrer-Policy "strict-origin-when-cross-origin" always;
    
    # Frontend (Next.js)
    location / {
        proxy_pass http://frontend:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
        proxy_read_timeout 86400;
    }
    
    # Backend API
    location /api/ {
        proxy_pass http://backend:8080/;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
        proxy_read_timeout 86400;
    }
    
    # Health check
    location /health {
        proxy_pass http://backend:8080/health;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
    
    # Gzip compression
    gzip on;
    gzip_vary on;
    gzip_min_length 1024;
    gzip_proxied expired no-cache no-store private auth;
    gzip_types
        text/plain
        text/css
        text/xml
        text/javascript
        application/javascript
        application/xml+rss
        application/json;
}
EOF

# Запускаем nginx контейнер с SSL
echo "🚀 Запускаем nginx контейнер с SSL..."
cd /root/web
docker compose -f docker-compose.nginx.yaml up -d

# Настраиваем автообновление сертификата
echo "🔄 Настраиваем автообновление сертификата..."
cat > /etc/cron.d/certbot-renew << EOF
# Обновление SSL сертификата каждые 12 часов
0 */12 * * * root certbot renew --quiet --deploy-hook "docker restart $NGINX_CONTAINER"
EOF

# Проверяем статус
echo "✅ SSL сертификат настроен!"
echo "🌐 Сайт доступен по адресу: https://$DOMAIN"
echo "🔒 Сертификат будет автоматически обновляться каждые 12 часов"

# Показываем информацию о сертификате
echo "📋 Информация о сертификате:"
certbot certificates
