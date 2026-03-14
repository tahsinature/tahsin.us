import type { DirectiveConfig } from "./types";

export const directiveRegistry: Record<string, DirectiveConfig> = {
  card: {
    annotations: ["title", "description"],
    extractImage: true,
    extractAllImages: true,
    extractPage: true,
    collectBody: true,
  },

  "image-grid": {
    annotations: ["title", "columns", "max-show", "isolated"],
    extractAllImages: true,
    collectBody: false,
  },

  "hero-card": {
    annotations: ["title", "description", "columns"],
    extractImage: true,
    extractAllImages: true,
    extractAllPages: true,
    collectBody: false,
  },

  image: {
    annotations: ["title", "caption", "source", "alt", "width", "accent"],
    extractImage: true,
    collectBody: true,
  },

  heading: {
    annotations: ["title", "subtitle", "label", "number", "accent"],
    collectBody: true,
  },

  quote: {
    annotations: ["author", "source", "accent"],
    collectBody: true,
  },

  checkbox: {
    annotations: ["title", "accent", "progress"],
    collectBody: true,
  },

  list: {
    annotations: ["title", "accent"],
    collectBody: true,
  },

  "drop-cap": {
    annotations: ["accent"],
    collectBody: true,
  },

  "retro-disk": {
    annotations: ["title", "artist", "loop", "progress"],
    extractMedia: true,
    collectBody: false,
  },
};
