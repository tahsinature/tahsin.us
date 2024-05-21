import { Metadata } from "next";
import Gallery from "@/components/Gallery/Gallery";
import services from "@/services";
import { Image } from "@nextui-org/react";

export const metadata: Metadata = {
  title: "Gallery | tahsin.us",
  description: "All photographs from Tahsin",
};

const Page = async () => {
  const photosFromServer = await services.gallery.getImages();
  const tahsinWithCameraImg = await services.other.getImage([7]);

  const src = tahsinWithCameraImg["7"].urls[0];
  const photographyAboutMe = `As a hobbiest photographer, I love to capture moments, nature, abstract things. I love to play with light, shadow, and composition. My favorite camera make is Sony & current camera: Sony A7 IV, Nikon Z50 & iPhone 15 Pro Max.`;

  return (
    <div className="pb-10">
      <div className="w-[30%] m-auto">
        <Image src={src} alt="Tahsin with camera" className="rounded-md" />
      </div>
      <p className="mt-5 text-sm text-center">{photographyAboutMe}</p>

      <div className="divider m-10" />

      <Gallery photosFromServer={photosFromServer} />
    </div>
  );
};

export default Page;

export const dynamic = "force-dynamic";
