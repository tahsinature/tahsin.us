/** Where a directive can be used */
export type DirectiveHost = "toggle" | "audio" | "video" | "file" | "pdf";

export interface PageLink {
  pageId: string;
  title: string;
}

export interface DirectiveProps {
  [key: string]: string | string[] | PageLink[] | undefined;
  images?: string[];
  image?: string;
  pageId?: string;
  /** All <page> tags extracted as navigable links */
  pages?: PageLink[];
  body?: string;
  /** Media source URL — set when directive is hosted on audio/video/file/pdf */
  src?: string;
}

export interface DirectiveConfig {
  /** Which host elements this directive supports */
  hosts: DirectiveHost[];
  /** Known @key annotations */
  annotations: string[];
  extractImage?: boolean;
  extractAllImages?: boolean;
  extractPage?: boolean;
  /** Extract all <page> tags as a pages[] array */
  extractAllPages?: boolean;
  collectBody?: boolean;
}

export interface DirectiveResult {
  directiveType: string;
  props: DirectiveProps;
  /** Non-fatal issues (e.g. unknown annotations) */
  warnings: string[];
}

export interface DirectiveError {
  directiveType: string;
  host: DirectiveHost;
  message: string;
}
