# Build stage
FROM golang:1.24.4 AS builder

# Устанавливаем зависимости для сборки с CGO и SQLite
RUN apt-get update && apt-get install -y --no-install-recommends \
    gcc \
    libc-dev \
    libsqlite3-dev \
 && rm -rf /var/lib/apt/lists/*

WORKDIR /app

# Копируем go.mod и go.sum
COPY go.mod go.sum ./
RUN go mod download

# Копируем исходники
COPY . .

# Собираем бинарь
RUN CGO_ENABLED=1 GOOS=linux go build -a -installsuffix cgo -o main ./cmd/server

# Final stage
FROM ubuntu:22.04

# Устанавливаем рантайм-зависимости
RUN apt-get update && apt-get install -y --no-install-recommends \
    ca-certificates \
    tzdata \
    sqlite3 \
    libsqlite3-0 \
 && rm -rf /var/lib/apt/lists/*

WORKDIR /app

# Копируем бинарь
COPY --from=builder /app/main .

# Копируем базу (если есть)
COPY --from=builder /app/data.db* ./

EXPOSE 8080

# Переменные окружения
ENV PORT=8080
ENV DB_PATH=./data.db
ENV SECRET_KEY=your-super-secret-jwt-key-change-this-in-production

CMD ["./main"]