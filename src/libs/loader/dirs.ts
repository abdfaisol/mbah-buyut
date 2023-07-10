import { join } from "path";
import { cwd } from "process";

const root = cwd();
export const dirs = {
  root,
  app: {
    libs: join(root, "src", "libs"),
    dbs: join(root, "app", "dbs"),
    web: join(root, "src", "page"),
    ext: join(root, "app", "ext"),
    mobile: join(root, "app", "mobile"),
  },
  pkgs: {
    fastify: join(root, "pkgs", "fastify"),
    platform: join(root, "pkgs", "platform"),
    boot: join(root, "pkgs", "boot"),
    theme: join(root, "pkgs", "theme"),
    web: join(root, "pkgs", "web"),
  },
};
