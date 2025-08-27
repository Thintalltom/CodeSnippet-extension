declare module "vite-plugin-crx" {
  import type { Plugin } from "vite";

  interface CrxOptions {
    manifest: Record<string, any>;
  }

  export function crx(options: CrxOptions): Plugin;
}
