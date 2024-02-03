export type Language = { id: string; name: string; subOnLang: string; subOnEng?: string };

export type WorkPlace = {
  id: string;
  show: boolean;
  start: string;
  end: string;
  company: string;
  position: string;
  logo: string;
  url: string;
  location: string;
  specialization: Tag[];
  description?: string;
};

export type Image = {
  id: string;
  src: string;
  alt: string;
  caption: string;
  location: string;
  width: number;
  height: number;
  likeCount: number;
};

export type Blog = {
  id: string;
  title: string;
  description: string;
  coverImage: string;
  links: string[];
  created: string;
  lastEdited: string;
  tags: Tag[];
};

export type Tag = {
  id: string;
  name: string;
  logo: string;
  extension: string;
  wikiLink: string;
  description: string;
};

export type NotionORMSchema = {
  properties: {
    [key: string]: {
      type: "title" | "rich_text" | "files" | "relation" | "checkbox" | "unique_id";
      subType?: "url" | "external";
    };
  };
};

export type TempImage = {
  imageID: number;
  name: string;
  urls: string[];
};
