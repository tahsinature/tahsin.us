import { Metadata } from "next";
import { Briefcase } from "lucide-react";
import clsx from "clsx";
import { Image } from "@nextui-org/react";

import services from "@/services";
import TimeLineBlock from "@/app/works/TimeLineBlock";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Works | tahsin.us",
  description: "Tahsin's work experiences",
};

const Page = async () => {
  const data = await services.work.getWorkPlaces();
  const images = await services.other.getImage([2, 5]);

  const p1 = `As a FullStack developer at ${data[0].company}, every day is an adventure in code and creativity. Whether it's debugging a tricky algorithm or collaborating with my team to
  brainstorm innovative features, I'm passionate about pushing boundaries and delivering exceptional digital experiences. Welcome to my journey through the ever-evolving landscape of software development!`;

  const p2 = `This is the time when I made the best decision of my life. I started to learn programming and I was so passionate about it. I used to spend 10-12 hours a day learning and practicing.`;

  return (
    <div>
      <div className="mb-10">
        <div className="flex justify-center p-10">
          <Image src={images[2].urls[0]} alt="Works" width={1920} height={1080} className="w-[500px] rounded-sm" />
        </div>
        <p className="text-center text-sm md:text-medium">{p1}</p>
      </div>
      <div className="divider" />

      <ul className="timeline timeline-snap-icon max-md:timeline-compact timeline-vertical">
        {data.map((work, index) => (
          <li key={work.id}>
            <div className="timeline-middle">
              <Button variant={"ghost"}>
                <Briefcase className={clsx({ "text-green-400": work.end.toLowerCase().includes("present") })} />
              </Button>
            </div>
            <div className={`timeline-${index % 2 === 0 ? "start" : "end"}`} style={{ marginBottom: "2rem", marginTop: "1rem" }}>
              <TimeLineBlock workplace={work} />
            </div>
            <hr className="bg-gray-100 dark:bg-gray-800" />
          </li>
        ))}
      </ul>

      <div className="divider" />
      <div>
        <h2 className="text-center text-large">2018</h2>
        <div className="flex justify-center p-10">
          <Image src={images[5].urls[0]} alt="Works" width={1920} height={1080} className="w-[500px] rounded-sm" />
        </div>
        <p className="text-center text-sm md:text-medium">{p2}</p>
      </div>
    </div>
  );
};

export default Page;
