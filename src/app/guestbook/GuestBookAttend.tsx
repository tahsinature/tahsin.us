"use client";

import { Loader2, HardDriveUpload, FilePlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Drawer, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger } from "@/components/ui/drawer";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { useAtom } from "jotai";
import { currentUserCommentsAtom } from "@/atoms";
import calls from "@/lib/calls";
import { useToast } from "@/components/ui/use-toast";

type InputState = "DRAFT" | "SAVING";

function GuestBookAttend() {
  const [inputState, setInputState] = useState<InputState>("DRAFT");
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [name, setName] = useState("");
  const [_, setComments] = useAtom(currentUserCommentsAtom);
  const { toast } = useToast();

  const handleSave = () => {
    let toastMessage = "Comment added";

    setInputState("SAVING");

    calls
      .saveComment(name, message)
      .then(async ({ data, error }) => {
        if (error) {
          toastMessage = "Error adding comment";
          toast({ variant: "destructive", title: toastMessage, description: error, duration: 15000 });
        } else {
          setComments((prev) => [data.record, ...prev]);
          toast({ variant: "default", title: toastMessage, description: data.reply, duration: 15000 });
          setMessage("");
        }
      })
      .finally(() => {
        setOpen(false);
        setInputState("DRAFT");
      });
  };

  const isValid = name.length > 0 && message.length > 0;

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <div className="border rounded-md p-4 py-8 flex justify-center items-center hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer hover:text-opacity-45 transition-all">
          <FilePlus />
        </div>
      </DrawerTrigger>
      <DrawerContent>
        <div className="mx-auto w-full max-w-sm">
          <DrawerHeader>
            <DrawerTitle>Attent Guestbook</DrawerTitle>
            <DrawerDescription>Write a message to the host</DrawerDescription>
          </DrawerHeader>
          <div className="p-4 pb-0">
            <Input placeholder="Your name" value={name} onChange={(e) => setName(e.target.value)} />
          </div>
          <div className="p-4 pb-0">
            <Textarea placeholder="Type your message here." className="resize-none" value={message} onChange={(e) => setMessage(e.target.value)} />
          </div>
          <DrawerFooter>
            <Button className="text-blue-100 dark:text-blue-900" onClick={handleSave} disabled={inputState === "SAVING" || !isValid}>
              {inputState === "DRAFT" && (
                <>
                  <HardDriveUpload className="mr-2 h-4 w-4" /> Post
                </>
              )}
              {inputState === "SAVING" && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            </Button>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
}

export default GuestBookAttend;
