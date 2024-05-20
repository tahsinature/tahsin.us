import { database_ids, queryFromDB } from "@/lib/notion";
import { getTags } from "@/services/notion-db-calls/tags";
import { NotionORMSchema, Project } from "@/types";

const schema: NotionORMSchema = {
  properties: {
    Name: { type: "title", transformKey: "name" },
    Description: { type: "rich_text", transformKey: "description" },
    Types: { type: "multi_select", transformKey: "types" },
    Preview: { type: "files", subType: "url", transformKey: "preview" },
    Links: { type: "files-external-key-value", transformKey: "links" },
    SortField: { type: "number", transformKey: "sortField" },
    Tags: { type: "relation", transformKey: "tags" },
  },
};

export const getProjects = async (): Promise<Project[]> => {
  const tags = await getTags();

  return (await queryFromDB(schema, database_ids.projects)).map((p) => ({
    ...p,
    tags: p.tags.map((tagId: string) => tags.find((tag) => tag.id === tagId)),
  }));
};
