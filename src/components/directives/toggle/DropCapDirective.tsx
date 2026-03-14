import type { DirectiveProps } from "../types";
import { resolveAccent } from "../utils";

export default function DropCapDirective({ props }: { props: DirectiveProps }) {
  const { body, accent } = props;
  const color = resolveAccent(accent as string | undefined);

  if (!body) return null;

  const text = body as string;
  const firstLetter = text[0];
  const rest = text.slice(1);

  return (
    <p className="text-foreground/90 leading-relaxed text-base my-6">
      <span
        className="float-left font-serif font-bold leading-[0.8] mr-3 mt-1"
        style={{ fontSize: "4.5rem", color }}
      >
        {firstLetter}
      </span>
      {rest}
    </p>
  );
}
