# Развертывание с Nginx

## 🚀 Быстрый старт

### 1. Запуск приложения
```bash
# Запуск с Nginx
docker-compose -f docker-compose.nginx.yaml up -d --build

# Или локально без Nginx
docker-compose up -d --build
```

### 2. Настройка SSL (на сервере)
```bash
# Сделать скрипт исполняемым
chmod +x setup-ssl.sh

# Запустить настройку SSL
./setup-ssl.sh
```

## 🌐 Доступ к приложению

### Локально:
- **Frontend**: http://localhost:3001
- **Backend API**: http://localhost:8080
- **Swagger**: http://localhost:8080/swagger/index.html

### На домене (после настройки SSL):
- **Сайт**: https://0sokrat0.ru
- **API**: https://0sokrat0.ru/api
- **Swagger**: https://0sokrat0.ru/api/swagger/index.html

## 📋 Требования

1. **DNS**: Домен `0sokrat0.ru` должен указывать на IP сервера
2. **Порты**: 80 и 443 должны быть свободны
3. **Docker**: Установлен Docker и Docker Compose

## 🔧 Конфигурация

### Nginx конфигурация:
- **Файл**: `nginx.conf`
- **SSL**: Автоматическое перенаправление HTTP → HTTPS
- **WWW**: Автоматическое перенаправление www → non-www
- **Gzip**: Сжатие для лучшей производительности

### Переменные окружения:
```bash
# Секретный ключ для JWT
export SECRET_KEY="your-super-secret-jwt-key-change-this-in-production"
```

## 🛠️ Управление

```bash
# Остановка
docker-compose -f docker-compose.nginx.yaml down

# Просмотр логов
docker-compose -f docker-compose.nginx.yaml logs -f

# Перезапуск
docker-compose -f docker-compose.nginx.yaml restart
```

## 🔒 Безопасность

- Автоматическое обновление SSL сертификатов
- Security headers
- HTTPS принудительно
- Gzip сжатие
