"use client";

import { useState } from "react";
import { Chip, Avatar } from "@nextui-org/react";
import Link from "next/link";
import clsx from "clsx";

import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { Avatar as AvatarShadCN, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Tag } from "@/types";

const TagHoverCard = ({ tag }: { tag: Tag }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <HoverCard open={isOpen} onOpenChange={setIsOpen}>
      <HoverCardTrigger asChild>
        <div onClick={() => setIsOpen(true)}>
          <Chip
            radius="sm"
            className={clsx("cursor-pointer transition-all", { "border-green-800": isOpen })}
            variant="bordered"
            avatar={<Avatar name={tag.extension} size="sm" src={tag.logo} style={{ width: 15, height: 15, backgroundColor: "transparent" }} />}
          >
            <small>{tag.name}</small>
          </Chip>
        </div>
      </HoverCardTrigger>

      <HoverCardContent className="w-80">
        <div className={clsx("flex space-x-4 z-50")}>
          <AvatarShadCN>
            <AvatarImage src={tag.logo} width={20} height={20} className="object-cover" />
            <AvatarFallback>{tag.extension}</AvatarFallback>
          </AvatarShadCN>
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

export default function Tags({ tags }: { tags: Tag[] }) {
  return (
    <div className="flex gap-2 flex-wrap">
      {tags.map((tag) => (
        <TagHoverCard tag={tag} key={tag.id} />
      ))}
    </div>
  );
}
