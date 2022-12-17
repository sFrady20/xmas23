import { defineConfig } from "vite";
import svgr from "vite-plugin-svgr";
import markdownRawPlugin from "vite-raw-plugin";

// https://vitejs.dev/config/
export default defineConfig({
  build: { outDir: "www" },
  plugins: [
    svgr(),
    markdownRawPlugin({
      fileRegex: /\.prompt.md$/,
    }),
  ],
});
