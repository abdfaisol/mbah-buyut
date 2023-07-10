import { get, set } from "lodash";
import queryString from "query-string";
import { lookupPage } from "./lookup";
import { useNavigate } from "react-router-dom";
const w = window as any;
export const navigate = (href: string) => {
  //   const navigate2 = useNavigate();
  // ;
  // ;
  // console.log(get(w, "navigate"));
  // if (get(w, "navigate")) {
  //   w.navigate(href);
  // }
  let res = lookupPage(href);
  //   console.log(res);
  w.history.pushState({ prevUrl: "/" }, "assss", href);

  try {
    // console.log(w.page.component.default);
    let page = w.page.component.default.component({});
    set(w, "appRoot.component", page);
  } catch (error) {
    // console.log(error);
    set(w, "appRoot.component", "not found");
  }
  //   set(w, "appRoot.loading", false);
  w.appRoot.render();

  //   setTimeout(() => {
  //     set(w, "appRoot.loading", true);
  //     w.appRoot.render();
  //   }, 100);
  // console.log('halo')
  // toPage(href);
};
