import { Button } from "@/components/ui/button";
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import MyAvatar from "@/components/NavBar/MyAvatar";

export function MobileSheet() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <MyAvatar />
      </SheetTrigger>

      <SheetContent side={"left"}>
        <SheetHeader>
          <SheetTitle>Edit profile</SheetTitle>
          <SheetDescription>Make changes to your profile here. Click save when done.</SheetDescription>
          <p>Sheet Header</p>
        </SheetHeader>

        <hr className="mt-5" />

        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <p>Sheet Body</p>
          </div>
        </div>

        <SheetFooter>
          <SheetClose asChild>
            <p>Sheet Footer</p>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
