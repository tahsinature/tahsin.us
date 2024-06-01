"use client";

import { useState } from "react";
import PhotoAlbum from "react-photo-album";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import Fullscreen from "yet-another-react-lightbox/plugins/fullscreen";
import Slideshow from "yet-another-react-lightbox/plugins/slideshow";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import "yet-another-react-lightbox/plugins/thumbnails.css";

import { Image as ImageType } from "@/types";
import classes from "./Gallery.module.scss";

const Gallery = (props: { photosFromServer: ImageType[] }) => {
  const [index, setIndex] = useState(-1);

  return (
    <div className={classes.Root}>
      <PhotoAlbum layout="rows" photos={props.photosFromServer} onClick={({ index }) => setIndex(index)} spacing={6} />
      <Lightbox slides={props.photosFromServer} open={index >= 0} index={index} close={() => setIndex(-1)} plugins={[Fullscreen, Slideshow, Thumbnails, Zoom]} />
    </div>
  );
};

export default Gallery;
