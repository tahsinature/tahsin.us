import _ from "lodash";

import { database_ids, notion } from "@/lib/notion";
import { Blog, Tag } from "@/types";

export const getAllArticles = async (): Promise<Blog[]> => {
  const response = await notion.databases
    .query({ database_id: database_ids.blog })
    .then((response) => {
      if (response.has_more) {
        console.warn("WARNING: Database has more results than returned");
      }

      return response.results.map((page: any) => ({
        id: page.id,
        coverImage: _.get(page, "properties.Cover.files[0].file.url", ""),
        title: _.get(page, "properties.Name.title[0].text.content", ""),
        description: _.get(page, "properties.Description.rich_text[0].text.content", ""),
        links: _.get(page, "properties.Links.files", []).map((link: any) => link.external.url),
        created: page.created_time,
        lastEdited: page.last_edited_time,
        tagsIds: _.get(page, "properties.Tags.relation", []).map((tag: any) => tag.id),
      }));
    })
    .catch((err) => {
      console.error(err.message);
      return [];
    });

  const result = response.filter((page) => page.coverImage && page.title && page.links.length > 0);

  return result;
};

export const getArticle = async (id: string): Promise<Blog> => {
  const response = await notion.pages.retrieve({ page_id: id }).then((page) => {
    return {
      id: page.id,
      coverImage: _.get(page, "properties.Cover.files[0].file.url", ""),
      title: _.get(page, "properties.Name.title[0].text.content", ""),
      description: _.get(page, "properties.Description.rich_text[0].text.content", ""),
      links: _.get(page, "properties.Links.files", []).map((link: any) => link.external.url),
      created: (page as any).created_time,
      lastEdited: (page as any).last_edited_time,
      tagsIds: _.get(page, "properties.Tags.relation", []).map((tag: any) => tag.id),
    };
  });

  return response;
};

export const getTags = async (): Promise<Tag[]> => {
  return notion.databases
    .query({ database_id: database_ids.tags })
    .then((response) => {
      if (response.has_more) {
        console.warn("WARNING: Database has more results than returned");
      }

      return response.results.map((page: any) => ({
        id: page.id,
        name: _.get(page, "properties.Name.title[0].text.content", ""),
        logo: _.get(page, "properties.Logo.files[0].file.url", ""),
        extension: _.get(page, "properties.Extension.rich_text[0].text.content", ""),
        wikiLink: _.get(page, "properties.Wiki.files[0].external.url", ""),
      }));
    })
    .catch((err) => {
      console.error(err.message);
      return [];
    });
};
