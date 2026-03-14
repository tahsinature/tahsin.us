import type { DirectiveProps, DirectiveError } from "./types";
import CardDirective from "./toggle/CardDirective";
import ImageDirective from "./toggle/ImageDirective";
import ImageGridDirective from "./toggle/ImageGridDirective";
import HeroCardDirective from "./toggle/HeroCardDirective";
import QuoteDirective from "./toggle/QuoteDirective";
import HeadingDirective from "./toggle/HeadingDirective";
import CheckboxDirective from "./toggle/CheckboxDirective";
import ListDirective from "./toggle/ListDirective";
import DropCapDirective from "./toggle/DropCapDirective";
import RetroDiskDirective from "./toggle/RetroDiskDirective";
import DirectiveErrorDisplay, { DirectiveWarnings } from "./DirectiveError";


const directives: Record<string, React.ComponentType<{ props: DirectiveProps }>> = {
  card: CardDirective,
  image: ImageDirective,
  "image-grid": ImageGridDirective,
  "hero-card": HeroCardDirective,
  quote: QuoteDirective,
  heading: HeadingDirective,
  checkbox: CheckboxDirective,
  list: ListDirective,
  "drop-cap": DropCapDirective,
  "retro-disk": RetroDiskDirective,
};

export function RenderDirective({ type, props, warnings }: { type: string; props: DirectiveProps; warnings?: string[] }) {
  const Component = directives[type];
  if (!Component) {
    return <DirectiveErrorDisplay message={`Unknown directive "@type: ${type}"`} />;
  }
  return (
    <>
      {warnings && <DirectiveWarnings warnings={warnings} />}
      <Component props={props} />
    </>
  );
}

export function RenderDirectiveError({ error }: { error: DirectiveError }) {
  return <DirectiveErrorDisplay message={error.message} />;
}
