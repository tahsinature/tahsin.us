import _ from "lodash";

import { database_ids, notion, queryFromDB } from "@/lib/notion";
import { Blog, NotionORMSchema, Tag } from "@/types";

const articlechema: NotionORMSchema = {
  properties: {
    Name: { type: "title", transformKey: "title" },
    Description: { type: "rich_text", transformKey: "description" },
    Cover: { type: "files", subType: "url", transformKey: "coverImage" },
    Links: { type: "files", subType: "external", transformKey: "links" },
    Tags: { type: "relation", transformKey: "tagIds" },
    Date: { type: "date", transformKey: "date" },
  },
};

const tagSchema: NotionORMSchema = {
  properties: {
    Name: { type: "title", transformKey: "name" },
    Description: { type: "rich_text", transformKey: "description" },
    Logo: { type: "files", subType: "url", transformKey: "logos" },
    Extension: { type: "rich_text", transformKey: "extension" },
    Wiki: { type: "files", subType: "external", transformKey: "wikiLinks" },
  },
};

export const getArticles = async (): Promise<Blog[]> => {
  const tags = await getTags();
  const response = await queryFromDB(articlechema, database_ids.blog);

  return response
    .map((page: any) => {
      const tagsIds = page.tagIds;
      delete page.tagIds;

      return {
        ...page,
        tags: tags.filter((tag) => tagsIds.includes(tag.id)),
      };
    })
    .filter((page) => page.coverImage && page.title && page.links.length > 0);
};

export const getArticle = async (id: string): Promise<Blog> => {
  const tags = await getTags();

  const response = await notion.pages.retrieve({ page_id: id }).then((page) => {
    const tagsIds = _.get(page, "properties.Tags.relation", []).map((tag: any) => tag.id);

    return {
      id: page.id,
      coverImage: _.get(page, "properties.Cover.files[0].file.url", ""),
      title: _.get(page, "properties.Name.title[0].text.content", ""),
      description: _.get(page, "properties.Description.rich_text[0].text.content", ""),
      links: _.get(page, "properties.Links.files", []).map((link: any) => link.external.url),
      created: (page as any).created_time,
      lastEdited: (page as any).last_edited_time,
      tags: tags.filter((tag) => tagsIds.includes(tag.id)),
    };
  });

  return response;
};

export const getTags = async (ids?: string[]): Promise<Tag[]> => {
  const response = await queryFromDB(tagSchema, database_ids.tags);

  return response.filter((tag) => (ids ? ids.includes(tag.id) : true));
};
