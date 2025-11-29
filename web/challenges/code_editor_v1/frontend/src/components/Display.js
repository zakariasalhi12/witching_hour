import html from "rbind";

const { pre } = html;
export const Display = (standard) => {
  return (w) => {
    const std = w(standard);
    std &&
      pre({
        className: `${std}-lines`,
        innerHTML: std
          .split("\n")
          .map((line) => `<div class="${std}">${line}</div>`)
          .join(""),
      });
  };
};
