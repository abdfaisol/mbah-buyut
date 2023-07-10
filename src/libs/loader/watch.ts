import { generatePage } from "./page";

const chokidar = require("chokidar");
chokidar
  .watch("src/page")
  .on("add", (path) => generatePage())
  .on("change", (path) => generatePage())
  .on("unlink", (path) => generatePage());
