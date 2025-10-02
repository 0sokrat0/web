# Настройка SSL для 0sokrat0.ru

## Автоматическая настройка

Для автоматической настройки SSL сертификата Let's Encrypt выполните:

```bash
# 1. Убедитесь, что домен 0sokrat0.ru указывает на IP 46.31.24.155
nslookup 0sokrat0.ru

# 2. Запустите скрипт настройки SSL
sudo ./setup-ssl-letsencrypt.sh
```

## Ручная настройка

### 1. Проверка DNS
Убедитесь, что домен `0sokrat0.ru` и `www.0sokrat0.ru` указывают на IP `46.31.24.155`:

```bash
nslookup 0sokrat0.ru
nslookup www.0sokrat0.ru
```

### 2. Установка Certbot
```bash
sudo apt update
sudo apt install -y certbot python3-certbot-nginx
```

### 3. Получение сертификата
```bash
# Остановите nginx контейнер
docker stop project-exchange-nginx

# Получите сертификат
sudo certbot certonly --standalone \
    --email admin@0sokrat0.ru \
    --agree-tos \
    --no-eff-email \
    --domains 0sokrat0.ru,www.0sokrat0.ru \
    --non-interactive
```

### 4. Настройка nginx
```bash
# Создайте директории для сертификатов
sudo mkdir -p /etc/nginx/ssl

# Скопируйте сертификаты
sudo cp /etc/letsencrypt/live/0sokrat0.ru/fullchain.pem /etc/nginx/ssl/0sokrat0.ru.crt
sudo cp /etc/letsencrypt/live/0sokrat0.ru/privkey.pem /etc/nginx/ssl/0sokrat0.ru.key

# Установите права доступа
sudo chmod 644 /etc/nginx/ssl/0sokrat0.ru.crt
sudo chmod 600 /etc/nginx/ssl/0sokrat0.ru.key
```

### 5. Запуск с SSL
```bash
# Запустите приложение с SSL
docker compose -f docker-compose.ssl.yaml up -d
```

### 6. Автообновление сертификата
```bash
# Добавьте задачу в cron для автообновления
echo "0 */12 * * * root certbot renew --quiet --deploy-hook 'docker restart project-exchange-nginx'" | sudo tee /etc/cron.d/certbot-renew
```

## Проверка SSL

После настройки проверьте:

1. **HTTPS доступность**: https://0sokrat0.ru
2. **HTTP редирект**: http://0sokrat0.ru → https://0sokrat0.ru
3. **WWW редирект**: https://www.0sokrat0.ru → https://0sokrat0.ru
4. **SSL сертификат**: Используйте [SSL Labs](https://www.ssllabs.com/ssltest/) для проверки

## Устранение проблем

### Ошибка "Domain not pointing to this server"
- Проверьте DNS записи для домена
- Убедитесь, что A-запись указывает на правильный IP

### Ошибка "Port 80 already in use"
- Остановите nginx контейнер: `docker stop project-exchange-nginx`
- Или измените порт в docker-compose

### Ошибка "Certificate already exists"
- Удалите существующий сертификат: `sudo certbot delete --cert-name 0sokrat0.ru`
- Или используйте `--force-renewal` флаг

## Файлы конфигурации

- `nginx-ssl.conf` - Конфигурация nginx с SSL
- `docker-compose.ssl.yaml` - Docker Compose с SSL
- `setup-ssl-letsencrypt.sh` - Автоматический скрипт настройки

## Безопасность

SSL конфигурация включает:
- TLS 1.2 и 1.3
- Современные шифры
- HSTS заголовки
- X-Frame-Options
- X-Content-Type-Options
- X-XSS-Protection
- Referrer-Policy
