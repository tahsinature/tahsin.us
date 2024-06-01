import moment from "moment";
import ImageStack from "@/components/Images/ImageStack";
import services from "@/services";

import GalleryHome from "@/components/Gallery/GalleryHome";
import LandingGalleryTop from "@/components/SVGs/LandingGalleryTop";
import fonts from "@/lib/fonts";
import clsx from "clsx";

export default async function Home() {
  const images = await services.other.getImage([6, 8]);
  const homeGalleryImages = await services.notionDbCalls.galleryHomePage.getAll();
  const experience = moment.duration(moment().diff(moment().set("year", 2018).startOf("year"))).humanize();
  const aboutMeText = `I am a solutions-oriented person who enjoys being challenged and engaged with projects that require me to work outside my comfort and knowledge set & a passionate and pragmatic programmer with ${experience} of professional experience, specializing in microservices & full-stack development using modern & robust technologies. Sometimes I work on things I find interesting, or things I think other people might find interesting. It’s nice when those things overlap.`;
  const pickUpLines = [
    "Life is a canvas, photography is my brush, and software is my palette; I blend them to create meaningful connections.",
    "In the symphony of life, photography is my melody, coding is my harmony, and caring is the rhythm that binds it all together.",
    "Every snapshot tells a story, every line of code solves a problem, and every act of care builds a better world.",
  ];

  return (
    <div className="text-center m-auto mt-8 md:mt-20">
      <h1 className={clsx("text-2xl md:text-4xl font-bold mb-10", fonts.pageSpecific.home.pickUpLine.className)}>Hello, my name is Mohammad Tahsin.</h1>
      <p className="text-justify mt-5">{aboutMeText}</p>

      <ImageStack className="mt-10 mb-10" images={images[6].urls as [string, string, string]} />

      <div className="text-center flex flex-col items-center mb-32 mt-16 md:mt-24">
        <p className={clsx(fonts.pageSpecific.home.pickUpLine.className, "text-xl md:text-2xl text-center md:w-[50%] mb-12")}>{pickUpLines[0]}</p>
        <LandingGalleryTop />
      </div>

      <GalleryHome images={homeGalleryImages} />

      {/* <SimpleGallery images={imagesGal} galleryID="gallery" /> */}
    </div>
  );
}

export const dynamic = "force-dynamic";
