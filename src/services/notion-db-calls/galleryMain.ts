import { database_ids, queryFromDB } from "@/lib/notion";
import { NotionORMSchema } from "@/types";

const schema: NotionORMSchema = {
  properties: {
    Caption: { type: "title", transformKey: "caption" },
    Width: { type: "number", transformKey: "width" },
    Height: { type: "number", transformKey: "height" },
    Images: { type: "files", subType: "url", transformKey: "imageURLS" },
  },
};

export const getAll = async () => {
  const response = await queryFromDB(schema, database_ids.galleryMain);
  return response.filter((item) => item.imageURLS.length > 0);
};
