"use client";

import React from "react";
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Input, Button, DropdownTrigger, Dropdown, DropdownMenu, DropdownItem, Chip, User, Pagination, Selection, ChipProps, SortDescriptor } from "@nextui-org/react";
import { ChevronDown } from "lucide-react";
import { Tag } from "@/types";
import { getDummyTags } from "@/lib/dummy";

const tags: Tag[] = Array.from({ length: 10 }, (_, i) => getDummyTags({}));

const columns = [
  { name: "ID", uid: "id", sortable: true },
  { name: "NAME", uid: "name", sortable: true },
  { name: "AGE", uid: "age", sortable: true },
  { name: "ROLE", uid: "role", sortable: true },
  { name: "TEAM", uid: "team" },
  { name: "EMAIL", uid: "email" },
  { name: "STATUS", uid: "status", sortable: true },
  { name: "ACTIONS", uid: "actions" },
];

const statusOptions = [
  { name: "Active", uid: "active" },
  { name: "Paused", uid: "paused" },
  { name: "Vacation", uid: "vacation" },
];

function capitalize(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

const DrowpDowns = () => {
  return (
    <div className="flex justify-between gap-3 items-center my-5">
      <div className="flex gap-3">
        <Dropdown>
          <DropdownTrigger className="flex">
            <Button endContent={<ChevronDown className="text-small" />} variant="flat">
              Year
            </Button>
          </DropdownTrigger>
          <DropdownMenu disallowEmptySelection aria-label="Table Columns" closeOnSelect={false} selectedKeys={"all"} selectionMode="multiple" onSelectionChange={() => console.log("onSelectionChange")}>
            {statusOptions.map((status) => (
              <DropdownItem key={status.uid} className="capitalize">
                {capitalize(status.name)}
              </DropdownItem>
            ))}
          </DropdownMenu>
        </Dropdown>
        <Dropdown>
          <DropdownTrigger className="flex">
            <Button endContent={<ChevronDown className="text-small" />} variant="flat">
              Tags
            </Button>
          </DropdownTrigger>
          <DropdownMenu disallowEmptySelection aria-label="Table Columns" closeOnSelect={false} selectedKeys={new Set(["name", "role", "status", "actions"])} selectionMode="multiple" onSelectionChange={() => console.log("tag selected")}>
            {tags.map((tag) => (
              <DropdownItem key={tag.id} className="capitalize">
                {tag.name}
              </DropdownItem>
            ))}
          </DropdownMenu>
        </Dropdown>
      </div>
    </div>
  );
};

export default DrowpDowns;
