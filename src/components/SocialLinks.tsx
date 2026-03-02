import { socialProfiles } from "@/data/social-profiles";
import { motion } from "@/components/MotionWrapper";

export default function SocialLinks() {
  return (
    <div className="flex flex-wrap gap-3">
      {socialProfiles.map((link, i) => (
        <motion.a
          key={link.label}
          href={link.href}
          target={link.href.startsWith("mailto:") ? undefined : "_blank"}
          rel={link.href.startsWith("mailto:") ? undefined : "noopener noreferrer"}
          className="group relative flex items-center gap-2.5 px-4 py-2.5 rounded-full
            border border-border bg-transparent
            text-muted-foreground transition-all duration-300
            hover:bg-[var(--brand-bg)] hover:border-[var(--brand-border)]"
          style={
            {
              "--brand": link.color,
              "--brand-bg": `${link.color}0a`,
              "--brand-border": `${link.color}40`,
            } as React.CSSProperties
          }
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.35, delay: i * 0.05 }}
          whileHover={{ y: -2 }}
        >
          {/* Icon */}
          <svg
            viewBox="0 0 24 24"
            className="w-[18px] h-[18px] shrink-0 transition-colors duration-300"
            fill="currentColor"
            style={{ color: link.color }}
          >
            <path d={link.icon} />
          </svg>

          {/* Label + handle */}
          <div className="flex items-baseline gap-1.5">
            <span className="text-sm font-medium whitespace-nowrap group-hover:text-foreground transition-colors duration-300">
              {link.label}
            </span>
            <span className="text-xs text-muted-foreground whitespace-nowrap hidden sm:inline transition-colors duration-300 group-hover:text-muted-foreground">
              {link.handle}
            </span>
          </div>
        </motion.a>
      ))}
    </div>
  );
}
