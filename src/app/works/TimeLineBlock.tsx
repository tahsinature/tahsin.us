import { TableIcon, CalendarIcon } from "lucide-react";

import { Card } from "@/components/ui/card";
import Tags from "@/components/Blog/Tags";
import services from "@/services";
import { WorkPlace } from "@/types";
import Image from "next/image";

const TimeLineBlock = async ({ workplace }: { workplace: WorkPlace }) => {
  return (
    <Card className="inline-block p-5  w-full">
      <h2 className="mb-2">{workplace.company}</h2>
      <Image src={workplace.logo} width={500} height={500} alt={`${workplace.company} logo`} className="h-[30px] w-[auto] mb-5" />

      <div className="bg-gray-100 dark:bg-default-100 py-1 px-3 flex flex-wrap justify-between rounded-sm">
        <div className="flex items-center mr-5">
          <TableIcon size={"12"} className="mr-1" />
          <p className="text-sm">{workplace.position}</p>
        </div>
        <div className="flex items-center">
          <CalendarIcon size={"12"} className="mr-1" />
          <p className="text-sm">{workplace.timeRange}</p>
        </div>
      </div>

      <div className="mt-3">
        <p className="text-[small]">{workplace.description}</p>
      </div>

      <div className="mt-2">
        <Tags tags={workplace.specialization} />
      </div>
    </Card>
  );
};

export default TimeLineBlock;
