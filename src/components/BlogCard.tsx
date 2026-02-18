import { Link } from "react-router-dom";
import type { BlogPost } from "@/data/posts";

interface BlogCardProps {
  post: BlogPost;
}

export default function BlogCard({ post }: BlogCardProps) {
  return (
    <article className="group py-8 border-b border-border last:border-b-0">
      <Link to={`/post/${post.slug}`} className="block">
        <h2 className="text-xl font-semibold text-text-primary group-hover:text-accent-yellow transition-colors mb-2">{post.title}</h2>
        <p className="text-text-secondary text-sm leading-relaxed mb-3 max-w-2xl">{post.description}</p>
        <span className="text-accent-yellow text-sm font-medium inline-flex items-center gap-1 group-hover:gap-2 transition-all">Read more</span>
      </Link>
    </article>
  );
}
