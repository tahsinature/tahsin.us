"use client";

import { useState } from "react";
import Link from "next/link";
import { Card, Image, CardFooter, CardBody } from "@nextui-org/react";

import { Blog } from "@/types";
import ViewSwitch from "@/components/Blog/ViewSwitch";
import TagFilterDropdown from "@/components/Blog/TagFilterDropdown";

const GalleryView = ({ blogs }: { blogs: Blog[] }) => {
  return (
    <div className="grid lg:grid-cols-4 grid-cols-1 gap-[1rem]">
      {blogs.map((blog) => (
        <Link href={`/blogs/${blog.id}`} key={blog.id}>
          <Card isFooterBlurred radius="sm" className="w-full h-[200px] col-span-12 sm:col-span-7">
            <Image radius="none" removeWrapper alt={`${blog.title} background`} className="z-0 w-full h-full object-cover" src={blog.coverImage} />
            <CardFooter className="absolute bg-black/40 bottom-0 z-10 border-t-1 border-default-600 dark:border-default-100">
              <div className="flex flex-grow gap-2 items-center">
                <div className="flex flex-col">
                  <p className="text-tiny text-white/60">{blog.title}</p>
                </div>
              </div>
            </CardFooter>
          </Card>
        </Link>
      ))}
    </div>
  );
};

const YearView = ({ blogs }: { blogs: Blog[] }) => {
  const groupedByYear: any = blogs.reduce((acc, blog) => {
    const year = new Date(blog.date.start).getFullYear();
    if (!acc[year]) {
      acc[year] = [];
    }
    acc[year].push(blog);
    return acc;
  }, {} as { [key: number]: Blog[] });

  return (
    <div className="w-full">
      <hr className="mt-3 mb-8" />
      {Object.keys(groupedByYear).map((year: string) => (
        <div key={year} className="mb-7">
          <h2 className="text-2xl font-bold">{year}</h2>
          <div className="grid lg:grid-cols-4 grid-cols-1 gap-5">
            {groupedByYear[year].map((blog: any) => (
              <Link href={`/blogs/${blog.id}`} key={blog.id}>
                <div className="flex flex-row items-center hover:bg-black/10 rounded-md cursor-pointer p-1">
                  <Image radius="none" removeWrapper alt={`${blog.title} background`} className="w-[20px] h-[20px] object-cover" src={blog.coverImage} />
                  <div className="ml-3">
                    <small>{blog.title}</small>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

const viewMap: { [key: string]: ({ blogs }: { blogs: Blog[] }) => JSX.Element } = {
  gallery: ({ blogs }: { blogs: Blog[] }) => <GalleryView blogs={blogs} />,
  year: ({ blogs }: { blogs: Blog[] }) => <YearView blogs={blogs} />,
};

const View = ({ blogs }: { blogs: Blog[] }) => {
  const [currentView, setCurrentView] = useState<string | number>("gallery");

  const tags = [
    {
      label: "nodejs",
      value: "nodejs",
      icon: "https://file.notion.so/f/f/39736541-4683-4541-a0ce-7c750ba2f5d8/a071cefb-9a2b-4000-b699-953bc9b000fe/favicon.png?id=389ca6e3-cc3c-4ac5-ae72-86c74f2a9aa4&table=block&spaceId=39736541-4683-4541-a0ce-7c750ba2f5d8&expirationTimestamp=1706572800000&signature=ftTs-9psd9vD2l4muk7UbPwPYCBFOfUQYEK5nuq7psQ&downloadName=favicon.png",
    },
    { label: "react", value: "react" },
    { label: "nextjs", value: "nextjs" },
    { label: "typescript", value: "typescript" },
    { label: "javascript", value: "javascript" },
    { label: "tailwindcss", value: "tailwindcss" },
    { label: "css", value: "css" },
    { label: "html", value: "html" },
    { label: "webdev", value: "webdev" },
    { label: "dev", value: "dev" },
    { label: "programming", value: "programming" },
    { label: "software", value: "software" },
    { label: "technology", value: "technology" },
    { label: "web", value: "web" },
    { label: "blog", value: "blog" },
    { label: "tutorial", value: "tutorial" },
    { label: "howto", value: "howto" },
    { label: "guide", value: "guide" },
    { label: "beginner", value: "beginner" },
    { label: "intermediate", value: "intermediate" },
    { label: "advanced", value: "advanced" },
    { label: "tips", value: "tips" },
    { label: "tricks", value: "tricks" },
    { label: "advice", value: "advice" },
    { label: "opinion", value: "opinion" },
    { label: "thoughts", value: "thoughts" },
    { label: "experience", value: "experience" },
    { label: "story", value: "story" },
    { label: "personal", value: "personal" },
    { label: "lifestyle", value: "lifestyle" },
    { label: "travel", value: "travel" },
    { label: "food", value: "food" },
    { label: "health", value: "health" },
    { label: "fitness", value: "fitness" },
    { label: "finance", value: "finance" },
    { label: "money", value: "money" },
    { label: "investing", value: "investing" },
  ];

  return (
    <>
      <div className="flex flex-row items-center justify-between">
        <ViewSwitch onSelectionChange={(viewName) => setCurrentView(viewName)} />

        <TagFilterDropdown options={tags} title="Tags" />
      </div>
      <div className="mt-5">{viewMap[currentView]({ blogs })}</div>
    </>
  );
};

export default View;
