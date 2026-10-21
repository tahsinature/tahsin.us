import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import mdx from "@mdx-js/rollup";
import remarkFrontmatter from "remark-frontmatter";
import remarkMdxFrontmatter from "remark-mdx-frontmatter";
import remarkGfm from "remark-gfm";
import rehypeMdxImportMedia from "rehype-mdx-import-media";
import path from "path";
import { isShortLinkPath } from "./shared/short-links";
import { injectShortLinkMetadata } from "./shared/short-link-metadata";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    {
      name: "short-link-metadata",
      transformIndexHtml(html, context) {
        if (!context.server) return html;
        const url = new URL(context.originalUrl ?? context.path, "http://localhost");
        return isShortLinkPath(url.pathname) ? injectShortLinkMetadata(html, url.pathname, url.search) : html;
      },
    },
    mdx({
      remarkPlugins: [remarkGfm, remarkFrontmatter, remarkMdxFrontmatter],
      rehypePlugins: [rehypeMdxImportMedia],
    }),
    react(),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
      "@shared": path.resolve(__dirname, "shared"),
    },
  },
  server: {
    allowedHosts: true,
    proxy: {
      "/api": "http://localhost:3000",
    },
  },
});
