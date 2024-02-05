import { database_ids, queryFromDB } from "@/lib/notion";
import { NotionORMSchema, TempImage } from "@/types";

const schema: NotionORMSchema = {
  properties: {
    Name: { type: "title" },
    ID: { type: "unique_id" },
    Files: { type: "files", subType: "url" },
  },
};

export const getImage = async (ids: number[]): Promise<Record<number, TempImage>> => {
  const result = await queryFromDB(schema, database_ids.tempImage);

  const mapped = result
    .filter((item) => ids.includes(item.ID))
    .map((item) => ({
      imageID: item.ID,
      name: item.Name,
      urls: item.Files,
    }))
    .reduce((acc, item) => {
      acc[item.imageID] = item;
      return acc;
    }, {} as Record<number, TempImage>);

  return mapped;
};
