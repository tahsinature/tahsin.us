import { useAppStore } from "@/stores/useAppStore";

export function MobileNavTrigger() {
  const setOpen = useAppStore((s) => s.setMobileNavOpen);

  return (
    <button
      onClick={() => setOpen(true)}
      className="md:hidden relative h-9 w-9 rounded-xl border border-border/30 flex items-center justify-center hover:bg-muted/50 transition-colors"
      aria-label="Open menu"
    >
      <div className="flex flex-col gap-[5px]">
        <span className="block h-[1.5px] w-[18px] rounded-full bg-foreground" />
        <span className="block h-[1.5px] w-[13px] rounded-full bg-foreground ml-auto" />
      </div>
    </button>
  );
}
