"use client";

import { Tabs, Tab } from "@nextui-org/react";
import { GalleryVertical, Table } from "lucide-react";

const ViewSwitch = ({ onSelectionChange }: { onSelectionChange: (viewName: string | number) => void }) => {
  return (
    <div className="flex w-full flex-col">
      <Tabs aria-label="Options" color="primary" variant="bordered" onSelectionChange={onSelectionChange}>
        <Tab
          key="gallery"
          title={
            <div className="flex items-center space-x-2">
              <GalleryVertical />
            </div>
          }
        />
        <Tab
          key="table"
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
