import { Metadata } from "next";
import services from "@/services";
import View from "@/components/Blog/View";

export const metadata: Metadata = {
  title: "Blogs | tahsin.us",
  description: "All blogs from Tahsin",
};

export default async function Page() {
  const blogs = await services.blog.getArticles();

  return (
    <div className="container pb-5">
      <View blogs={blogs} />
    </div>
  );
}

export const dynamic = "force-dynamic";
