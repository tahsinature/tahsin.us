import { Metadata } from "next";
import Head from "next/head";

import Gallery from "@/components/Gallery/Gallery";
import services from "@/services";

export const metadata: Metadata = {
  title: "Gallery | tahsin.us",
  description: "All photographs from Tahsin",
};

const Page = async () => {
  const photosFromServer = await services.gallery.getImages();

  return (
    <div className="pb-10">
      <Gallery photosFromServer={photosFromServer} />
    </div>
  );
};

export default Page;
