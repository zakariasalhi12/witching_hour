package models

type RunRequest struct {
	Code string `json:"code"`
}

type RunResponse struct {
	Output   string `json:"output"`
	ExitCode int    `json:"exit_code"`
	Error    string `json:"error,omitempty"`
}
