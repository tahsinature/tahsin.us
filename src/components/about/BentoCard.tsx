import type { ReactNode } from "react";
import { motion } from "@/components/MotionWrapper";

interface BentoCardProps {
  children: ReactNode;
  className?: string;
  /** Span columns on md+ screens: 1 (default) or 2 */
  span?: 1 | 2;
  /** Optional accent color for top border */
  accent?: string;
}

export default function BentoCard({ children, className = "", span = 1, accent }: BentoCardProps) {
  return (
    <motion.div
      className={`
        bg-card border border-border rounded-lg p-6 h-full
        transition-colors duration-300 hover:border-primary/30
        ${span === 2 ? "md:col-span-2" : ""}
        ${className}
      `}
      style={accent ? { borderTopColor: accent, borderTopWidth: 2 } : undefined}
      whileHover={{ y: -3, transition: { duration: 0.25 } }}
    >
      {children}
    </motion.div>
  );
}
