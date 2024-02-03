import { Metadata } from "next";
import Link from "next/link";

import { Card, Image, CardFooter } from "@nextui-org/react";

import services from "@/services";
import ViewSwitch from "@/components/Blog/ViewSwitch";
import DrowpDowns from "@/components/Blog/Drowpdowns";

export const metadata: Metadata = {
  title: "Blogs | tahsin.us",
  description: "All blogs from Tahsin",
};

export default async function Page() {
  const blogs = await services.blog.getAllArticles();
  return (
    <div className="container">
      <div className="flex flex-row items-center">
        <ViewSwitch />
        <DrowpDowns />
      </div>

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

                {/* <Link href={blog.link} target="_blank">
                <Button radius="full" size="sm" className="dark:hover:bg-white/20 hover:bg-white/70">
                  Read
                </Button>
              </Link> */}
              </CardFooter>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
