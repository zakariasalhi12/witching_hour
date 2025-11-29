import html from "rbind";
import { appState } from "../shared/states.js";

const { div, button, h1 } = html;

const { code, output, error, isRunning, run } = appState;
export default function Header() {
  return div({ id: "header" }).add(
    h1({ textContent: "Go Editor" }),
    button({
      id: "run-button",
      textContent: (w) => (w(isRunning) ? "Running..." : "Run"),
      disabled: (w) => w(isRunning),
      onclick: async () => {
        if (!isRunning.value) {
          isRunning.value = true;
          const result = await run(code.value);
          output.value = result.output || "";

          error.value = result.error || "";
          isRunning.value = false;
        }
      },
    })
  );
}
