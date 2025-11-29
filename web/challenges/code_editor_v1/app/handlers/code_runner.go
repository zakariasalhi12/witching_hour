package handlers

import (
	"bytes"
	"code-editor/app/models"
	"net/http"
	"os"
	"os/exec"
	"path/filepath"
	"time"

	"github.com/gin-gonic/gin"
)

func RunCode(c *gin.Context) {
	c.Header("Access-Control-Allow-Origin", "*")
	c.Header("Access-Control-Allow-Headers", "Content-Type")

	var req models.RunRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid JSON"})
		return
	}
	if req.Code == "" {
		c.JSON(http.StatusBadRequest, gin.H{"error": "code is required"})
		return
	}

	// Create temporary directory
	tmpDir, err := os.MkdirTemp("", "go-run-*")
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to create temp dir"})
		return
	}
	defer os.RemoveAll(tmpDir)

	// Write code to main.go
	codeFile := filepath.Join(tmpDir, "main.go")
	if err := os.WriteFile(codeFile, []byte(req.Code), 0644); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to save code"})
		return
	}

	// Execute with 10-second timeout
	cmd := exec.Command("go", "run", "main.go")
	cmd.Dir = tmpDir
	cmd.Env = append(os.Environ(), "GO111MODULE=off")

	var stdout, stderr bytes.Buffer
	cmd.Stdout = &stdout
	cmd.Stderr = &stderr

	done := make(chan struct{})
	var runErr error

	go func() {
		runErr = cmd.Run()
		close(done)
	}()

	select {
	case <-done:
		// Completed
	case <-time.After(10 * time.Second):
		if cmd.Process != nil {
			cmd.Process.Kill()
		}
		c.JSON(http.StatusOK, models.RunResponse{
			Output:   "",
			Error:    "Execution timed out after 10 seconds",
			ExitCode: -1,
		})
		return
	}

	exitCode := 0
	if runErr != nil {
		if exitErr, ok := runErr.(*exec.ExitError); ok {
			exitCode = exitErr.ExitCode()
		} else {
			exitCode = 1
		}
	}

	c.JSON(http.StatusOK, models.RunResponse{
		Output:   stdout.String(),
		Error:    stderr.String(),
		ExitCode: exitCode,
	})
}
