# Build stage
FROM golang:1.21-alpine3.18 AS builder

# Set working directory
WORKDIR /app

# Install dependencies
RUN apk add --no-cache git

# Copy go mod files
COPY go.mod go.sum ./

# Download dependencies
RUN go mod download

# Copy source code
COPY . .

# Build the application
RUN CGO_ENABLED=1 GOOS=linux go build -a -installsuffix cgo -o main ./cmd/server

# Final stage
FROM alpine:3.18

# Install ca-certificates for HTTPS requests and sqlite
RUN apk --no-cache add ca-certificates sqlite-dev

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
