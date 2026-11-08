import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// En GitHub Pages el sitio vive en https://matias2309.github.io/NudoyHebra/
// build y preview usan esa base; el servidor de desarrollo se sirve desde la raíz.
export default defineConfig(({ command, isPreview }) => ({
  base: command === "serve" && !isPreview ? "/" : "/NudoyHebra/",
  plugins: [react()],
}));
