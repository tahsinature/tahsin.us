import { Badge } from "@/components/ui/badge";
import { GuestBookComment } from "@/types";
import moment from "moment";

type CommentProps = {
  item: GuestBookComment;
};

const Comment = (props: CommentProps) => {
  return (
    <div key={props.item.id} className="border rounded-md p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <p className="text font-semibold text-gray-800 dark:text-gray-100">{props.item.name}</p>
          <Badge variant="secondary" className=" ml-3 text-gray-600 dark:text-gray-300">
            {moment(props.item.date).fromNow()}
          </Badge>
        </div>
      </div>
      <p className="mt-2 text-gray-700 dark:text-gray-200 text-sm">{props.item.message}</p>
    </div>
  );
};

export default Comment;
