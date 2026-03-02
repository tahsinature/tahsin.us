import { Link } from "react-router-dom";
import type { BlogPost } from "@/data/posts";
import { motion } from "@/components/MotionWrapper";

interface BlogCardProps {
  post: BlogPost;
}

export default function BlogCard({ post }: BlogCardProps) {
  return (
    <article className="group py-8 border-b border-border last:border-b-0">
      <Link to={`/post/${post.slug}`} className="block">
        <motion.div whileHover={{ x: 4 }} transition={{ duration: 0.2 }}>
          <h2 className="text-xl font-semibold text-foreground group-hover:text-primary transition-colors mb-2">{post.title}</h2>
          <p className="text-muted-foreground text-sm leading-relaxed mb-3 max-w-2xl">{post.description}</p>
          <span className="text-primary text-sm font-medium inline-flex items-center gap-1 group-hover:gap-2 transition-all">Read more</span>
        </motion.div>
      </Link>
    </article>
  );
}
