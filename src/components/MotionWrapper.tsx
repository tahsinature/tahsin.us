import { useRef, type ReactNode } from "react";
import { motion, useInView, type Variant } from "motion/react";

/* ── Shared easing ── */
const smooth = [0.25, 0.1, 0.25, 1] as const;
const springy = { type: "spring" as const, stiffness: 100, damping: 20 };

/* ── Fade-up on scroll ── */
export function FadeIn({
  children,
  className = "",
  delay = 0,
  duration = 0.6,
  y = 30,
  once = true,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  y?: number;
  once?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y }}
      transition={{ duration, delay, ease: smooth }}
    >
      {children}
    </motion.div>
  );
}

/* ── Scale-fade on scroll ── */
export function ScaleIn({
  children,
  className = "",
  delay = 0,
  duration = 0.5,
  once = true,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  once?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once, margin: "-40px" });

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
      transition={{ duration, delay, ease: smooth }}
    >
      {children}
    </motion.div>
  );
}

/* ── Slide-in from left/right ── */
export function SlideIn({
  children,
  className = "",
  delay = 0,
  duration = 0.6,
  direction = "left",
  once = true,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  direction?: "left" | "right";
  once?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once, margin: "-60px" });
  const x = direction === "left" ? -40 : 40;

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, x }}
      animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x }}
      transition={{ duration, delay, ease: smooth }}
    >
      {children}
    </motion.div>
  );
}

/* ── Stagger container + item ── */
const staggerContainerVariants = {
  hidden: {},
  visible: (staggerDelay: number) => ({
    transition: { staggerChildren: staggerDelay },
  }),
};

export function StaggerContainer({
  children,
  className = "",
  staggerDelay = 0.08,
  once = true,
}: {
  children: ReactNode;
  className?: string;
  staggerDelay?: number;
  once?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once, margin: "-40px" });

  return (
    <motion.div
      ref={ref}
      className={className}
      variants={staggerContainerVariants}
      custom={staggerDelay}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
    >
      {children}
    </motion.div>
  );
}

const staggerItemUp: Record<string, Variant> = {
  hidden: { opacity: 0, y: 25 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: smooth } },
};

const staggerItemScale: Record<string, Variant> = {
  hidden: { opacity: 0, scale: 0.92 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.45, ease: smooth } },
};

export function StaggerItem({
  children,
  className = "",
  variant = "up",
}: {
  children: ReactNode;
  className?: string;
  variant?: "up" | "scale";
}) {
  return (
    <motion.div className={className} variants={variant === "up" ? staggerItemUp : staggerItemScale}>
      {children}
    </motion.div>
  );
}

/* ── Page transition wrapper ── */
export function PageTransition({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: smooth }}
    >
      {children}
    </motion.div>
  );
}

/* ── Blur-fade in (for hero text) ── */
export function BlurFadeIn({
  children,
  className = "",
  delay = 0,
  duration = 0.7,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      transition={{ duration, delay, ease: smooth }}
    >
      {children}
    </motion.div>
  );
}

/* ── Floating animation (continuous) ── */
export function Float({
  children,
  className = "",
  y = 8,
  duration = 3,
}: {
  children: ReactNode;
  className?: string;
  y?: number;
  duration?: number;
}) {
  return (
    <motion.div
      className={className}
      animate={{ y: [-y / 2, y / 2, -y / 2] }}
      transition={{ duration, repeat: Infinity, ease: "easeInOut" }}
    >
      {children}
    </motion.div>
  );
}

export { motion, springy, smooth };
