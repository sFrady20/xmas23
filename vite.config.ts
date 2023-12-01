import { defineConfig } from "vite";
import svgr from "vite-plugin-svgr";
import markdownRawPlugin from "vite-raw-plugin";
import path from "path";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  build: { outDir: "www" },
  plugins: [
    react(),
    svgr(),
    markdownRawPlugin({
      fileRegex: /\.prompt.md$/,
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
