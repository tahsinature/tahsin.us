"use client";

import Link from "next/link";
import { Sheet, SheetClose, SheetContent, SheetHeader, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { usePathname } from "next/navigation";

import { Button } from "@/components/ui/button";
import MyAvatar from "@/components/NavBar/MyAvatar";
import { navItems } from "@/components/NavBar/data";
import clsx from "clsx";
import SignatureSVG from "@/components/SVGs/SignatureSVG";
import fonts from "@/lib/fonts";

function MobileSheet() {
  const pathname = usePathname();

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size={"sm"} className="p-0">
          <Menu />
        </Button>
      </SheetTrigger>

      <SheetContent side={"left"} className="flex flex-col">
        <SheetHeader>
          <MyAvatar />
        </SheetHeader>

        <div className={clsx("flex flex-col mt-5 h-full", fonts.calculatorFont.className)}>
          {navItems.map((item) => (
            <SheetClose key={item.href} asChild className="py-2 px-3 rounded-sm hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-500 dark:hover:text-gray-400">
              <Link href={item.href} className={clsx({ underline: item.isActiveCheck(pathname) })}>
                <p>{item.name}</p>
              </Link>
            </SheetClose>
          ))}
        </div>

        {/* ========== Mobile Side Bar Footer Start========= */}
        <div>
          <h3>Tahsin</h3>
          <div className="mb-4">
            <small>
              Software Engineer at{" "}
              <a href="https://www.carfax.com" target="_blank" rel="noreferrer">
                CARFAX
              </a>
            </small>
            <SignatureSVG className="mt-5" />
          </div>

          <div className="mt-2 text-gray-600">
            <small>All rights reserved © Tahsin {new Date().getFullYear()}</small>
          </div>
        </div>
        {/* ========== Mobile Side Bar Footer End ========= */}
      </SheetContent>
    </Sheet>
  );
}

export default MobileSheet;
