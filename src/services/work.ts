import { database_ids, queryFromDB } from "@/lib/notion";
import { getTags } from "@/services/blog";
import { NotionORMSchema, WorkPlace } from "@/types";

// export const getWorkPlaces = async (): Promise<WorkPlace[]> => {
//   return [
//     {
//       id: "1",
//       company: "CARFAX",
//       position: "Software Engineer",
//       location: "Centreville, VA",
//       logo: "/images/carfax.png",
//       specialization: "Front End",
//       timeRange: "June 2021 - Present",
//       url: "https://www.carfax.com",
//       description:
//         "I am currently working on the CARFAX for Dealership product. I am responsible for building the front end of the product using React and Redux. I am also responsible for building the backend of the product using Java and Spring Boot.",
//     },
//     {
//       id: "2",
//       company: "EnPowered",
//       position: "Software Engineer",
//       location: "Toronto, ON",
//       logo: "/images/enpowered.png",
//       specialization: "Front End",
//       timeRange: "January 2021 - May 2021",
//       url: "https://www.getenpowered.com",
//       description:
//         "I am currently working on the CARFAX for Dealership product. I am responsible for building the front end of the product using React and Redux. I am also responsible for building the backend of the product using Java and Spring Boot.",
//     },
//     {
//       id: "3",
//       company: "RTX",
//       position: "Software Engineer",
//       location: "Remote",
//       logo: "/images/rtx.png",
//       specialization: "Front End",
//       timeRange: "August 2020 - December 2020",
//       url: "https://www.rtx.com",
//       description:
//         "I am currently working on the CARFAX for Dealership product. I am responsible for building the front end of the product using React and Redux. I am also responsible for building the backend of the product using Java and Spring Boot.",
//     },
//     {
//       id: "4",
//       company: "Bountie",
//       position: "Software Engineer",
//       location: "Singapore",
//       logo: "/images/bountie.png",
//       specialization: "Full Stack",
//       timeRange: "May 2020 - August 2020",
//       url: "https://www.bountie.io",
//       description:
//         "I am currently working on the CARFAX for Dealership product. I am responsible for building the front end of the product using React and Redux. I am also responsible for building the backend of the product using Java and Spring Boot.",
//     },
//     {
//       id: "5",
//       company: "TerasWork",
//       position: "Software Engineer",
//       location: "Remote",
//       logo: "/images/teraswork.png",
//       specialization: "Front End",
//       timeRange: "January 2020 - May 2020",
//       url: "https://www.teraswork.com",
//       description:
//         "I am currently working on the CARFAX for Dealership product. I am responsible for building the front end of the product using React and Redux. I am also responsible for building the backend of the product using Java and Spring Boot.",
//     },
//     {
//       id: "6",
//       company: "HaloJasa",
//       position: "Software Engineer",
//       location: "Jakarta, Indonesia",
//       logo: "/images/halojasa.png",
//       specialization: "Full Stack",
//       timeRange: "August 2019 - December 2019",
//       url: "https://www.halojasa.com",
//       description:
//         "I am currently working on the CARFAX for Dealership product. I am responsible for building the front end of the product using React and Redux. I am also responsible for building the backend of the product using Java and Spring Boot.",
//     },
//   ];
// };

const schema: NotionORMSchema = {
  properties: {
    Name: { type: "title" },
    Loction: { type: "rich_text" },
    Description: { type: "rich_text" },
    Logo: { type: "files", subType: "url" },
    TimeRange: { type: "rich_text" },
    Tags: { type: "relation" },
    URL: { type: "files", subType: "external" },
    Position: { type: "rich_text" },
    Location: { type: "rich_text" },
  },
};

export const getWorkPlaces = async (): Promise<WorkPlace[]> => {
  const tags = await getTags();
  const result = await queryFromDB(schema, database_ids.work);

  return result.map((item) => {
    const tagsIds = item.Tags.map((tagId: string) => tagId);
    const specialization = tags.filter((tag) => tagsIds.includes(tag.id));
    return {
      id: item.id,
      company: item.Name,
      position: item.Position,
      location: item.Location,
      logo: item.Logo[0],
      specialization,
      timeRange: item.TimeRange,
      url: item.URL,
      description: item.Description,
    };
  });
};
