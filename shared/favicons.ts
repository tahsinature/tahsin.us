export const faviconVariants = {
  "interlocked-mt": { name: "Interlocked MT", directory: "01-interlocked-mt" },
  "mint-circuit": { name: "Mint circuit", directory: "03-mint-circuit" },
  "cobalt-fold": { name: "Cobalt fold", directory: "04-cobalt-fold" },
  "ivory-serif": { name: "Ivory serif", directory: "05-ivory-serif" },
  "coral-cut": { name: "Coral cut", directory: "06-coral-cut" },
  "shutter-mark": { name: "Shutter mark", directory: "07-shutter-mark" },
  "terminal-t": { name: "Terminal T", directory: "08-terminal-t" },
  "terracotta-mt": { name: "Terracotta MT", directory: "09-terracotta-mt" },
  "architects-t": { name: "Architect’s T", directory: "10-architects-t" },
};

/** Change this value to any key above, then rebuild/deploy. */
export const faviconConfig: { activeFavicon: keyof typeof faviconVariants } = {
  activeFavicon: "interlocked-mt",
};

export function getFaviconAssets() {
  const base = `/favicon-variants/${faviconVariants[faviconConfig.activeFavicon].directory}`;
  return {
    ico: `${base}/favicon.ico`,
    png: `${base}/favicon.png`,
    apple: `${base}/apple-touch-icon.png`,
  };
}

/** Vite uses the same selection for the initial HTML and the React header. */
export function injectFaviconLinks(html: string): string {
  const assets = getFaviconAssets();
  return html.replace(
    "<!-- favicon-links -->",
    [
      `<link rel="icon" type="image/x-icon" href="${assets.ico}" />`,
      `<link rel="icon" type="image/png" sizes="256x256" href="${assets.png}" />`,
      `<link rel="apple-touch-icon" sizes="180x180" href="${assets.apple}" />`,
    ].join("\n    "),
  );
}
