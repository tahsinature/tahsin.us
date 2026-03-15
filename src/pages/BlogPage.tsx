import { useState } from "react";
import { ChevronDown } from "lucide-react";
import BlogCard from "@/components/BlogCard";
import Sidebar from "@/components/Sidebar";
import { blogPosts, categories } from "@/data/posts";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";
import { FadeIn } from "@/components/MotionWrapper";
import { AnimatePresence, motion } from "motion/react";
import { PAGE_PADDING } from "@/config/layout";

export default function BlogPage() {
  useDocumentTitle("Blog");
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
    <main className={`max-w-7xl mx-auto ${PAGE_PADDING}`}>
      {/* Page Header */}
      <FadeIn>
        <div className="mb-10">
          <h1 className="text-3xl font-bold text-foreground mb-2">Blog</h1>
          <p className="text-muted-foreground max-w-2xl leading-relaxed">Articles and tutorials on CSS, JavaScript, React, animation, and more.</p>
        </div>
      </FadeIn>

      {/* Category Filter — visible only on small screens where sidebar is hidden */}
      <FadeIn delay={0.1}>
        <div className="flex flex-wrap gap-2 mb-8 lg:hidden">
          <motion.button
            layout
            onClick={() => {
              setActiveCategory(null);
              setVisibleCount(8);
            }}
            className={`px-3 py-1.5 rounded text-xs font-medium border transition-colors ${
              activeCategory === null ? "bg-primary/15 border-primary/40 text-primary" : "bg-secondary border-border text-secondary-foreground hover:text-foreground hover:border-primary/30"
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
          >
            All
          </motion.button>
          {categories.map((cat) => {
            const count = blogPosts.filter((p) => p.category === cat).length;
            return (
              <motion.button
                layout
                key={cat}
                onClick={() => handleCategoryClick(cat)}
                className={`px-3 py-1.5 rounded text-xs font-medium border transition-colors ${
                  activeCategory === cat
                    ? "bg-primary/15 border-primary/40 text-primary"
                    : "bg-secondary border-border text-secondary-foreground hover:text-foreground hover:border-primary/30"
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
              >
                {cat}
                <span className="ml-1.5 text-muted-foreground">{count}</span>
              </motion.button>
            );
          })}
        </div>
      </FadeIn>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-12">
        {/* Blog Posts */}
        <div>
          <FadeIn>
            <h2 className="text-primary uppercase tracking-[0.2em] text-xs font-bold mb-6">
              {activeCategory ? activeCategory : "All Articles"}{" "}
              <span className="text-muted-foreground font-normal normal-case tracking-normal">
                — {filteredPosts.length} post{filteredPosts.length !== 1 ? "s" : ""}
              </span>
            </h2>
          </FadeIn>

          {filteredPosts.length === 0 ? (
            <p className="text-muted-foreground py-12 text-center text-sm">No posts in this category yet.</p>
          ) : (
            <AnimatePresence mode="popLayout">
              {filteredPosts.slice(0, visibleCount).map((post, i) => (
                <motion.div
                  key={post.slug}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.35, delay: i * 0.05 }}
                  layout
                >
                  <BlogCard post={post} />
                </motion.div>
              ))}
            </AnimatePresence>
          )}

          {visibleCount < filteredPosts.length && (
            <FadeIn>
              <div className="flex justify-center mt-10">
                <motion.button
                  onClick={showMore}
                  className="flex items-center gap-2 bg-card border border-border text-muted-foreground hover:text-foreground hover:border-primary/40 px-6 py-3 rounded text-sm font-medium transition-all"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                >
                  <ChevronDown size={16} />
                  Show more
                </motion.button>
              </div>
            </FadeIn>
          )}
        </div>

        {/* Sidebar */}
        <div className="hidden lg:block">
          <FadeIn delay={0.2}>
            <div className="sticky top-24">
              <Sidebar activeCategory={activeCategory} onCategoryClick={handleCategoryClick} />
            </div>
          </FadeIn>
        </div>
      </div>
    </main>
  );
}
