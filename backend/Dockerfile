# Build stage
FROM golang:1.24.4-alpine AS builder

# Устанавливаем зависимости для сборки с CGO
RUN apk add --no-cache gcc musl-dev sqlite-dev

WORKDIR /app

# Копируем go.mod и go.sum
COPY go.mod go.sum ./

# Скачиваем зависимости
RUN go mod download

# Копируем исходники
COPY . .

# Собираем бинарник с включенным CGO
RUN CGO_ENABLED=1 GOOS=linux go build -a -installsuffix cgo -o main ./cmd/server

# Final stage
FROM alpine:3.20

# Устанавливаем рантайм-зависимости
RUN apk update && apk add --no-cache ca-certificates tzdata sqlite sqlite-libs && rm -rf /var/cache/apk/*

# Рабочая директория
WORKDIR /app

# Копируем бинарник из builder-стейджа
COPY --from=builder /app/main .

# Копируем БД (если есть)
COPY --from=builder /app/data.db* ./

# Пробрасываем порт
EXPOSE 8080

# Переменные окружения
ENV PORT=8080
ENV DB_PATH=./data.db
ENV SECRET_KEY=your-super-secret-jwt-key-change-this-in-production

# Запуск приложения
CMD ["./main"]