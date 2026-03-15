import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import mdx from "@mdx-js/rollup";
import remarkFrontmatter from "remark-frontmatter";
import remarkMdxFrontmatter from "remark-mdx-frontmatter";
import remarkGfm from "remark-gfm";
import rehypeMdxImportMedia from "rehype-mdx-import-media";
import path from "path";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
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
