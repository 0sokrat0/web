# Build stage
FROM golang:1.24.4-alpine AS builder

# Install build dependencies
RUN apk add --no-cache gcc musl-dev

WORKDIR /app

# Copy go mod files
COPY go.mod go.sum ./

# Download dependencies
RUN go mod download

# Copy source code
COPY . .

# Build the application without CGO (using pure Go SQLite)
RUN CGO_ENABLED=0 GOOS=linux go build -a -installsuffix cgo -o main ./cmd/server

FROM alpine:3.20

# Устанавливаем только критически важные пакеты
RUN apk add --no-cache ca-certificates

WORKDIR /app

# Copy the binary from builder stage
COPY --from=builder /app/main .

# Copy database file if exists
COPY --from=builder /app/data.db* ./

# Set environment variables
ENV PORT=8080
ENV DB_PATH=./data.db
ENV SECRET_KEY=your-super-secret-jwt-key-change-this-in-production

EXPOSE 8080

CMD ["./main"]