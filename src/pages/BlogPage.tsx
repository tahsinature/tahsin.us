import { useState } from "react";
import { ChevronDown } from "lucide-react";
import BlogCard from "@/components/BlogCard";
import Sidebar from "@/components/Sidebar";
import { blogPosts, categories } from "@/data/posts";

export default function BlogPage() {
  const [visibleCount, setVisibleCount] = useState(8);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const filteredPosts = activeCategory ? blogPosts.filter((p) => p.category === activeCategory) : blogPosts;

  const showMore = () => {
    setVisibleCount((prev) => Math.min(prev + 5, filteredPosts.length));
  };

  const handleCategoryClick = (cat: string) => {
    if (cat === "__all__" || activeCategory === cat) {
      setActiveCategory(null);
    } else {
      setActiveCategory(cat);
    }
    setVisibleCount(8);
  };

  return (
    <main className="max-w-7xl mx-auto px-6 py-12">
      {/* Page Header */}
      <div className="mb-10">
        <h1 className="text-3xl font-bold text-text-primary mb-2">Blog</h1>
        <p className="text-text-secondary max-w-2xl leading-relaxed">Articles and tutorials on CSS, JavaScript, React, animation, and more.</p>
      </div>

      {/* Category Filter — visible only on small screens where sidebar is hidden */}
      <div className="flex flex-wrap gap-2 mb-8 lg:hidden">
        <button
          onClick={() => {
            setActiveCategory(null);
            setVisibleCount(8);
          }}
          className={`px-3 py-1.5 rounded text-xs font-medium border transition-all ${
            activeCategory === null ? "bg-accent-yellow/15 border-accent-yellow/40 text-accent-yellow" : "bg-tag-bg border-border text-tag-text hover:text-text-primary hover:border-accent-yellow/30"
          }`}
        >
          All
        </button>
        {categories.map((cat) => {
          const count = blogPosts.filter((p) => p.category === cat).length;
          return (
            <button
              key={cat}
              onClick={() => handleCategoryClick(cat)}
              className={`px-3 py-1.5 rounded text-xs font-medium border transition-all ${
                activeCategory === cat
                  ? "bg-accent-yellow/15 border-accent-yellow/40 text-accent-yellow"
                  : "bg-tag-bg border-border text-tag-text hover:text-text-primary hover:border-accent-yellow/30"
              }`}
            >
              {cat}
              <span className="ml-1.5 text-text-muted">{count}</span>
            </button>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-12">
        {/* Blog Posts */}
        <div>
          <h2 className="text-accent-yellow uppercase tracking-[0.2em] text-xs font-bold mb-6">
            {activeCategory ? activeCategory : "All Articles"}{" "}
            <span className="text-text-muted font-normal normal-case tracking-normal">
              — {filteredPosts.length} post{filteredPosts.length !== 1 ? "s" : ""}
            </span>
          </h2>

          {filteredPosts.length === 0 ? (
            <p className="text-text-muted py-12 text-center text-sm">No posts in this category yet.</p>
          ) : (
            filteredPosts.slice(0, visibleCount).map((post) => <BlogCard key={post.slug} post={post} />)
          )}

          {visibleCount < filteredPosts.length && (
            <div className="flex justify-center mt-10">
              <button
                onClick={showMore}
                className="flex items-center gap-2 bg-bg-card border border-border text-text-secondary hover:text-text-primary hover:border-accent-yellow/40 px-6 py-3 rounded text-sm font-medium transition-all"
              >
                <ChevronDown size={16} />
                Show more
              </button>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="hidden lg:block">
          <div className="sticky top-24">
            <Sidebar activeCategory={activeCategory} onCategoryClick={handleCategoryClick} />
          </div>
        </div>
      </div>
    </main>
  );
}
