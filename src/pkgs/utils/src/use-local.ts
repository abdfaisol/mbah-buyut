import { useEffect, useRef, useState } from "react";

export const useLocal = (
  data: any,
  effect?: () => Promise<void | (() => void)> | void | (() => void)
) => {
  const meta = useRef(data as any);
  const internal = useRef({ mounted: true });
  useEffect(() => {
    let res: any = null;
    if (effect) {
      res = effect();
    }
    return () => {
      internal.current.mounted = false;
      if (typeof res === "function") res();
      else if (res instanceof Promise) {
        res.then((e) => {
          if (typeof e === "function") e();
        });
      }
    };
  }, []);
  const [_, render] = useState({});
  meta.current.render = () => {
    if (internal.current.mounted) render({});
  };

  return meta.current;
};
