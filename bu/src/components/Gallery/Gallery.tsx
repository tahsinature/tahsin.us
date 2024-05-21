"use client";

import { useState } from "react";
import { Image } from "@nextui-org/react";
import { HeartIcon, X } from "lucide-react";

import { Image as ImageType } from "@/types";
import ImagePreview from "@/components/ImagePreview/ImagePreview";
import services from "@/services";

const getBlock = (image: ImageType) => {
  return (
    <div className="group relative cursor-pointer">
      <div className="overflow-hidden">
        <Image className="rounded-[1px] transition ease-in-out delay-150 duration-700 group-hover:opacity-50 group-hover:scale-110" src={image.src} width={image.width} height={image.height} alt={image.caption} />
      </div>
      <div className="opacity-0 group-hover:opacity-100 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-2xl text-white font-primary font-bold">
        <div className="flex flex-row items-center gap-2">
          <HeartIcon /> {image.likeCount}
        </div>
      </div>
    </div>
  );
};

const Gallery = (props: { photosFromServer: ImageType[] }) => {
  const [images, setImages] = useState<ImageType[]>(props.photosFromServer);
  const [selectedPhoto, setSelectedPhoto] = useState<ImageType>();

  const handleSelect = (id: string) => {
    const image = images.find((image) => image.id === id);

    setSelectedPhoto(image);
  };

  const getBlockColumn = (images: ImageType[]) => {
    return (
      <>
        {images.map((image) => (
          <div key={image.id} onClick={() => handleSelect(image.id)}>
            {getBlock(image)}
          </div>
        ))}
      </>
    );
  };

  const buildPhotoBlocks = () => {
    const maxColumns = 4;

    const columns = images.reduce<ImageType[][]>(
      (columns, image, index) => {
        columns[index % maxColumns].push(image);
        return columns;
      },
      [[], [], [], []]
    );

    return (
      <>
        {columns.map((column, index) => (
          <div key={index} className="flex flex-col justify-start gap-[0.3rem]">
            {getBlockColumn(column)}
          </div>
        ))}
      </>
    );
  };

  const handleModalClose = (image: ImageType) => {
    services.gallery.saveLikeCount(image.id, image.likeCount).then(() => {
      setImages((images) => images.map((i) => (i.id === image.id ? image : i)));
      setSelectedPhoto(undefined);
    });
  };

  return (
    <div>
      {selectedPhoto && <ImagePreview image={selectedPhoto} onModalClose={handleModalClose} />}
      <main className="container mx-auto">
        <div className="grid lg:grid-cols-4 grid-cols-2 gap-[0.3rem] mt-5">{buildPhotoBlocks()}</div>
      </main>
    </div>
  );
};

export default Gallery;
