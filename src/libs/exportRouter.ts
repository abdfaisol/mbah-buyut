import { App } from "../App";
import * as test from "../page/test";
import * as pageDefault from "../page/default";
import * as testCopy from "../page/test copy";

export default [
  {
    url: "/test/:as/l",
    page: {
      url: "/test/:as/l",
      layout: "default",
      import: () => import("../page/test"),
      component: test,
    },
  },
  {
    url: "/",
    page: {
      url: "/",
      layout: "default",
      import: () => import("../page/default"),
      component: pageDefault,
    },
  },
  {
    url: "/master/:name/:id/:app*",
    page: {
      url: "/master/:name/:id/:app*",
      layout: "default",
      import: () => import("../page/test copy"),
      component: testCopy,
    },
  },
];

export const routerPage = [{ path: "/", element: App }];
