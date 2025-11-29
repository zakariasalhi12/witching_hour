import { state } from "rbind";
import { runCode } from "../api.js";
const defaultCode = `package main

import "fmt"

func main() {
    fmt.Println("Hello, Go!")
}`;

// Global reactive state
export const appState = {
  code: state(defaultCode),
  output: state(""),
  error: state(""),
  isRunning: state(false),
  currentRoute: state("/"),
  run: runCode,
};
