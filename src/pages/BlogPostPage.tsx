import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Calendar, Clock, ExternalLink } from "lucide-react";
import { motion, useScroll, useSpring } from "motion/react";
import { blogPosts } from "@/data/posts";
import MDXLayout from "@/components/MDXLayout";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";
import { FadeIn, BlurFadeIn } from "@/components/MotionWrapper";
import PlatformIcon from "@/components/PlatformIcon";
import { platforms } from "@/config/platforms";
import { PAGE_PADDING } from "@/config/layout";

// Import all MDX files from per-post folders
const mdxModules = import.meta.glob("../content/*/index.mdx", { eager: true }) as Record<string, { default: React.ComponentType; frontmatter?: Record<string, unknown> }>;

export default function BlogPostPage() {
  const { slug } = useParams<{ slug: string }>();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  // Find matching post data
  const post = blogPosts.find((p) => p.slug === slug);
  useDocumentTitle("Blog");

  // Find matching MDX content
  const mdxKey = Object.keys(mdxModules).find((key) => key.includes(slug || "___none___"));
  const MDXContent = mdxKey ? mdxModules[mdxKey].default : null;

  if (!post) {
    return (
      <div className="max-w-3xl mx-auto px-6 py-20 text-center">
        <h1 className="text-2xl font-bold text-foreground mb-4">Post not found</h1>
        <p className="text-muted-foreground mb-6">The blog post you're looking for doesn't exist yet.</p>
        <Link to="/" className="text-primary hover:underline inline-flex items-center gap-2">
          <ArrowLeft size={16} />
          Back to home
        </Link>
      </div>
    );
  }

  return (
    <>
    {/* Reading progress bar */}
    <motion.div
      className="fixed top-16 left-0 right-0 h-[2px] bg-primary z-40 origin-left"
      style={{ scaleX }}
    />
    <div className={`max-w-3xl mx-auto ${PAGE_PADDING} w-full min-w-0`}>
      {/* Back link */}
      <FadeIn>
        <Link to="/blog" className="text-muted-foreground hover:text-foreground transition-colors inline-flex items-center gap-2 text-sm mb-8">
          <ArrowLeft size={14} />
          Back to blog
        </Link>
      </FadeIn>

      {/* Post header */}
      <header className="mb-10">
        <BlurFadeIn>
          <div className="flex items-center gap-4 mb-4">
            <span className="bg-secondary text-secondary-foreground px-3 py-1 rounded text-xs font-medium border border-border">{post.category}</span>
          </div>
        </BlurFadeIn>
        <BlurFadeIn delay={0.1}>
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4 leading-tight">{post.title}</h1>
        </BlurFadeIn>
        <BlurFadeIn delay={0.15}>
          <p className="text-muted-foreground text-lg leading-relaxed mb-4">{post.description}</p>
        </BlurFadeIn>
        <BlurFadeIn delay={0.2}>
          <div className="flex items-center gap-6 text-muted-foreground text-sm">
            <span className="flex items-center gap-1.5">
              <Calendar size={14} />
              {new Date(post.date).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock size={14} />
              12 min read
            </span>
          </div>
        </BlurFadeIn>
        <FadeIn delay={0.25}>
          <hr className="border-border mt-8" />
        </FadeIn>
      </header>

      {/* MDX Content or fallback */}
      <FadeIn delay={0.3}>
        {MDXContent ? (
          <MDXLayout>
            <MDXContent />
          </MDXLayout>
        ) : (
          <div className="py-12 text-center">
            <p className="text-muted-foreground text-sm">
              This post content is coming soon. Add an MDX file at <code className="text-accent">src/content/{slug}/index.mdx</code> to see it here.
            </p>
          </div>
        )}
      </FadeIn>

      {/* Additional Resources */}
      <FadeIn>
        <footer className="mt-16 pt-8 border-t border-border">
          {post.resources && (
            <>
              <h3 className="text-lg font-semibold text-foreground mb-4">Additional resources</h3>
              {post.resources.note && (
                <p className="text-muted-foreground text-sm leading-relaxed mb-6">{post.resources.note}</p>
              )}
              <ul className="space-y-2 text-sm">
                {post.resources.links.map((resource) => (
                  <li key={resource.url}>
                    <a href={resource.url} target="_blank" rel="noopener noreferrer" className="text-accent hover:text-primary underline underline-offset-2 transition-colors">
                      {resource.label}
                    </a>
                    {resource.description && (
                      <>
                        {" — "}
                        <span className="text-muted-foreground">{resource.description}</span>
                      </>
                    )}
                  </li>
                ))}
              </ul>
            </>
          )}

          {/* Published on other platforms */}
          {post.publishedOn && post.publishedOn.length > 0 && (
            <div className={`${post.resources ? "mt-8" : ""} pt-6 ${post.resources ? "border-t border-border/50" : ""}`}>
              <p className="text-muted-foreground text-xs uppercase tracking-widest font-medium mb-3">Also published on</p>
              <div className="flex flex-wrap gap-2">
                {post.publishedOn.map((item) => (
                  <a
                    key={item.url}
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-secondary text-secondary-foreground hover:text-primary hover:border-primary/40 px-3 py-1.5 rounded text-xs font-medium border border-border transition-colors"
                  >
                    <PlatformIcon platform={item.platform} />
                    {platforms[item.platform].name}
                    <ExternalLink size={10} />
                  </a>
                ))}
              </div>
            </div>
          )}

          {/* Date stamp */}
          <div className={`${post.resources || post.publishedOn ? "mt-8" : ""} flex items-center justify-center gap-2 text-muted-foreground text-xs`}>
            <span>
              Last updated:{" "}
              {new Date(post.date).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </span>
          </div>
        </footer>
      </FadeIn>
    </div>
    </>
  );
}
