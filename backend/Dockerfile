# Build stage
FROM golang:1.24.4-alpine AS builder

RUN apk add --no-cache gcc musl-dev sqlite-dev

WORKDIR /app

# Copy go mod files
COPY go.mod go.sum ./

# Download dependencies
RUN go mod download

# Copy source code
COPY . .

# Build the application with CGO enabled
RUN CGO_ENABLED=1 GOOS=linux go build -o main ./cmd/server

FROM alpine:3.20

RUN apk add --no-cache sqlite  tzdata

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