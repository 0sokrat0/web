# Build stage
FROM golang:1.24.4-alpine AS builder

RUN apk add --no-cache gcc musl-dev sqlite-dev

WORKDIR /app
COPY go.mod go.sum ./
RUN go mod download
COPY . .

RUN CGO_ENABLED=1 GOOS=linux go build -a -installsuffix cgo -o main ./cmd/server

# Final stage: чистый scratch
FROM scratch

# Копируем только нужное
COPY --from=builder /etc/ssl/certs/ca-certificates.crt /etc/ssl/certs/
COPY --from=builder /app/main /app/main
COPY --from=builder /app/data.db* /app/

WORKDIR /app
EXPOSE 8080

ENV PORT=8080
ENV DB_PATH=./data.db
ENV SECRET_KEY=your-super-secret-jwt-key-change-this-in-production

CMD ["/app/main"]