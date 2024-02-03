import { Client } from "@notionhq/client";

export const notion = new Client({
  auth: process.env.NOTION_TOKEN,
});

export const database_ids = {
  language: "unset",
  work: "unset",
  gallery: "unset",
  blog: "efec0bbfb0a7436f9fca047b4efd9223",
  tags: "7e0ddc0661d7414a9051ce26db4cedea",
};
