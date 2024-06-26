"use client";

import * as React from "react";
import { CommandDialog, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import fonts from "@/lib/fonts";
import clsx from "clsx";

export default function CommandMenu() {
  const [open, setOpen] = React.useState(false);
  const router = useRouter();

  const dict = {
    GOTO_HOME: () => router.push("/"),
    GOTO_WORKS: () => router.push("/works"),
    GOTO_BLOGS: () => router.push("/blogs"),
    GOTO_TOOLS: () => router.push("/tools"),
    GOTO_OPENSOURCE: () => router.push("/open-source"),
    GOTO_GALLERY: () => router.push("/photographs"),
  };

  const handleSelect = (commandFn: (typeof dict)[keyof typeof dict]) => () => {
    setOpen(false);
    return commandFn();
  };

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  return (
    <>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput className={fonts.calculatorFont.className} placeholder="Type a command or search..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup className={fonts.calculatorFont.className}>
            <CommandItem onSelect={handleSelect(dict.GOTO_HOME)}>Home</CommandItem>
            <CommandItem onSelect={handleSelect(dict.GOTO_WORKS)}>Works</CommandItem>
            <CommandItem onSelect={handleSelect(dict.GOTO_BLOGS)}>Blogs</CommandItem>
            <CommandItem onSelect={handleSelect(dict.GOTO_BLOGS)}>Tools</CommandItem>
            <CommandItem onSelect={handleSelect(dict.GOTO_OPENSOURCE)}>Open Source</CommandItem>
            <CommandItem onSelect={handleSelect(dict.GOTO_GALLERY)}>Photographs</CommandItem>
          </CommandGroup>
        </CommandList>
      </CommandDialog>

      <Button
        onClick={() => setOpen((open) => !open)}
        className={clsx(
          "inline-flex items-center whitespace-nowrap transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border border-input hover:bg-accent hover:text-accent-foreground px-4 py-2 relative h-8 w-full justify-start rounded-[0.5rem] bg-background text-sm font-normal text-muted-foreground shadow-none sm:pr-12 md:w-40 lg:w-64"
        )}
      >
        <span className="hidden lg:inline-flex">Search...</span>
        <span className="inline-flex lg:hidden">Search...</span>
        <kbd className="pointer-events-none absolute right-[0.3rem] top-[0.3rem] hidden h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 sm:flex">
          <span className="text-xs">⌘</span>K
        </kbd>
      </Button>
    </>
  );
}
