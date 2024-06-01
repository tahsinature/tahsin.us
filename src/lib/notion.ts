import { Client } from "@notionhq/client";
import _ from "lodash";
import { NotionORMSchema } from "@/types";

export const notion = new Client({
  auth: process.env.NOTION_TOKEN,
});

export const database_ids = {
  language: "unset",
  work: "a958ff8e06b54db19f173483adff89f9",
  blog: "efec0bbfb0a7436f9fca047b4efd9223",
  tags: "7e0ddc0661d7414a9051ce26db4cedea",
  toolsIUse: "1e7e2155cabb40d5bc8df166a452b2f5",
  programmingLanguage: "f7f3f6416d914904b9fd3bdc4e99cf1d",
  tempImage: "40498135f89643caa330401a143a9aa3",
  projects: "bb34c467725d4a539e54df8d415d5fa4",
  galleryHome: "3343222de3ad4e82bb7fd3bc624cf47f",
  galleryMain: "9d89b67025dd49b9b99c218b5a81d6ce",
  guestBook: "831c57bdae9243379317735b52e3900b",
};

export const queryFromDB = async (schema: NotionORMSchema, database_id: string, sorts?: { property: string; direction: "ascending" | "descending" }[]) => {
  const response = await notion.databases.query({ database_id, sorts });

  return response.results.map((item: any) => {
    const finalItem: any = {
      id: item.id,
    };

    Object.keys(schema.properties).forEach((key) => {
      const property = schema.properties[key];
      const dbProperty = item.properties[key];
      const finalKey = property.transformKey || key;

      if (!dbProperty) return;

      if (property.type === "title") {
        finalItem[finalKey] = _.get(item, `properties.${key}.title[0].plain_text`);
      } else if (property.type === "rich_text") {
        finalItem[finalKey] = _.get(item, `properties.${key}.rich_text[0].plain_text`);
      } else if (property.type === "files") {
        if (property.subType === "url") {
          finalItem[finalKey] = _.get(item, `properties.${key}.files`, []).map((item: any) => item.file.url);
        } else if (property.subType === "external") {
          finalItem[finalKey] = _.get(item, `properties.${key}.files`, []).map((item: any) => item.external.url);
        }
      } else if (property.type === "files-external-key-value") {
        finalItem[finalKey] = _.get(item, `properties.${key}.files`, []).map((item: any) => ({ url: item.external.url, name: item.name }));
      } else if (property.type === "relation") {
        finalItem[finalKey] = _.get(item, `properties.${key}.relation`).map((item: any) => item.id);
      } else if (property.type === "checkbox") {
        finalItem[finalKey] = _.get(item, `properties.${key}.checkbox`);
      } else if (property.type === "unique_id") {
        finalItem[finalKey] = _.get(item, `properties.${key}.unique_id.number`);
      } else if (property.type === "date") {
        finalItem[finalKey] = { start: _.get(item, `properties.${key}.date.start`), end: _.get(item, `properties.${key}.date.end`) };
      } else if (property.type === "number") {
        finalItem[finalKey] = _.get(item, `properties.${key}.number`);
      } else if (property.type === "multi_select") {
        finalItem[finalKey] = _.get(item, `properties.${key}.multi_select`);
      }
    });

    return finalItem;
  });
};
