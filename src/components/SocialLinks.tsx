import { socialProfiles } from "@/data/social-profiles";

export default function SocialLinks() {
  return (
    <div className="flex flex-wrap gap-3">
      {socialProfiles.map((link) => (
        <a
          key={link.label}
          href={link.href}
          target={link.href.startsWith("mailto:") ? undefined : "_blank"}
          rel={link.href.startsWith("mailto:") ? undefined : "noopener noreferrer"}
          className="group flex-1 basis-[calc(25%-0.75rem)] min-w-[calc(50%-0.75rem)] sm:min-w-[calc(33.333%-0.75rem)] md:min-w-[calc(25%-0.75rem)]
            flex items-center justify-center gap-2.5 px-4 py-3 rounded-full
            text-text-secondary transition-all duration-300
            hover:-translate-y-0.5 hover:bg-bg-card"
          style={{ "--brand": link.color } as React.CSSProperties}
        >
          <svg viewBox="0 0 24 24" className="w-[18px] h-[18px] shrink-0 transition-colors duration-300" fill="currentColor" style={{ color: "var(--brand)" }}>
            <path d={link.icon} />
          </svg>
          <span className="text-sm font-medium whitespace-nowrap group-hover:text-text-primary transition-colors duration-300">{link.label}</span>
        </a>
      ))}
    </div>
  );
}
