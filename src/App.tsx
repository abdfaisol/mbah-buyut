import { lazy, useEffect, useRef, useState } from "react";
import { useLocal } from "web-utils";
import { local } from "./libs/local";
import { get, set } from "lodash";
import page from "../src/libs/web-url";
import { createRouter, toRouteMatcher } from "radix3";
import { loadRouter } from "./lib/loadRouter";
import { useMatches } from "react-router-dom";
import { lookupPage } from "./lib/lookup";
import test from "../src/page/test";
import { navigate } from "./lib/navigate";
export const App = () => {
  const w = window as any;
  const base = w.base;
  const local = useLocal({
    url: null as any,
    components: {
      Layout: null as any,
      Page: null as any,
    },
    layouts: {} as Record<string, any>,
    lastLayout: null as any,
    global: new WeakMap(),
  });
  set(w, "aa", "halo dek");
  w.appRoot = local;
  // if (local.url !== location.pathname) {
  //   local.url = location.pathname;
  //   console.log({ page });
  //   // lazy(() => {
  //   //   return new Promise<{ default: React.FC<{ layout?: any }> }>(
  //   //     async (resolve) => {
  //   //       // if (importer) {
  //   //       //   // const page = await importer();
  //   //       //   // routeFound[3] = page.default.component;
  //   //       //   // onLoad(page.default.component);
  //   //       //   resolve({ default: page.default.component });
  //   //       // }
  //   //     }
  //   //   );
  //   // });
  //   // const page =
  //   // local.components.Page = page.component;

  //   // const layout = (base.layouts as any)[page.layout];

  //   // if (local.lastLayout !== layout) {
  //   //   local.lastLayout = layout;
  //   //   if (!layout) {
  //   //     throw new Error(`Layout "${layout}" not found.`);
  //   //   }

  //   //   if (local.layouts[page.layout]) {
  //   //     local.components.Layout = local.layouts[page.layout];
  //   //   } else {
  //   //     local.components.Layout = lazy(() => {
  //   //       return new Promise<{ default: any }>(async (resolve) => {
  //   //         const component = await layout();
  //   //         local.components.Layout = component.default;
  //   //         if (!local.layouts[page.layout])
  //   //           local.layouts[page.layout] = local.components.Layout;

  //   //         resolve(component);
  //   //       });
  //   //     });
  //   //   }
  //   // }
  //   // for (let i of Object.values(w.pageOnLoad) as any) {
  //   //   i(local);
  //   // }
  // }
  const Page2 = test.component;
  const Page = get(w, "page.import");
  const meta = useLocal({}, async () => {
    loadRouter();
    set(meta, "loading", false);
    meta.render();
    // console.log(location.pathname);
    lookupPage(location.pathname);
    // console.log(w.page);
    set(meta, "page", w.page);
    set(meta, "loading", true);
    try {
      // console.log(w.page.component.default);
      let page = w.page.component.default.component({});
      set(meta, "component", page);
    } catch (error) {
      // console.log(error);
      set(meta, "component", <>Error</>);
    }
    meta.render();
    // console.log(location.href);
  });
  let mbah = null as any;
  try {
    lookupPage(location.pathname);
    // console.log(w.page.component.default);
    let page = w.page.component.default.component({});
    mbah = page;
  } catch (error) {
    // console.log(error);
    mbah = "Error";
  }

  w.appRoot = meta;
  if (!get(w, "appRoot")) return <>Loading</>;
  if (!get(w, "appRoot.loading")) return <>Loading</>;
  return (
    <>
      <div>
        {get(w, "page.component.default.component") ? (
          mbah
        ) : (
          <>
            <h1 onClick={() => {}}>
              {get(meta, "title") ? get(meta, "title") : "React"}
              {get(window, "appRoot.url")}
            </h1>
            {/* {test.component()} */}
          </>
        )}
      </div>
    </>
  );
};
