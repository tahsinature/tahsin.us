"use client";

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LayoutGrid, CalendarSearch } from "lucide-react";

export default function ViewSwitch({ onSelectionChange }: { onSelectionChange: (viewName: string | number) => void }) {
  return (
    <Tabs defaultValue="gallery" className="w-[400px]" onValueChange={onSelectionChange}>
      <TabsList className="grid w-[100px] grid-cols-2">
        <TabsTrigger value="gallery">
          <LayoutGrid size={20} />
        </TabsTrigger>
        <TabsTrigger value="year">
          <CalendarSearch size={20} />
        </TabsTrigger>
      </TabsList>
    </Tabs>
  );
}
