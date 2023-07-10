import {
  BrowserRouter,
  createBrowserRouter,
  Routes,
  Route,
  useNavigate,
  RouterProvider,
} from "react-router-dom";
import { App } from "./App";
import { get, set } from "lodash";
import { routerPage } from "./libs/web-url";
import lodash = require("lodash");
const w = window as any;
let listRouter = lodash.map(routerPage, (e) => {
  let elem = e.element();
  // let is = elem();
  let Page = elem;
  // console.log(Page);
  return {
    path: e.path,
    element: (
      <>
        <Page />
      </>
    ),
  };
});
// console.log(listRouter);
window.addEventListener("popstate", () => {
  if (w.preventPopRender) {
    w.preventPopRender = false;
    return;
  }
  w.appRoot.render();
});
const router = createBrowserRouter(listRouter);
export const Router = () => {
  return (
    <RouterProvider router={router} />
    // <BrowserRouter>
    //   <BaseRoute />
    // </BrowserRouter>
  );
};

const BaseRoute = () => {
  return (
    <Routes>
      <Route path="*" element={<App />} />
      {/* <Route path="/projects*" element={<div>HAlo Dek</div>} />
      <Route
        path="/p/:id?/:lc"
        loader={({ params }) => {
          console.log("jajajaj");
          console.log({ params });
          return true;
        }}
        element={<div>/p/:id?/:lc </div>}
      /> */}
    </Routes>
  );
};
