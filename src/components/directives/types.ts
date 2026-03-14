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
  /** Media source URL — extracted from <audio>/<video> tags in content */
  src?: string;
}

export interface DirectiveConfig {
  /** Known @key annotations */
  annotations: string[];
  extractImage?: boolean;
  extractAllImages?: boolean;
  extractPage?: boolean;
  /** Extract all <page> tags as a pages[] array */
  extractAllPages?: boolean;
  /** Extract media src from <audio>, <video> tags in content */
  extractMedia?: boolean;
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
  message: string;
}
