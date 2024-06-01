"use client";

import * as React from "react";

import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { PhotoProvider, PhotoView } from "react-photo-view";
import "react-photo-view/dist/react-photo-view.css";
import { Image } from "@nextui-org/react";

const photoGearImages = [
  { src: "https://images.squarespace-cdn.com/content/v1/5534618be4b0fc1dd67c939c/1577370803392-9JN065V1O688M09CO2UL/size.jpg", name: "Nikon Z50" },
  { src: "https://images.squarespace-cdn.com/content/v1/5264f7c9e4b0a3247c641860/1634810500548-P0M2D6QO0C4BRWHMIIAI/sony-a7iv.jpg?format=1500w", name: "Sony A7 IV" },
  { src: "https://scottwyden.com/wp-content/uploads/2013/06/long-exposure-photography-choices-tripod.jpg", name: "Takarra SM-7324" },
  { src: "https://bsmedia.business-standard.com/_media/bs/img/article/2023-10/02/full/1696225756-5527.jpg", name: "iPhone 15 Pro Max" },
  { src: "https://www.digitaltrends.com/wp-content/uploads/2021/11/pixel-6-pro-top-back-in-hand.jpg?fit=2000%2C1333&p=1", name: "Google Pixel 6 Pro" },
];

function PhotoGear() {
  return (
    <PhotoProvider speed={() => 800} maskOpacity={0.9}>
      <div className="flex justify-center select-none">
        <Carousel opts={{ align: "start", loop: true }} className="w-full max-w-sm">
          <CarouselContent>
            {photoGearImages.map((img, index) => (
              <CarouselItem key={index} className="basis-1/3">
                <div className="p-1">
                  <Card className="overflow-hidden flex justify-end">
                    <CardContent className="flex aspect-square items-center justify-center p-0">
                      <PhotoView key={index} src={img.src} overlay>
                        <Image removeWrapper radius="none" className="object-cover h-[100%] w-[100%]" src={img.src} alt={"photo gear"} />
                      </PhotoView>
                    </CardContent>
                    <CardFooter className="justify-between before:bg-white/10 border-white/20 border-1 overflow-hidden py-1 absolute before:rounded-xl rounded-large bottom-1 shadow-small ml-1 z-10 mb-1 backdrop-blur-sm p-1">
                      <p className="text-tiny text-white/80">{img.name}</p>
                    </CardFooter>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="hidden md:block">
            <CarouselPrevious />
            <CarouselNext />
          </div>
        </Carousel>
      </div>
    </PhotoProvider>
  );
}

export default PhotoGear;
