import { useEffect } from "react";
import { getShortLinkMetadata } from "@shared/short-link-metadata";

export function useShortLinkMetadata(pathname: string, search: string) {
  useEffect(() => {
    const { title, tags } = getShortLinkMetadata(pathname, search);
    document.title = title;
    // Reuse tags inserted by the server and update them for client-side navigation.
    document.head.querySelectorAll("meta[data-short-link]").forEach((tag) => tag.remove());
    const elements = tags.map(({ name, property, content }) => {
      const element = document.createElement("meta");
      element.setAttribute("data-short-link", "");
      element.setAttribute(name ? "name" : "property", name ?? property!);
      element.content = content;
      document.head.append(element);
      return element;
    });
    return () => {
      document.title = "Tahsin";
      elements.forEach((element) => element.remove());
    };
  }, [pathname, search]);
}
