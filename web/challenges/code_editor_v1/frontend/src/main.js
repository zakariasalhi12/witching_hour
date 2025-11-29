import { router } from "rbind";
import { App } from "./App.js";

// Setup routes: / for editor
router.setup({
  "/": App,
});
