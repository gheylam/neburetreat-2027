import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { defineConfig } from "vite";

const root = dirname(fileURLToPath(import.meta.url));

function groupPath() {
  return {
    name: "group-path",
    configureServer(server) {
      server.middlewares.use((req, _res, next) => {
        if (req.url === "/group" || req.url === "/group/") {
          req.url = "/group.html";
        }
        next();
      });
    },
    configurePreviewServer(server) {
      server.middlewares.use((req, _res, next) => {
        if (req.url === "/group" || req.url === "/group/") {
          req.url = "/group.html";
        }
        next();
      });
    },
  };
}

export default defineConfig({
  server: {
    host: true,
    port: 43147,
    strictPort: true,
  },
  preview: {
    host: true,
    port: 43147,
    strictPort: true,
  },
  plugins: [groupPath()],
  build: {
    rollupOptions: {
      input: {
        main: resolve(root, "index.html"),
        group: resolve(root, "group.html"),
      },
    },
  },
});
