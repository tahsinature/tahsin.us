import { Client } from "@notionhq/client";
import _ from "lodash";

import { NotionORMSchema } from "@/types";

export const notion = new Client({
  auth: process.env.NOTION_TOKEN,
});

export const database_ids = {
  language: "unset",
  work: "a958ff8e06b54db19f173483adff89f9",
  gallery: "unset",
  blog: "efec0bbfb0a7436f9fca047b4efd9223",
  tags: "7e0ddc0661d7414a9051ce26db4cedea",
};

export const queryFromDB = async (schema: NotionORMSchema, database_id: string) => {
  const response = await notion.databases.query({ database_id });

  return response.results.map((item: any) => {
    const finalItem: any = {
      id: item.id,
    };

    Object.keys(schema.properties).forEach((key) => {
      const property = schema.properties[key];
      const dbProperty = item.properties[key];

      if (!dbProperty) return;

      if (property.type === "title") {
        finalItem[key] = _.get(item, `properties.${key}.title[0].plain_text`);
      } else if (property.type === "rich_text") {
        finalItem[key] = _.get(item, `properties.${key}.rich_text[0].plain_text`);
      } else if (property.type === "files") {
        if (property.subType === "url") {
          finalItem[key] = _.get(item, `properties.${key}.files`, []).map((item: any) => item.file.url);
        } else if (property.subType === "external") {
          finalItem[key] = _.get(item, `properties.${key}.files`, []).map((item: any) => item.external.url);
        }
      } else if (property.type === "relation") {
        finalItem[key] = _.get(item, `properties.${key}.relation`).map((item: any) => item.id);
      } else if (property.type === "checkbox") {
        finalItem[key] = _.get(item, `properties.${key}.checkbox`);
      }
    });

    return finalItem;
  });
};
