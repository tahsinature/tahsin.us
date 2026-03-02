import { motion } from "motion/react";
import { ArrowRight, ChevronDown } from "lucide-react";
import { Link } from "react-router-dom";
import { siteConfig } from "@/config/site";

const smooth = [0.25, 0.1, 0.25, 1] as const;

export default function HeroBanner() {
  return (
    <div className="relative overflow-x-clip -mt-[64px]">
      {/* ── Content ── */}
      <div className="relative z-10 pt-[64px] min-h-[60vh] md:min-h-[460px] max-h-[600px] flex items-center">
        <div className="max-w-5xl mx-auto px-6 w-full">
          <div className="max-w-xl">
            {/* Tagline */}
            <motion.p
              className="text-primary text-sm font-medium tracking-wider uppercase mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3, ease: smooth }}
            >
              {siteConfig.tagline}
            </motion.p>

            {/* Main heading */}
            <motion.h1
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight mb-4"
              initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 0.8, delay: 0.5, ease: smooth }}
            >
              Hey, I'm{" "}
              <span className="text-primary">{siteConfig.name.first}</span>{" "}
              <motion.span
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: 1.0, type: "spring", stiffness: 200 }}
                className="inline-block origin-bottom-right"
              >
                👋
              </motion.span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-6 max-w-md"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7, ease: smooth }}
            >
              {siteConfig.headline} based in {siteConfig.locationShort}.
            </motion.p>

            {/* CTA buttons */}
            <motion.div
              className="flex flex-wrap gap-3"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.9, ease: smooth }}
            >
              <Link
                to="/about"
                className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-5 py-2.5 rounded-full font-semibold text-sm hover:brightness-110 transition-all"
              >
                About me
                <ArrowRight size={14} />
              </Link>
              <Link
                to="/blog"
                className="inline-flex items-center gap-2 bg-card/60 backdrop-blur-sm border border-border/40 text-muted-foreground hover:text-foreground px-5 py-2.5 rounded-full font-medium text-sm transition-all"
              >
                Read the blog
              </Link>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-1"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.6 }}
      >
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown size={20} className="text-muted-foreground" />
        </motion.div>
      </motion.div>
    </div>
  );
}
