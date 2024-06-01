"use client";

import Comment from "@/app/guestbook/Comment";
import { currentUserCommentsAtom } from "@/atoms";
import { useAtom } from "jotai";

const MyComments = () => {
  const [comments] = useAtom(currentUserCommentsAtom);

  return (
    <>
      {comments.map((comment) => (
        <Comment key={comment.id} item={comment} />
      ))}
    </>
  );
};

export default MyComments;
