"use client";

import { useState } from "react";
import Link from "next/link";
import { Card, Image, CardFooter, CardBody } from "@nextui-org/react";
import { CameraIcon } from "lucide-react";

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

const TableView = ({ blogs }: { blogs: Blog[] }) => {
  return (
    <div className="w-full">
      <Card className="dark:bg-default-50 bg-yellow-400">
        <CardBody>
          <p className="dark:text-yellow-400">This view is under development.</p>
        </CardBody>
      </Card>
      <hr className="mt-3 mb-8" />
      <table className="w-full">
        <thead>
          <tr>
            <th className="text-left">Title</th>
            <th className="text-left">Date</th>
          </tr>
        </thead>
        <tbody>
          {blogs.map((blog) => (
            <tr key={blog.id}>
              <td className="text-left">
                <div className="py-2 hover:bg-gray-100 dark:hover:bg-default-100 cursor-pointer">
                  <Link href={`/blogs/${blog.id}`} key={blog.id} className="flex flex-row items-center space-x-2">
                    <p className="text-sm">{blog.title}</p>
                  </Link>
                </div>
              </td>
              <td className="text-left">{blog.lastEdited}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const viewMap: { [key: string]: ({ blogs }: { blogs: Blog[] }) => JSX.Element } = {
  gallery: ({ blogs }: { blogs: Blog[] }) => <GalleryView blogs={blogs} />,
  table: ({ blogs }: { blogs: Blog[] }) => <TableView blogs={blogs} />,
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
