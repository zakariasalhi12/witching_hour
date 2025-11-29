import html from "rbind";
import { appState } from "../shared/states.js";

const { div, pre } = html;

// Reactive output component using rbind's built-in reactivity
const { output, error } = appState;
export default function Output() {
  return div({
    id: "output-container",
    className: (w) => `output ${w(error).length > 0 ? "error" : "success"}`,
  }).add(
    (w) =>
      pre({
        className: "output-lines",
        innerHTML: w(output)
          .split("\n")
          .map((line) => `<div class="output">${line}</div>`)
          .join(""),
      }),
    (w) =>
      pre({
        className: "error-lines",
        innerHTML: w(error)
          .split("\n")
          .map((line) => `<div class="error">${line}</div>`)
          .join(""),
      })
  );
}
