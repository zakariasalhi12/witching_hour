import Editor from "./components/Editor.js";
import Output from "./components/Output.js";
import Header from "./components/Header.js";
import { resize } from "./lib/resize.js";
import html from "rbind";
const { div } = html;

export const App = () => {
  return div().add(
    Header(),
    div({ id: "editor-output-wrapper" }).add(...resize(Editor), Output())
  );
};
