import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";

export default function NotFoundPage() {
  useDocumentTitle("404 — Page Not Found");

  return (
    <div className="max-w-xl mx-auto px-6 flex-1 flex flex-col items-center justify-center text-center">
      <h1 className="text-6xl font-bold text-text-primary mb-4">404</h1>
      <p className="text-text-secondary text-lg mb-8">The page you're looking for doesn't exist or has been moved.</p>
      <Link to="/" className="inline-flex items-center gap-2 text-accent-yellow hover:underline transition-colors">
        <ArrowLeft size={16} />
        Back to home
      </Link>
    </div>
  );
}
