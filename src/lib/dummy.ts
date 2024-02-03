import { Tag } from "@/types";

export const wait = (sec: number): Promise<void> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, sec * 1000);
  });
};

export const getDummyTags = ({ id = Math.random().toString() }): Tag => {
  return {
    id,
    name: "next.js",
    logo: "https://www.svgrepo.com/show/354113/nextjs-icon.svg",
    extension: "N",
    wikiLink: "https://en.wikipedia.org/wiki/Next.js",
    description: "Next.js is an open-source development framework built on top of Node.js.",
  };
};
