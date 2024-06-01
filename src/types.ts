namespace NotionTypes {
  export namespace PropertyTypes {
    export type KeyValueExternal = {
      name: string;
      url: string;
    };
  }
}

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
  caption: string;
  width: number;
  height: number;
};

export type Blog = {
  id: string;
  title: string;
  description: string;
  coverImage: string;
  links: string[];
  date: { start: string; end: string | null };
  tags: Tag[];
  created: string;
  lastEdited: string;
};

export type Tag = {
  id: string;
  name: string;
  logos: string[];
  wikiLinks: string[];
  description: string;
};

export type Tool = {
  id: string;
  categoryName: string;
  tags: Tag[];
};

export type Project = {
  id: string;
  name: string;
  description: string;
  types: MultiSelect[];
  preview: string[];
  links: NotionTypes.PropertyTypes.KeyValueExternal[];
  sortField: number;
  tags: Tag[];
};

export type ProgrammingLanguage = {
  id: string;
  name: string;
  code: string;
  output: string;
  program: string;
  logo: string;
};

export type NotionORMSchema = {
  properties: {
    [key: string]: {
      type: "title" | "rich_text" | "files" | "relation" | "checkbox" | "unique_id" | "number" | "date" | "multi_select" | "files-external-key-value";
      subType?: "url" | "external";
      transformKey?: string;
    };
  };
};

export type MultiSelect = {
  id: string;
  name: string;
  color: string;
};

export type TempImage = {
  imageID: number;
  name: string;
  urls: string[];
};

export type GuestBookComment = {
  id: string;
  name: string;
  date: string;
  message: string;
};
