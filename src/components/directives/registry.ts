import type { DirectiveConfig } from "./types";

export const directiveRegistry: Record<string, DirectiveConfig> = {
  /**
   * Card — compact row with thumbnail, title, description, and optional page link.
   * Hosts: toggle
   * Annotations: @title, @description
   * Auto-extracts: first image, all images (slideshow), <page> tag, remaining text as body
   */
  card: {
    hosts: ["toggle"],
    annotations: ["title", "description"],
    extractImage: true,
    extractAllImages: true,
    extractPage: true,
    collectBody: true,
  },

  /**
   * Image Grid — responsive grid of images with optional max-show and isolated lightbox.
   * Hosts: toggle
   * Annotations: @title, @columns (default 3), @max-show (limit visible), @isolated (own lightbox)
   * Auto-extracts: all images
   */
  "image-grid": {
    hosts: ["toggle"],
    annotations: ["title", "columns", "max-show", "isolated"],
    extractAllImages: true,
    collectBody: false,
  },

  /**
   * Hero Card — large cover image with overlaid title, description, and child page links.
   * Hosts: toggle
   * Annotations: @title, @description, @columns (for page list layout)
   * Auto-extracts: first image (cover), all <page> tags as navigable list items
   */
  "hero-card": {
    hosts: ["toggle"],
    annotations: ["title", "description", "columns"],
    extractImage: true,
    extractAllImages: true,
    extractAllPages: true,
    collectBody: false,
  },

  /**
   * Retro Disk — vinyl record audio player with spinning animation.
   * Hosts: audio
   * Annotations: @title, @artist
   * Uses the host audio src for playback.
   */
  "retro-disk": {
    hosts: ["audio"],
    annotations: ["title", "artist"],
    collectBody: false,
  },
};
