import * as ReactDOMClient from "react-dom/client";
// import "./App.scss";
import { Router } from "./Router";

const rootNode = document.getElementById("app");
if (rootNode) {
  const root = ReactDOMClient.createRoot(rootNode);
  root.render(<Router />);
}
