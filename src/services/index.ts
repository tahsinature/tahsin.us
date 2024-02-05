import * as language from "./language";
import * as work from "./work";
import * as gallery from "./gallery";
import * as blog from "./blog";
import * as other from "./other";
import * as notionDbCalls from "./notion-db-calls";

const services = {
  notionDbCalls,
  language,
  work,
  gallery,
  blog,
  other,
};

export default services;
