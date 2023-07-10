import { dirs } from "./dirs";
import { writeFile, readFile } from "fs-extra";
import { join } from "path";
import { parse } from "@babel/core";
import pluginJsx from "@babel/plugin-syntax-jsx";
import pluginTs from "@babel/plugin-syntax-typescript";
import traverse from "@babel/traverse";
import { get } from "lodash";
import lodash = require("lodash");
// import camelCase from "camelcase";
const fs = require("fs/promises");

export const pagePath = {
  out: join(dirs.app.libs, "web-url.ts"),
  dir: join(dirs.app.web, "src", "base", "page"),
};
export const pageOutput = {
  list: {} as any,
  component: [] as any,
};

export const generatePage = async () => {
  // console.log(dirs.app.web);
  const list = await walkDir(dirs.app.web);
  // console.log(list);
  pageOutput.list = {};
  pageOutput.component = [`import { App } from '../App'`];
  let nameComponent = {};
  let router: any = [];
  for (let path of list) {
    // console.log(path);
    try {
      let pathNoExt = path.endsWith(".tsx")
        ? path.substring(0, path.length - 4)
        : path;

      const name = pathNoExt
        .substring(join(dirs.app.web).length + 1)
        .replace(/[\/\\]/gi, ".");
      // console.log(name);
      const source = await readFile(path, "utf-8");
      const parsed = parse(source, {
        sourceType: "module",
        plugins: [pluginJsx, [pluginTs, { isTSX: true }]],
      });

      let layout = "default";
      let url = "";
      traverse(parsed, {
        CallExpression: (p) => {
          if (url) return;

          const c = p.node;
          if (c.callee.type === "Identifier" && c.callee.name === "page") {
            const arg = c.arguments[0];

            if (arg && arg.type === "ObjectExpression") {
              for (let prop of arg.properties) {
                if (
                  prop.type === "ObjectProperty" &&
                  prop.key.type === "Identifier" &&
                  prop.value.type === "StringLiteral"
                ) {
                  if (prop.key.name === "url") {
                    url = prop.value.value;
                  } else if (prop.key.name === "layout") {
                    layout = prop.value.value;
                  }
                }
              }
              const prop = arg.properties[0];
            }
          }
        },
      });
      let nameFile = name.replace(
        /(?:^\w|[A-Z]|\b\w|\s+)/g,
        function (match, index) {
          if (+match === 0) return ""; // or if (/\s+/.test(match)) for white spaces
          return index === 0 ? match.toLowerCase() : match.toUpperCase();
        }
      );
      if (nameFile === "default") nameFile = "pageDefault";
      let urlPage = `import * as ${nameFile} from '../page${path
        .substring(dirs.app.web.length, path.length - 4)
        .replace(/\\/gi, "/")}'`;
      // if (!lodash.find(pageOutput.component, (e) => e === urlPage))
      pageOutput.component.push(urlPage);
      if (url.includes("*")) {
        router.push(`{path:'${url.replaceAll("*", "")}',element: () => App}`);
      }
      router.push(`{path:'${url.replaceAll("*", "/*")}',element: () => App}`);
      // router.push(`{path:'${url.replaceAll("*", "/*")}',element: () => App}`);
      let component = (pageOutput.list[
        name
      ] = `{url: "${url}", page: {url: "${url}",layout: "${layout}", import: () => import('../page${path
        .substring(dirs.app.web.length, path.length - 4)
        .replace(/\\/gi, "/")}'), component: ${nameFile}}}`);
    } catch (e) {}
  }
  let filter = lodash.uniqBy(pageOutput.component, function (e) {
    return e;
  });
  const listImport = filter.join("\n");
  console.log(router);
  let routers = router.join(",\n");

  const output = `${listImport} \n export const routerPage = [${routers}]\n export default [
    ${Object.entries(pageOutput.list)
      .map((arg: any) => {
        const [key, value] = arg;
        return `${value}`;
      })
      .join(",\n  ")}
    ]`;
  // console.log(output);
  await writeFile(pagePath.out, output);
};

export const walkDir = async function (directory: string) {
  let fileList: string[] = [];
  // console.log("walkDir", directory);
  const files = await fs.readdir(directory);
  // console.log("halo");
  for (const file of files) {
    const p = join(directory, file);
    if ((await fs.stat(p)).isDirectory()) {
      fileList = [...fileList, ...(await walkDir(p))];
    } else {
      fileList.push(p);
    }
  }

  return fileList;
};
generatePage();
