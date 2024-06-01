import Comment from "@/app/guestbook/Comment";
import GuestBookAttend from "@/app/guestbook/GuestBookAttend";
import MyComments from "@/app/guestbook/MyComments";
import services from "@/services";
import PaginationComponent from "@/app/guestbook/Pagination";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";

// const paginationData = {
//   currentPage: 1,
//   totalPages: 3,
//   totalItems: 24,
// };

const GuestBook = async () => {
  const data = await services.guestBook.getComments();

  return (
    <div>
      <div className="">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100">Guest Book</h1>
        <p className="text-gray-600 dark:text-gray-300">Welcome to my guest book. Feel free to leave a message.</p>
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          <GuestBookAttend />
          <MyComments />
          {data.map((item) => (
            <Comment key={item.id} item={item} />
          ))}
        </div>
      </div>

      {/* <PaginationComponent pagination={paginationData} /> */}
    </div>
  );
};

export default GuestBook;

export const dynamic = "force-dynamic";
