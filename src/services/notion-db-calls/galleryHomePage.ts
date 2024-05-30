import { database_ids, queryFromDB } from "@/lib/notion";
import { NotionORMSchema, ProgrammingLanguage, TempImage } from "@/types";

const schema: NotionORMSchema = {
  properties: {
    Name: { type: "title", transformKey: "caption" },
    Images: { type: "files", subType: "url", transformKey: "imageURLS" },
  },
};

export const getAll = async () => {
  const response = await queryFromDB(schema, database_ids.galleryHome);
  return response
    .filter((item) => item.imageURLS.length > 0)
    .map((item) => ({
      caption: item.caption,
      imageURL: item.imageURLS[0],
    }));
};
