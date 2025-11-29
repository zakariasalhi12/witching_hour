import html from "rbind";
import { appState } from "../shared/states.js";

const { div } = html;

require.config({
  paths: {
    vs: "https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.44.0/min/vs",
  },
});

const { code } = appState;
export default function Editor() {
  const editorContainer = div({ id: "editor-container" });

  require(["vs/editor/editor.main"], () => {
    const editor = monaco.editor.create(editorContainer, {
      value: code.value,
      language: "go",
      theme: "vs-dark",
      automaticLayout: true,
    });

    code.trigger((newValue) => {
      if (editor.getValue() !== newValue) {
        editor.setValue(newValue);
      }
    });

    editor.onDidChangeModelContent(() => {
      code.value = editor.getValue();
    });
  });

  return editorContainer;
}
