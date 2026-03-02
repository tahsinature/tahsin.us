import { cn } from "@/lib/utils";
import { FadeInWhenVisible } from "./FadeInWhenVisible";

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  className?: string;
  align?: "left" | "center";
}

export function SectionHeading({
  title,
  subtitle,
  className,
  align = "center",
}: SectionHeadingProps) {
  return (
    <FadeInWhenVisible>
      <div
        className={cn(
          "mb-12 md:mb-16",
          align === "center" && "text-center",
          className,
        )}
      >
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
          {title}
        </h2>
        {subtitle && (
          <p className="mt-4 max-w-2xl text-lg text-muted-foreground mx-auto">
            {subtitle}
          </p>
        )}
      </div>
    </FadeInWhenVisible>
  );
}
