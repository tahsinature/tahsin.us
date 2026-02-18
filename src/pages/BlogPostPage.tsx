import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Calendar, Clock } from "lucide-react";
import { blogPosts } from "@/data/posts";
import MDXLayout from "@/components/MDXLayout";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";

// Import all MDX files from per-post folders
const mdxModules = import.meta.glob("../content/*/index.mdx", { eager: true }) as Record<string, { default: React.ComponentType; frontmatter?: Record<string, unknown> }>;

export default function BlogPostPage() {
  const { slug } = useParams<{ slug: string }>();

  // Find matching post data
  const post = blogPosts.find((p) => p.slug === slug);
  useDocumentTitle("Blog");

  // Find matching MDX content
  const mdxKey = Object.keys(mdxModules).find((key) => key.includes(slug || "___none___"));
  const MDXContent = mdxKey ? mdxModules[mdxKey].default : null;

  if (!post) {
    return (
      <div className="max-w-3xl mx-auto px-6 py-20 text-center">
        <h1 className="text-2xl font-bold text-text-primary mb-4">Post not found</h1>
        <p className="text-text-secondary mb-6">The blog post you're looking for doesn't exist yet.</p>
        <Link to="/" className="text-accent-yellow hover:underline inline-flex items-center gap-2">
          <ArrowLeft size={16} />
          Back to home
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-6 py-8">
      {/* Back link */}
      <Link to="/blog" className="text-text-muted hover:text-text-primary transition-colors inline-flex items-center gap-2 text-sm mb-8">
        <ArrowLeft size={14} />
        Back to blog
      </Link>

      {/* Post header */}
      <header className="mb-10">
        <div className="flex items-center gap-4 mb-4">
          <span className="bg-tag-bg text-tag-text px-3 py-1 rounded text-xs font-medium border border-border">{post.category}</span>
        </div>
        <h1 className="text-3xl md:text-4xl font-bold text-text-primary mb-4 leading-tight">{post.title}</h1>
        <p className="text-text-secondary text-lg leading-relaxed mb-4">{post.description}</p>
        <div className="flex items-center gap-6 text-text-muted text-sm">
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
        <hr className="border-border mt-8" />
      </header>

      {/* MDX Content or fallback */}
      {MDXContent ? (
        <MDXLayout>
          <MDXContent />
        </MDXLayout>
      ) : (
        <div className="py-12 text-center">
          <p className="text-text-muted text-sm">
            This post content is coming soon. Add an MDX file at <code className="text-accent-blue">src/content/{slug}/index.mdx</code> to see it here.
          </p>
        </div>
      )}

      {/* Additional Resources */}
      <footer className="mt-16 pt-8 border-t border-border">
        <h3 className="text-lg font-semibold text-text-primary mb-4">Additional resources</h3>
        <p className="text-text-secondary text-sm leading-relaxed mb-6">
          JavaScript is a wonderful-yet-confusing language, and I think it might be quite useful to explore some additional resources on this topic.
        </p>
        <ul className="space-y-2 text-sm">
          <li>
            <a href="https://developer.mozilla.org" target="_blank" rel="noopener noreferrer" className="text-accent-blue hover:text-accent-yellow underline underline-offset-2 transition-colors">
              MDN Web Docs
            </a>
            {" — "}
            <span className="text-text-muted">The go-to reference for web technologies</span>
          </li>
        </ul>

        {/* Date stamp */}
        <div className="mt-8 flex items-center justify-center gap-2 text-text-muted text-xs">
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
    </div>
  );
}
