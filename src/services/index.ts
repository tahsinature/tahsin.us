import * as language from "./language";
import * as work from "./work";
import * as gallery from "./gallery";
import * as blog from "./blog";
import * as other from "./other";
import * as guestBook from "./guestBook";
import * as notionDbCalls from "./notion-db-calls";
import * as ai from "./ai";

const services = {
  notionDbCalls,
  language,
  work,
  gallery,
  blog,
  other,
  guestBook,
  ai,
};

export default services;
