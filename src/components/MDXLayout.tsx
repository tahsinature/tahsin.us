import type { ReactNode } from "react";

interface MDXLayoutProps {
  children: ReactNode;
}

export default function MDXLayout({ children }: MDXLayoutProps) {
  return (
    <article className="w-full min-w-0">
      <div className="mdx-content space-y-6 text-muted-foreground leading-relaxed break-words [&>h1]:text-3xl [&>h1]:font-bold [&>h1]:text-foreground [&>h1]:mb-2 [&>h2]:text-2xl [&>h2]:font-semibold [&>h2]:text-foreground [&>h2]:mt-12 [&>h2]:mb-4 [&>h3]:text-xl [&>h3]:font-semibold [&>h3]:text-foreground [&>h3]:mt-8 [&>h3]:mb-3 [&>p]:text-muted-foreground [&>p]:leading-relaxed [&>p]:text-[0.95rem] [&>ul]:space-y-2 [&>ul]:list-disc [&>ul]:pl-5 [&>ol]:space-y-2 [&>ol]:list-decimal [&>ol]:pl-5 [&>li]:text-muted-foreground [&>blockquote]:border-l-4 [&>blockquote]:border-primary [&>blockquote]:pl-4 [&>blockquote]:italic [&>blockquote]:text-muted-foreground [&>a]:text-accent [&>a]:underline [&>a]:underline-offset-2 [&>a]:hover:text-primary [&>hr]:border-border [&>hr]:my-8 [&_a]:text-accent [&_a]:underline [&_a]:underline-offset-2 hover:[&_a]:text-primary [&>img]:rounded [&>img]:border [&>img]:border-border [&>img]:max-w-full [&_pre]:max-w-full [&_pre]:overflow-x-auto [&_figure]:max-w-full [&_figure]:overflow-x-auto">
        {children}
      </div>
    </article>
  );
}
