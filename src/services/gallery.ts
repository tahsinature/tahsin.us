import { getAll } from "@/services/notion-db-calls/galleryMain";
import { Image } from "@/types";

export const getImages = async (): Promise<Image[]> => {
  const result = await getAll();

  return result.map((imgage) => ({
    id: imgage.id,
    src: imgage.imageURLS[0],
    caption: imgage.caption,
    width: imgage.width || 1000,
    height: imgage.height || 1000,
  }));
};
