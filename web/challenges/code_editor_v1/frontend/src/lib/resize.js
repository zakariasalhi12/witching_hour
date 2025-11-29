import html from "rbind";
const { div } = html;
export function resize(editor, ...args) {
  const editorNode = editor(...args);
  const resizerNode = div({ id: "resizer" });
  let dragging = false;

  resizerNode.onmousedown = () => {
    dragging = true;
    document.body.style.cursor = "col-resize";
  };

  document.onmousemove = (e) => {
    if (!dragging) return;

    const min = 200;
    const max = window.innerWidth - 200;
    const newWidth = Math.min(Math.max(e.clientX, min), max);

    editorNode.style.flex = "none";
    editorNode.style.width = `${newWidth}px`;

    window.dispatchEvent(new Event("resize"));
  };

  document.onmouseup = () => {
    dragging = false;
    document.body.style.cursor = "default";
  };

  return [editorNode, resizerNode];
}
