"use client";

import * as React from "react";

import { Card, CardContent } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { PhotoProvider, PhotoView } from "react-photo-view";
import "react-photo-view/dist/react-photo-view.css";
import { Image } from "@nextui-org/react";

function PhotoGear() {
  return (
    <PhotoProvider speed={() => 800} maskOpacity={0.9}>
      <div className="flex justify-center">
        <Carousel opts={{ align: "start", loop: true }} className="w-full max-w-sm">
          <CarouselContent>
            {Array.from({ length: 5 }).map((_, index) => (
              <CarouselItem key={index} className="basis-1/3">
                <div className="p-1">
                  <Card className="overflow-hidden">
                    <CardContent className="flex aspect-square items-center justify-center p-0">
                      <PhotoView key={index} src={"https://images.squarespace-cdn.com/content/v1/5534618be4b0fc1dd67c939c/1577370803392-9JN065V1O688M09CO2UL/size.jpg"} overlay>
                        <Image removeWrapper radius="none" className="object-cover h-[100%]" src={"https://images.squarespace-cdn.com/content/v1/5534618be4b0fc1dd67c939c/1577370803392-9JN065V1O688M09CO2UL/size.jpg"} alt={"photo gear"} />
                      </PhotoView>
                    </CardContent>
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
