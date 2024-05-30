import { Metadata } from "next";
import services from "@/services";
import Gallery from "@/components/Gallery/Gallery";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import PhotoGear from "@/app/photographs/PhotoGear";

export const metadata: Metadata = {
  title: "Gallery | tahsin.us",
  description: "All photographs from Tahsin",
};

const Page = async () => {
  const photosFromServer = await services.gallery.getImages();
  // const tahsinWithCameraImg = await services.other.getImage([7]);
  // const src = tahsinWithCameraImg["7"].urls[0];

  const photographyAboutMe = `As a hobbiest photographer, I love to capture moments, nature, abstract things. I love to play with light, shadow, and composition. My favorite camera make is Sony & current camera: Sony A7 IV, Nikon Z50 & iPhone 15 Pro Max.`;

  return (
    <div>
      <PhotoGear />
      <p className="mt-5 text-sm text-center">{photographyAboutMe}</p>

      <div className="divider m-5" />

      <Gallery photosFromServer={photosFromServer} />
    </div>
  );
};

export default Page;

export const dynamic = "force-dynamic";
