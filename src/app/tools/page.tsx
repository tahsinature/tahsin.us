import React from "react";
import { wait } from "@/lib/dummy";

const Page = async () => {
  await wait(3);

  return (
    <div>
      <h1>Tools</h1>
    </div>
  );
};

export default Page;
