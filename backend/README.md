# Биржа проектов (Project Exchange)

Учебный MVP платформы для поиска команды и участия в проектах.

## Технологии

### Backend
- **Go** с фреймворком Gin
- **SQLite** с GORM ORM
- **JWT** аутентификация
- **Swagger** документация

### Frontend
- **Next.js 14** с TypeScript
- **Tailwind CSS** для стилизации
- **React** для интерфейса

## Структура проекта

```
project-exchange/
├── backend/
│   ├── cmd/server/main.go          # Точка входа
│   ├── internal/
│   │   ├── handlers/               # HTTP обработчики
│   │   ├── models/                 # GORM модели
│   │   ├── database/               # Подключение к БД
│   │   ├── middleware/             # JWT middleware
│   │   └── routes/                 # Маршруты API
│   ├── docs/                       # Swagger документация
│   ├── go.mod                      # Go зависимости
│   └── config.env                  # Конфигурация
└── frontend/
    ├── app/                        # Next.js App Router
    ├── components/                 # React компоненты
    ├── lib/                        # Утилиты и API клиент
    └── package.json                # npm зависимости
```

## API Эндпоинты

### Аутентификация
- `POST /api/auth/register` - Регистрация
- `POST /api/auth/login` - Вход

### Пользователи
- `GET /api/users/:id` - Профиль пользователя
- `PUT /api/users/:id` - Обновить профиль (требует авторизации)

### Проекты
- `GET /api/projects` - Список проектов (с фильтрацией)
- `POST /api/projects` - Создать проект (требует авторизации)
- `GET /api/projects/:id` - Детали проекта
- `PUT /api/projects/:id` - Обновить проект (только владелец)
- `DELETE /api/projects/:id` - Удалить проект (только владелец)

### Участники
- `POST /api/projects/:id/apply` - Подать заявку на участие
- `POST /api/projects/:id/accept/:userId` - Принять участника (только владелец)

### Сообщения
- `GET /api/projects/:id/messages` - Получить сообщения проекта
- `POST /api/projects/:id/messages` - Отправить сообщение

## Быстрый старт

### Backend

1. Установите Go 1.21 или выше
2. Перейдите в корневую директорию проекта
3. Установите зависимости:
   ```bash
   go mod tidy
   ```
4. Скопируйте конфигурацию:
   ```bash
   cp config.env .env  # создайте .env из config.env
   ```
5. Запустите сервер:
   ```bash
   go run cmd/server/main.go
   ```

Сервер запустится на http://localhost:8080
Swagger документация: http://localhost:8080/swagger/index.html

### Frontend

1. Установите Node.js 18 или выше
2. Перейдите в папку frontend:
   ```bash
   cd frontend
   ```
3. Установите зависимости:
   ```bash
   npm install
   ```
4. Скопируйте конфигурацию:
   ```bash
   cp env.example .env.local
   ```
5. Запустите в режиме разработки:
   ```bash
   npm run dev
   ```

Frontend будет доступен на http://localhost:3000

## Модели данных

### User
- ID, Name, Email, PasswordHash
- Skills, Bio
- CreatedAt, UpdatedAt

### Project
- ID, OwnerID, Title, Description
- Category, Level (beginner/middle/expert)
- CreatedAt, UpdatedAt

### ProjectMember
- ID, ProjectID, UserID
- Status (pending/accepted/rejected)
- CreatedAt, UpdatedAt

### Message
- ID, ProjectID, UserID, Content
- CreatedAt

## Особенности

### Безопасность
- JWT токены для аутентификации
- Хеширование паролей с bcrypt
- Middleware для защиты приватных маршрутов
- CORS настройки

### Функциональность
- Регистрация и авторизация пользователей
- Создание и управление проектами
- Система заявок на участие
- Внутренний чат для каждого проекта
- Фильтрация проектов по категории и уровню
- Редактирование профиля

### UI/UX
- Адаптивный дизайн с Tailwind CSS
- Современный интерфейс
- Обработка ошибок и загрузочные состояния
- Интуитивная навигация

## Возможные улучшения

- Система уведомлений
- WebSocket для real-time чата
- Загрузка файлов и изображений
- Система рейтингов
- Поиск по проектам
- Система тегов
- Email уведомления
- Роли участников в проектах

## Лицензия

Учебный проект для демонстрации full-stack разработки.
