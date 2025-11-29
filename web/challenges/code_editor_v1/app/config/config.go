package config

import (
	"time"
)

const (
	JWTKey        = "your-super-secret-key-2025"
	JWTExpiration = 24 * time.Hour
)

const (
	DockerImage      = "golang:1.21-alpine"
	ContainerTimeout = 30 * time.Second
	MemLimit         = "512m"
	CpuQuota         = "1.0"
	PidsLimit        = "256"
)
