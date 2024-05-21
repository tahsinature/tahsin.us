import ImageStack from "@/components/Images/ImageStack";
import services from "@/services";
import moment from "moment";

export default async function Home() {
  const images = await services.other.getImage([6]);
  const experience = moment.duration(moment().diff(moment().set("year", 2018).startOf("year"))).humanize();
  const aboutMeText = `I am a solutions-oriented person who enjoys being challenged and engaged with projects that require me to work outside my comfort and knowledge set & a passionate and pragmatic programmer with ${experience} of professional experience, specializing in microservices & full-stack development using modern & robust technologies. Sometimes I work on things I find interesting, or things I think other people might find interesting. It’s nice when those things overlap.`;

  return (
    <div className="text-center m-auto">
      <ImageStack images={images[6].urls as [string, string, string]} />
      <h1 className="text-lg font-bold">Mohammad Tahsin</h1>
      <p className="text-justify mt-5 text-sm">{aboutMeText}</p>
    </div>
  );
}

export const dynamic = "force-dynamic";
