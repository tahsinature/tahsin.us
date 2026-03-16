import { useDocumentTitle } from "@/hooks/useDocumentTitle";
import { BlurFadeIn } from "@/components/MotionWrapper";
import { useLottie } from "lottie-react";
import animationData from "@/assets/404.json";

export default function NotFoundPage() {
  useDocumentTitle("404 — Page Not Found");

  const { View } = useLottie({ animationData, loop: true });

  return (
    <div className="flex-1 basis-0 min-h-0 flex items-center justify-center p-6">
      <div className="w-full max-w-2xl" style={{ maxHeight: "calc(100vh - 12rem)" }}>
        <BlurFadeIn>
          {View}
        </BlurFadeIn>
      </div>
    </div>
  );
}
