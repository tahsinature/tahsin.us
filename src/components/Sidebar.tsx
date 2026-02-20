import { Link } from "react-router-dom";
import { ArrowRight, Mail, BookOpen, Tag } from "lucide-react";
import { categories, blogPosts } from "@/data/posts";
import { siteConfig } from "@/config/site";

interface SidebarProps {
  activeCategory?: string | null;
  onCategoryClick?: (cat: string) => void;
}

export default function Sidebar({ activeCategory, onCategoryClick }: SidebarProps) {
  return (
    <aside className="space-y-8">
      {/* Categories — interactive filter when on blog page */}
      {onCategoryClick && (
        <div className="bg-bg-card border border-border rounded-md p-5">
          <h3 className="flex items-center gap-2 text-accent-blue uppercase tracking-widest text-xs font-bold mb-4">
            <Tag size={13} />
            Categories
          </h3>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => onCategoryClick("__all__")}
              className={`px-2.5 py-1 rounded-sm text-xs font-medium border transition-all ${
                activeCategory === null
                  ? "bg-accent-yellow/15 border-accent-yellow/40 text-accent-yellow"
                  : "bg-tag-bg border-border text-tag-text hover:text-text-primary hover:border-accent-yellow/30"
              }`}
            >
              All
            </button>
            {categories.map((cat) => {
              const count = blogPosts.filter((p) => p.category === cat).length;
              return count > 0 ? (
                <button
                  key={cat}
                  onClick={() => onCategoryClick(cat)}
                  className={`px-2.5 py-1 rounded-sm text-xs font-medium border transition-all ${
                    activeCategory === cat
                      ? "bg-accent-yellow/15 border-accent-yellow/40 text-accent-yellow"
                      : "bg-tag-bg border-border text-tag-text hover:text-text-primary hover:border-accent-yellow/30"
                  }`}
                >
                  {cat}
                  <span className="ml-1 text-text-muted">{count}</span>
                </button>
              ) : null;
            })}
          </div>
        </div>
      )}

      {/* Categories — static links when not on blog page */}
      {!onCategoryClick && (
        <div className="bg-bg-card border border-border rounded-md p-5">
          <h3 className="flex items-center gap-2 text-accent-blue uppercase tracking-widest text-xs font-bold mb-4">
            <Tag size={13} />
            Categories
          </h3>
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => {
              const count = blogPosts.filter((p) => p.category === cat).length;
              return count > 0 ? (
                <Link key={cat} to="/blog" className="bg-tag-bg text-tag-text hover:text-text-primary hover:border-accent-yellow/40 px-2.5 py-1 rounded-sm text-xs border border-border transition-all">
                  {cat}
                  <span className="ml-1 text-text-muted">{count}</span>
                </Link>
              ) : null;
            })}
          </div>
        </div>
      )}

      {/* Popular Content */}
      <div className="bg-bg-card border border-border rounded-md p-5">
        <h3 className="flex items-center gap-2 text-accent-pink uppercase tracking-widest text-xs font-bold mb-4">
          <BookOpen size={13} />
          Popular Content
        </h3>
        <ul className="space-y-3">
          {blogPosts
            .filter((p) => p.popular)
            .map((post) => (
              <li key={post.slug}>
                <Link to={`/post/${post.slug}`} className="text-text-secondary hover:text-text-primary transition-colors text-sm flex items-start gap-2 group">
                  <ArrowRight size={14} className="mt-1 text-text-muted group-hover:text-accent-pink transition-colors flex-shrink-0" />
                  <span>{post.title}</span>
                </Link>
              </li>
            ))}
        </ul>
      </div>

      {/* Newsletter CTA */}
      {siteConfig.enableNewsletter && (
        <div className="bg-gradient-to-br from-bg-card to-bg-secondary border border-border rounded-md p-5">
          <h3 className="flex items-center gap-2 text-accent-yellow uppercase tracking-widest text-xs font-bold mb-3">
            <Mail size={13} />
            Newsletter
          </h3>
          <p className="text-text-secondary text-sm leading-relaxed mb-4">Get notified when I publish new articles. No spam, unsubscribe anytime.</p>
          <div className="flex gap-2">
            <input
              type="email"
              placeholder="you@example.com"
              className="flex-1 bg-bg-primary border border-border rounded px-3 py-2 text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:border-accent-yellow/50 transition-colors"
            />
            <button className="bg-accent-yellow text-bg-primary px-3 py-2 rounded text-sm font-semibold hover:brightness-110 transition-all whitespace-nowrap">Subscribe</button>
          </div>
        </div>
      )}
    </aside>
  );
}
