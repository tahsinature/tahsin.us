import { database_ids, queryFromDB } from "@/lib/notion";
import { NotionORMSchema, ProgrammingLanguage, TempImage } from "@/types";

const schema: NotionORMSchema = {
  properties: {
    SortField: { type: "number", transformKey: "sortField" },
    Name: { type: "title", transformKey: "name" },
    Code: { type: "rich_text", transformKey: "code" },
    Output: { type: "rich_text", transformKey: "output" },
    Program: { type: "rich_text", transformKey: "program" },
    Logo: { type: "files", subType: "url", transformKey: "logo" },
    ShowInApp: { type: "checkbox", transformKey: "showInApp" },
  },
};

export const getProgrammingLanguages = async (): Promise<ProgrammingLanguage[]> => {
  const response = await queryFromDB(schema, database_ids.programmingLanguage);
  return response.filter((item) => item.showInApp).sort((a, b) => a.sortField - b.sortField);
};
