import Link from "next/link";
import clsx from "clsx";

import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Tag } from "@/types";

const TagHoverCard = ({ children, tag, className }: { children: React.ReactNode; tag: Tag; className?: string }) => {
  return (
    <HoverCard>
      <HoverCardTrigger asChild>{children}</HoverCardTrigger>
      <HoverCardContent className="w-80">
        <div className={clsx("flex space-x-4", className)}>
          <Avatar>
            <AvatarImage src={tag.logo} width={20} height={20} />
            <AvatarFallback>{tag.extension}</AvatarFallback>
          </Avatar>
          <div className="space-y-1 grow">
            <h4 className="font-semibold mb-2">{tag.name}</h4>
            <p className="text-sm">{tag.description}</p>
            <Link href={tag.wikiLink} target="_blank">
              <Button size="sm" className="py-0.5 px-10 w-full mt-2" variant={"outline"}>
                <small>Learn More</small>
              </Button>
            </Link>
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
};

export default TagHoverCard;
