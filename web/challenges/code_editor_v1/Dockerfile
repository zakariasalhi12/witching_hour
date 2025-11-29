## Multi-stage Dockerfile: build frontend, build backend, produce single runtime image

# --- Frontend builder ---
FROM node:18-alpine AS frontend-builder
WORKDIR /src/frontend
COPY frontend/package.json frontend/package-lock.json* ./
RUN npm ci --silent || npm install --silent
COPY frontend/ ./
RUN npm run build

# --- Go builder ---
FROM golang:1.24-alpine AS builder
WORKDIR /src
COPY go.mod go.sum ./
COPY . ./
RUN CGO_ENABLED=0 GOOS=linux go build -o /app/server .

# --- Final runtime image ---
FROM alpine:3.18
WORKDIR /app
COPY --from=builder /app/server /app/server
COPY --from=frontend-builder /src/frontend/dist /app/frontend/dist
ENV GIN_MODE=release
EXPOSE 1330
CMD ["/app/server"]
