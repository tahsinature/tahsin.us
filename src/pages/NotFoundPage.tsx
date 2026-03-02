import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";
import { BlurFadeIn, FadeIn, Float } from "@/components/MotionWrapper";

export default function NotFoundPage() {
  useDocumentTitle("404 — Page Not Found");

  return (
    <div className="max-w-xl mx-auto px-6 flex-1 flex flex-col items-center justify-center text-center">
      <BlurFadeIn>
        <Float y={10} duration={4}>
          <h1 className="text-6xl font-bold text-foreground mb-4">404</h1>
        </Float>
      </BlurFadeIn>
      <BlurFadeIn delay={0.1}>
        <p className="text-muted-foreground text-lg mb-8">The page you're looking for doesn't exist or has been moved.</p>
      </BlurFadeIn>
      <FadeIn delay={0.2}>
        <Link to="/" className="inline-flex items-center gap-2 text-primary hover:underline transition-colors">
          <ArrowLeft size={16} />
          Back to home
        </Link>
      </FadeIn>
    </div>
  );
}
