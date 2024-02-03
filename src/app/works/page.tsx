import { Metadata } from "next";
import { Briefcase } from "lucide-react";

import services from "@/services";
import TimeLineBlock from "@/app/works/TimeLineBlock";
import { Button } from "@/components/ui/button";
import clsx from "clsx";

export const metadata: Metadata = {
  title: "Works | tahsin.us",
  description: "Tahsin's work experiences",
};

const Page = async () => {
  const data = await services.work.getWorkPlaces();

  return (
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
  );
};

export default Page;
