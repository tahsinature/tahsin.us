import TagHoverCard from "@/components/Blog/TagHoverCard";
import services from "@/services";
import { Chip, Avatar } from "@nextui-org/react";
import Link from "next/link";

export default async function Tags({ tagIds }: { tagIds: string[] }) {
  const tags = await services.blog.getTags();
  const selectedTags = tags.filter((tag) => tagIds.includes(tag.id));

  return (
    <div className="flex gap-2">
      {selectedTags.map((tag) => (
        <TagHoverCard tag={tag} key={tag.id} className="z-50">
          <Link key={tag.id} href={`/blogs/tags/${tag.name.toLowerCase()}`}>
            <Chip variant="dot" avatar={<Avatar name={tag.extension} size="sm" src={tag.logo} style={{ width: 15, height: 15 }} />}>
              <small>{tag.name}</small>
            </Chip>
          </Link>
        </TagHoverCard>
      ))}
    </div>
  );
}
