"use client";

import Link from "next/link";
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { usePathname } from "next/navigation";

import { Button } from "@/components/ui/button";
import MyAvatar from "@/components/NavBar/MyAvatar";
import { navItems } from "@/components/NavBar/data";
import clsx from "clsx";

export function MobileSheet() {
  const pathname = usePathname();

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size={"sm"} className="p-0">
          <Menu />
        </Button>
      </SheetTrigger>

      <SheetContent side={"left"}>
        <SheetHeader>
          <MyAvatar />
        </SheetHeader>

        <div className="flex flex-col mt-5">
          {navItems.map((item) => (
            <SheetClose key={item.href} asChild className="py-2 px-3 rounded-sm hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-500 dark:hover:text-gray-400">
              <Link href={item.href} className={clsx({ underline: item.isActiveCheck(pathname) })}>
                <p>{item.name}</p>
              </Link>
            </SheetClose>
          ))}
        </div>
      </SheetContent>
    </Sheet>
  );
}
