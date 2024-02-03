"use client";

import { useState } from "react";
import Link from "next/link";
import { Card, Image, CardFooter, CardBody } from "@nextui-org/react";

import { Blog } from "@/types";
import ViewSwitch from "@/components/Blog/ViewSwitch";
import DrowpDowns from "@/components/Blog/DrowpDowns";

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

  return (
    <>
      <div className="flex flex-row items-center">
        <ViewSwitch onSelectionChange={(viewName) => setCurrentView(viewName)} />
        <DrowpDowns />
      </div>
      {viewMap[currentView]({ blogs })}
    </>
  );
};

export default View;
