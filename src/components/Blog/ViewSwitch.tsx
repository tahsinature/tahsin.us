"use client";

import { Tabs, Tab } from "@nextui-org/react";
import { GalleryVertical, Table } from "lucide-react";

const ViewSwitch = () => {
  return (
    <div className="flex w-full flex-col">
      <Tabs aria-label="Options" color="primary" variant="bordered">
        <Tab
          key="photos"
          title={
            <div className="flex items-center space-x-2">
              <GalleryVertical />
            </div>
          }
        />
        <Tab
          key="music"
          title={
            <div className="flex items-center space-x-2">
              <Table />
            </div>
          }
        />
      </Tabs>
    </div>
  );
};

export default ViewSwitch;
