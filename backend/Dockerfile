# Build stage
FROM golang:1.21-bullseye AS builder

# Set working directory
WORKDIR /app

# Install dependencies including build tools for CGO
RUN apt-get update && apt-get install -y git gcc libc6-dev sqlite3

# Copy go mod files
COPY go.mod go.sum ./

# Download dependencies
RUN go mod download

# Copy source code
COPY . .

# Build the application
RUN CGO_ENABLED=1 GOOS=linux go build -a -installsuffix cgo -o main ./cmd/server

# Final stage
FROM debian:bullseye-slim

# Install ca-certificates and sqlite
RUN apt-get update && apt-get install -y ca-certificates sqlite3 && rm -rf /var/lib/apt/lists/*

# Create app directory
WORKDIR /root/

# Copy the binary from builder stage
COPY --from=builder /app/main .

# Copy database file if exists
COPY --from=builder /app/data.db* ./

# Expose port
EXPOSE 8080

# Set environment variables
ENV PORT=8080
ENV DB_PATH=./data.db
ENV SECRET_KEY=your-super-secret-jwt-key-change-this-in-production

# Run the application
CMD ["./main"]
