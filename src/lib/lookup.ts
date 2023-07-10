import { get, set } from "lodash";
import queryString from "query-string";
const w = window as any;
export const lookupPage = (href: string) => {
  let result = queryString.parseUrl(href, {
    parseFragmentIdentifier: true,
  });
  try {
    let res = w.route.lookup(result.url);
    w.page = res;
    w.params = get(res, "params");
    set(
      w,
      "params.parseFragmentIdentifier",
      get(result, "parseFragmentIdentifier")
    );
  } catch (error) {}
};
