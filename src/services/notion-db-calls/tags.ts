import { database_ids, queryFromDB } from "@/lib/notion";
import { NotionORMSchema, Tag } from "@/types";

const tagSchema: NotionORMSchema = {
  properties: {
    Name: { type: "title", transformKey: "name" },
    Description: { type: "rich_text", transformKey: "description" },
    Logo: { type: "files", subType: "url", transformKey: "logos" },
    Wiki: { type: "files", subType: "external", transformKey: "wikiLinks" },
  },
};

export const getTags = async (ids?: string[]): Promise<Tag[]> => {
  const response = await queryFromDB(tagSchema, database_ids.tags);

  return response.filter((tag) => (ids ? ids.includes(tag.id) : true));
};
