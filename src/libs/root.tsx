import { useLocal } from "web-utils";

export const Root = ({ loading, props, res }) => {
  const local = useLocal({
    Layout: null as any,
    global: new WeakMap(),
    pathname: "",
    pathLoaded: false,
    pageUrl: "",
    firstRender: true,
    Page: null as any,
  });
  const w = window as any;
  w.rootRender = local.render;

  if (local.firstRender) local.firstRender = false;
  else res.pathname = location.pathname;

  w.rootRes = res;
  w.pathname = res.pathname;

  let page = w.__PAGES__["index"];

  let found = w.router.lookup(res.pathname);
  if (!found || (found && !found.name)) {
    found = w.router.lookup(res.pathname + "/");
  }
  if (!found || (found && !found.name)) {
    found = w.router.lookup(res.pathname + "/_");
  }
  if (!found || (found && !found.name)) {
    found = w.router.lookup(res.pathname + "/_/");
  }
  if (!found || (found && !found.name)) {
    found = w.router.lookup(res.pathname + "/_/_");
  }
};
