import { Image as ImageType } from "@/types";
import { Image } from "@nextui-org/react";
import classes from "./GalleryHome.module.scss";
import clsx from "clsx";

const imagesGal: ImageType[] = [
  { src: "https://picsum.photos/id/231/800/800", width: 200, height: 200, caption: "Caption", id: "1", likeCount: 0, alt: "alt", location: "location" },
  { src: "https://picsum.photos/id/232/800/800", width: 200, height: 200, caption: "Caption", id: "1", likeCount: 0, alt: "alt", location: "location" },
  { src: "https://picsum.photos/id/233/800/800", width: 200, height: 200, caption: "Caption", id: "1", likeCount: 0, alt: "alt", location: "location" },
  { src: "https://picsum.photos/id/234/800/800", width: 200, height: 200, caption: "Caption", id: "1", likeCount: 0, alt: "alt", location: "location" },
  { src: "https://picsum.photos/id/235/800/800", width: 200, height: 200, caption: "Caption", id: "1", likeCount: 0, alt: "alt", location: "location" },
  { src: "https://picsum.photos/id/236/800/800", width: 200, height: 200, caption: "Caption", id: "1", likeCount: 0, alt: "alt", location: "location" },
  { src: "https://picsum.photos/id/237/800/800", width: 200, height: 200, caption: "Caption", id: "1", likeCount: 0, alt: "alt", location: "location" },
  { src: "https://picsum.photos/id/238/800/800", width: 200, height: 200, caption: "Caption", id: "1", likeCount: 0, alt: "alt", location: "location" },
];

const GalleryHome = () => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {imagesGal.map((image) => (
        <div key={image.src} className={clsx("aspect-square", classes.SquareBox)}>
          <Image radius="none" className="object-cover" src={image.src} alt={image.alt} />
        </div>
      ))}
    </div>
  );
};

export default GalleryHome;
