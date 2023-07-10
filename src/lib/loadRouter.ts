import { createRouter } from "radix3";
import page from "../libs/web-url";
import lodash = require("lodash");
import { get, set } from "lodash";
import { useNavigate } from "react-router-dom";
import * as newRouter from "find-my-way";
// import { useNavigate } from "react-router-dom";
import queryString from "query-string";
import { lookupPage } from "./lookup";

const w = window as any;
export const loadRouter = () => {
  w.route = createRouter();
  let lik = [];
  //   console.log({ w });
  //   console.log({ page });
  lodash.map(page, (e: any) => {
    let page = e.page;
    if (lodash.get(e, "url")) {
      let params = e.url.split("/");
      params = lodash.filter(params, (e) => e);
      let list: any = [];
      let url = structuredClone(e.url);
      list.push({
        url: url.replaceAll("?", "").replaceAll("*", "/**"),
      });
      let link = [];
      lodash.map(params, (e, idx) => {
        let next = get(params, `[${idx + 1}]`);
        link.push(e.replace("?", "").replace("*", ""));
        if (!e.includes("*")) {
          if (next)
            if (next.includes("?")) {
              list.push({
                url: "/" + link.join("/"),
              });
            }
        } else {
          list.push({
            url: "/" + link.join("/"),
          });
        }
      });
      // console.log(list);
      lodash.map(list, (x) => {
        w.route.insert(x.url, page);
        lik.push({ url: x.url, page });
      });
      // lodash.concat(lik, list);
    }
  });
  // console.log(lik);
};
