import type { DirectiveProps, DirectiveError } from "./types";
import CardDirective from "./toggle/CardDirective";
import ImageGridDirective from "./toggle/ImageGridDirective";
import HeroCardDirective from "./toggle/HeroCardDirective";
import RetroDiskDirective from "./audio/RetroDiskDirective";
import DirectiveErrorDisplay, { DirectiveWarnings } from "./DirectiveError";


const directives: Record<string, React.ComponentType<{ props: DirectiveProps }>> = {
  card: CardDirective,
  "image-grid": ImageGridDirective,
  "hero-card": HeroCardDirective,
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
