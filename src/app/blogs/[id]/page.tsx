import { Card, CardFooter, Image, CardHeader, CardBody } from "@nextui-org/react";
import moment from "moment";
import { CalendarSearch } from "lucide-react";

import services from "@/services";
import Tags from "@/components/Blog/Tags";
import BreadCrumb from "@/components/Blog/BreadCrumb";
import PlatformAvatar from "@/components/Blog/PlatformAvatar";

const Blog = async ({ params }: { params: { id: string } }) => {
  const articleData = await services.blog.getArticle(params.id);

  return (
    <>
      <div className="container">
        <div className="my-5">
          <BreadCrumb blog={articleData} />
        </div>

        <Card className="lg:w-[50%] md:w-[70%] w-full m-auto mt-[5rem] p-[1rem]">
          <CardHeader className="justify-between">
            <div className="flex gap-5">
              <div className="flex flex-col gap-1 items-start justify-center">
                <h4 className="font-semibold leading-none">{articleData.title}</h4>
                <div className="flex text-default-400 items-center text-[15px]">
                  <div className="h-full flex items-center">
                    <CalendarSearch size={14} />
                  </div>
                  <p className="ml-1 text-xs">{moment(articleData.created).fromNow()}</p>
                </div>
                <Tags tags={articleData.tags} />
              </div>
            </div>
          </CardHeader>
          <CardBody className="px-3 py-0">
            <p className="text-justify">{articleData.description}</p>
          </CardBody>
          <CardFooter className="gap-3 flex flex-col z-0">
            <Image alt={`${articleData.title} image`} className="my-5 object-cover z-10" src={articleData.coverImage} />
            <PlatformAvatar urls={articleData.links} />
          </CardFooter>
        </Card>
      </div>
    </>
  );
};

export default Blog;
