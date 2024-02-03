import Head from "next/head";

import Gallery from "@/components/Gallery/Gallery";
import services from "@/services";

const Page = async () => {
  const photosFromServer = await services.gallery.getImages();

  return (
    <div className="pb-10">
      <Head>
        <title>Gallery</title>
        <meta name="description" content="Tahsin Photography" />
      </Head>

      <Gallery photosFromServer={photosFromServer} />
    </div>
  );
};

export default Page;
