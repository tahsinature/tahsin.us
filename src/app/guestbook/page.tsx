import Input from "@/app/guestbook/Input";
import PaginationComponent from "@/app/guestbook/Pagination";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";

const data = [
  { name: "John", message: "Hello, I'm from Tunisia! Your personal website is awesome. Love it.", date: "2022-01-01", id: 1 },
  { name: "Jane", message: "Hey, it's awesome.", date: "2018-01-02", id: 2 },
  { name: "Doe", message: "cool site", date: "2021-01-03", id: 3 },
  { name: "Mary", message: "I love your website", date: "2021-01-04", id: 4 },
  { name: "Alice", message: "Your website is very informative!", date: "2022-02-10", id: 5 },
  { name: "Bob", message: "Great design on your site.", date: "2021-03-11", id: 6 },
  { name: "Charlie", message: "Amazing content!", date: "2023-04-12", id: 7 },
  { name: "Diana", message: "I learned so much from your blog.", date: "2021-05-13", id: 8 },
  { name: "Eve", message: "Your articles are really helpful.", date: "2020-06-14", id: 9 },
  { name: "Frank", message: "Keep up the great work!", date: "2019-07-15", id: 10 },
  { name: "Grace", message: "Your site is fantastic!", date: "2021-08-16", id: 11 },
  { name: "Hank", message: "Very user-friendly site.", date: "2023-09-17", id: 12 },
  { name: "Ivy", message: "I visit your website every day.", date: "2022-10-18", id: 13 },
  { name: "Jack", message: "The information on your site is top-notch.", date: "2021-11-19", id: 14 },
  { name: "Kate", message: "I love the layout of your website.", date: "2023-12-20", id: 15 },
  { name: "Leo", message: "Your site is a great resource.", date: "2020-01-21", id: 16 },
  { name: "Mia", message: "I found your website very useful.", date: "2021-02-22", id: 17 },
  { name: "Nina", message: "Thanks for the valuable information.", date: "2023-03-23", id: 18 },
  { name: "Oscar", message: "Your site is a game changer.", date: "2022-04-24", id: 19 },
  { name: "Paul", message: "I appreciate the effort you put into your site.", date: "2021-05-25", id: 20 },
  { name: "Quincy", message: "Your website is my go-to for info.", date: "2023-06-26", id: 21 },
  { name: "Rachel", message: "I'm a big fan of your site.", date: "2020-07-27", id: 22 },
  { name: "Sam", message: "Great job on your website.", date: "2021-08-28", id: 23 },
  { name: "Tina", message: "Your website is very engaging.", date: "2022-09-29", id: 24 },
];

const paginationData = {
  currentPage: 1,
  totalPages: 3,
  totalItems: 24,
};

// create a nice looking guestbook page using tailwind css. i have light and dark mode
// each line is like a comment with the name, message and date
const GuestBook = () => {
  return (
    <div>
      <div className="container mx-auto px-4 pt-8">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100">Guest Book</h1>
        <p className="text-gray-600 dark:text-gray-300">Welcome to my guest book. Feel free to leave a message.</p>
        <Input />
        <div className="mt-8">
          {data.map((item) => (
            <div key={item.id} className="border rounded-md p-4 mb-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <p className="text font-semibold text-gray-800 dark:text-gray-100">{item.name}</p>
                  <Badge variant="secondary" className=" ml-3 text-gray-600 dark:text-gray-300">
                    {item.date}
                  </Badge>
                </div>
              </div>
              <p className="mt-2 text-gray-700 dark:text-gray-200">{item.message}</p>
            </div>
          ))}
        </div>
      </div>

      {/* <PaginationComponent pagination={paginationData} /> */}
    </div>
  );
};

export default GuestBook;
