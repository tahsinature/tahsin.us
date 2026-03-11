import { socialProfiles, type SocialLink } from "@/data/social-profiles";
import { platforms } from "@/config/platforms";
import { motion } from "@/components/MotionWrapper";
import { useImageColor } from "@/hooks/useImageColor";

function SocialLinkItem({ link, index }: { link: SocialLink; index: number }) {
  const platform = platforms[link.platform];
  const color = useImageColor(platform.favicon);

  return (
    <motion.a
      href={link.href}
      target={link.href.startsWith("mailto:") ? undefined : "_blank"}
      rel={link.href.startsWith("mailto:") ? undefined : "noopener noreferrer"}
      className="group relative flex items-center gap-2.5 px-4 py-2.5 rounded-full
        border border-border bg-transparent
        text-muted-foreground transition-all duration-300
        hover:bg-[var(--brand-bg)] hover:border-[var(--brand-border)]"
      style={
        color
          ? ({
              "--brand": color,
              "--brand-bg": `${color}0a`,
              "--brand-border": `${color}40`,
            } as React.CSSProperties)
          : undefined
      }
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.35, delay: index * 0.05 }}
      whileHover={{ y: -2 }}
    >
      <img
        src={platform.favicon}
        alt={platform.name}
        className="w-[18px] h-[18px] shrink-0"
        loading="lazy"
      />

      <div className="flex items-baseline gap-1.5">
        <span className="text-sm font-medium whitespace-nowrap group-hover:text-foreground transition-colors duration-300">
          {platform.name}
        </span>
        <span className="text-xs text-muted-foreground whitespace-nowrap hidden sm:inline transition-colors duration-300 group-hover:text-muted-foreground">
          {link.handle}
        </span>
      </div>
    </motion.a>
  );
}

export default function SocialLinks() {
  return (
    <div className="flex flex-wrap gap-3">
      {socialProfiles.map((link, i) => (
        <SocialLinkItem key={link.platform} link={link} index={i} />
      ))}
    </div>
  );
}
