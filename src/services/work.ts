import moment from "moment";

import { database_ids, queryFromDB } from "@/lib/notion";
import { NotionORMSchema, WorkPlace } from "@/types";
import { getTags } from "@/services/blog";
import { sortArrayByDate } from "@/lib/datetime";

const schema: NotionORMSchema = {
  properties: {
    Name: { type: "title" },
    Loction: { type: "rich_text" },
    Description: { type: "rich_text" },
    Logo: { type: "files", subType: "url" },
    Show: { type: "checkbox" },
    Start: { type: "rich_text" },
    End: { type: "rich_text" },
    Tags: { type: "relation" },
    URL: { type: "files", subType: "external" },
    Position: { type: "rich_text" },
    Location: { type: "rich_text" },
  },
};

export const getWorkPlaces = async (): Promise<WorkPlace[]> => {
  const tags = await getTags();

  const result = (await queryFromDB(schema, database_ids.work))
    .filter((item) => item.Show)
    .map((item) => {
      const startTime = moment(item.Start).format("MMM YYYY");
      const endTime = item.End ? moment(item.End).format("MMM YYYY") : "Present";

      return { ...item, Start: startTime, End: endTime };
    });

  return sortArrayByDate(result, "Start").map((item) => {
    const tagsIds = item.Tags.map((tagId: string) => tagId);
    const specialization = tags.filter((tag) => tagsIds.includes(tag.id));
    return {
      id: item.id,
      show: item.Show,
      company: item.Name,
      position: item.Position,
      location: item.Location,
      logo: item.Logo[0],
      specialization,
      start: item.Start,
      end: item.End,
      url: item.URL[0],
      description: item.Description,
    };
  });
};
