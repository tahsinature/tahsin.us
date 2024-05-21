"use client";

import { Image } from "@nextui-org/react";

const DynamicImage = () => {
  const src = `http://demo.cloudimg.io/s/crop/200x200/http://sample.li/ny.jpg`;
  const alt = "Mohammad Tahsin";
  return <Image src={src} alt={alt} className="w-[500px] rounded-sm" />;
};

export default DynamicImage;
