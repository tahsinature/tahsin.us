import { database_ids, notion, queryFromDB } from "@/lib/notion";
import { GuestBookComment, NotionORMSchema } from "@/types";

const schema: NotionORMSchema = {
  properties: {
    Name: { type: "title" },
    Date: { type: "date" },
    Message: { type: "rich_text" },
  },
};

export const getComments = async (): Promise<GuestBookComment[]> => {
  const result = await queryFromDB(schema, database_ids.guestBook, [{ property: "Date", direction: "descending" }]);

  return result.map((item) => ({
    id: item.id,
    name: item.Name,
    date: item.Date.start,
    message: item.Message,
  }));
};

export const saveComment = async (name: string, message: string, date?: Date): Promise<GuestBookComment> => {
  if (!date) date = new Date();

  const result = await notion.pages.create({
    parent: { database_id: database_ids.guestBook },
    properties: {
      Name: { title: [{ text: { content: name } }] },
      Message: { rich_text: [{ text: { content: message } }] },
      Date: { date: { start: date.toISOString() } },
    },
  });

  return { id: result.id, name, date: date.toISOString(), message };
};
