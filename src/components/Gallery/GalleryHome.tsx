"use client";

import clsx from "clsx";
import { Image } from "@nextui-org/react";
import classes from "./GalleryHome.module.scss";
import { PhotoProvider, PhotoView } from "react-photo-view";
import "react-photo-view/dist/react-photo-view.css";

type IProp = {
  images: {
    imageURL: string;
    caption: string;
  }[];
};

const GalleryHome = (props: IProp) => {
  return (
    <PhotoProvider speed={() => 800} maskOpacity={0.9}>
      <div className="grid grid-cols-3 md:grid-cols-5 gap-4">
        {props.images.map((image, index) => (
          <div key={image.imageURL} className={clsx("aspect-square", classes.SquareBox)}>
            <PhotoView key={index} src={image.imageURL} overlay>
              <Image radius="none" className="object-cover" src={image.imageURL} alt={image.caption} />
            </PhotoView>
          </div>
        ))}
      </div>
    </PhotoProvider>
  );
};

export default GalleryHome;
