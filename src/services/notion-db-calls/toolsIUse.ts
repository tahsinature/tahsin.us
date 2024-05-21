import { database_ids, queryFromDB } from "@/lib/notion";
import { getTags } from "@/services/blog";
import { NotionORMSchema, Tool } from "@/types";

const schema: NotionORMSchema = {
  properties: {
    Name: { type: "title", transformKey: "categoryName" },
    Tools: { type: "relation", transformKey: "tagIds" },
  },
};

export const getCategories = async (): Promise<Tool[]> => {
  const allTags = await getTags();
  const response = await queryFromDB(schema, database_ids.toolsIUse);

  return response.map((e) => {
    const tagIds = e.tagIds.map((tagId: string) => tagId);
    return {
      id: e.id,
      categoryName: e.categoryName,
      tags: allTags.filter((tag) => tagIds.includes(tag.id)),
    };
  });
};
