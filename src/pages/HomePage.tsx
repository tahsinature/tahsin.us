import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Briefcase, MapPin, ExternalLink, Mail, Github, Twitter, Linkedin, Camera, BookOpen, Code2, Layers, Wrench, User, Maximize2 } from "lucide-react";
import HeroBanner from "@/components/HeroBanner";
import InteractiveCodeCard from "@/components/InteractiveCodeCard";
import PhotoLightbox from "@/components/PhotoLightbox";
import { FadeIn, StaggerContainer, StaggerItem, motion } from "@/components/MotionWrapper";
import { blogPosts } from "@/data/posts";
import { favPhotos } from "@/data/fav-photos";
import { workExperiences, skills, socialLinks } from "@/data/about";
import { siteConfig } from "@/config/site";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";

export default function HomePage() {
  useDocumentTitle();
  const recentPosts = blogPosts.slice(0, 3);
  const previewPhotos = favPhotos.slice(0, 6);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  return (
    <>
      <HeroBanner />

      <main className="max-w-5xl mx-auto px-6 relative z-10 space-y-24 pb-8">
        {/* ─── About Me ─── */}
        <section id="about">
          <div className="grid md:grid-cols-[1fr_280px] gap-10 items-start">
            <FadeIn>
              <div className="space-y-4">
                <SectionLabel icon={<User size={14} />} label="About Me" />
                <p className="text-muted-foreground leading-relaxed text-[15px]">{siteConfig.bio}</p>
                <p className="text-muted-foreground leading-relaxed text-[15px]">{siteConfig.bioExtended}</p>
                <div className="flex flex-wrap gap-3 pt-2">
                  <SocialPill href={socialLinks.github} icon={<Github size={15} />} label="GitHub" />
                  {socialLinks.twitter && <SocialPill href={socialLinks.twitter} icon={<Twitter size={15} />} label="Twitter" />}
                  <SocialPill href={socialLinks.linkedin} icon={<Linkedin size={15} />} label="LinkedIn" />
                  <SocialPill href={socialLinks.email} icon={<Mail size={15} />} label="Email" />
                </div>
              </div>
            </FadeIn>

            {/* Location illustration */}
            <FadeIn delay={0.2}>
              <LocationCard />
            </FadeIn>
          </div>
        </section>

        {/* ─── Work Experience ─── */}
        <section id="experience">
          <FadeIn>
            <SectionLabel icon={<Briefcase size={14} />} label="Work Experience" />
          </FadeIn>
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-[19px] top-2 bottom-2 w-px bg-border hidden md:block" />

            <StaggerContainer className="space-y-2" staggerDelay={0.1}>
              {workExperiences.map((job, i) => (
                <StaggerItem key={i}>
                  <div className="group relative flex gap-5">
                    {/* Timeline dot */}
                    <div className="hidden md:flex flex-col items-center pt-1.5">
                      <div
                        className={`w-[10px] h-[10px] rounded-full border-2 z-10 ${
                          i === 0 ? "border-primary bg-primary/30" : "border-border bg-background"
                        } group-hover:border-primary group-hover:bg-primary/30 transition-colors`}
                      />
                    </div>

                    {/* Card */}
                    <motion.div
                      className="flex-1 bg-card border border-border rounded p-5 hover:border-primary/30 transition-all duration-300"
                      whileHover={{ y: -2, transition: { duration: 0.2 } }}
                    >
                      <div className="flex flex-wrap items-start justify-between gap-2 mb-2">
                        <div>
                          <h3 className="text-foreground font-semibold text-base group-hover:text-primary transition-colors">{job.role}</h3>
                          <div className="flex items-center gap-2 text-sm">
                            {job.url ? (
                              <a href={job.url} target="_blank" rel="noopener noreferrer" className="text-accent hover:underline flex items-center gap-1">
                                {job.company}
                                <ExternalLink size={11} />
                              </a>
                            ) : (
                              <span className="text-muted-foreground">{job.company}</span>
                            )}
                          </div>
                        </div>
                        <span className="text-muted-foreground text-xs bg-secondary px-2.5 py-1 rounded border border-border whitespace-nowrap">
                          {job.from} — {job.to}
                        </span>
                      </div>
                      <p className="text-muted-foreground text-sm leading-relaxed">{job.description}</p>
                    </motion.div>
                  </div>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </section>

        {/* ─── Skills & Tech ─── */}
        <section id="skills">
          <FadeIn>
            <SectionLabel icon={<Code2 size={14} />} label="Skills & Technologies" />
          </FadeIn>
          <StaggerContainer className="grid sm:grid-cols-3 gap-6" staggerDelay={0.12}>
            <StaggerItem variant="scale">
              <InteractiveCodeCard icon={<Code2 size={16} className="text-accent" />} title="Languages" items={skills.filter((s) => s.category === "language")} />
            </StaggerItem>
            <StaggerItem variant="scale">
              <SkillGroup icon={<Layers size={16} className="text-accent" />} title="Frameworks" items={skills.filter((s) => s.category === "framework")} />
            </StaggerItem>
            <StaggerItem variant="scale">
              <SkillGroup icon={<Wrench size={16} className="text-accent" />} title="Tools" items={skills.filter((s) => s.category === "tool")} />
            </StaggerItem>
          </StaggerContainer>
        </section>

        {/* ─── Recent Blog Posts ─── */}
        <section id="writing">
          <FadeIn>
            <div className="flex items-end justify-between mb-6">
              <SectionLabel icon={<BookOpen size={14} />} label="Recent Writing" />
              <Link to="/blog" className="text-primary text-sm font-medium hover:underline flex items-center gap-1">
                View all posts <ArrowRight size={14} />
              </Link>
            </div>
          </FadeIn>
          <StaggerContainer className="grid sm:grid-cols-3 gap-5" staggerDelay={0.1}>
            {recentPosts.map((post) => (
              <StaggerItem key={post.slug} variant="scale">
                <Link
                  to={`/post/${post.slug}`}
                  className="group relative block bg-card border border-border rounded p-5 hover:border-primary/30 transition-colors duration-300 h-full overflow-hidden"
                >
                  <motion.div whileHover={{ y: -3 }} transition={{ duration: 0.2 }}>
                    <h3 className="text-foreground font-semibold mb-2 group-hover:text-primary transition-colors leading-snug">{post.title}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed line-clamp-3">{post.description}</p>
                  </motion.div>
                  {/* Arrow reveal on hover */}
                  <div className="absolute bottom-4 right-4 translate-x-4 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-300">
                    <ArrowRight size={16} className="text-primary" />
                  </div>
                </Link>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </section>

        {/* ─── Photography Showcase ─── */}
        <section id="photography">
          <FadeIn>
            <div className="flex items-end justify-between mb-6">
              <SectionLabel icon={<Camera size={14} />} label="Photography" />
              <Link to="/photography" className="text-primary text-sm font-medium hover:underline flex items-center gap-1">
                Browse all <ArrowRight size={14} />
              </Link>
            </div>
          </FadeIn>
          <StaggerContainer className="grid grid-cols-2 md:grid-cols-3 gap-3" staggerDelay={0.08}>
            {previewPhotos.map((photo, i) => (
              <StaggerItem key={i} variant="scale">
                <PhotoCard photo={photo} index={i} onOpen={setLightboxIndex} />
              </StaggerItem>
            ))}
          </StaggerContainer>
        </section>
      </main>

      <PhotoLightbox
        photos={previewPhotos}
        index={lightboxIndex}
        onClose={() => setLightboxIndex(null)}
        onNext={() => setLightboxIndex((i) => Math.min((i ?? 0) + 1, previewPhotos.length - 1))}
        onPrev={() => setLightboxIndex((i) => Math.max((i ?? 0) - 1, 0))}
      />
    </>
  );
}

/* ── Reusable sub-components ── */

function SectionLabel({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <h2 className="flex items-center gap-2 text-primary uppercase tracking-[0.2em] text-xs font-bold mb-6">
      {icon}
      {label}
    </h2>
  );
}

function PhotoCard({ photo, index, onOpen }: { photo: import("@/data/trips").Photo; index: number; onOpen: (index: number) => void }) {
  // Mobile: two-tap (tap to reveal, tap fullscreen to open)
  // Desktop: hover reveals, click anywhere opens lightbox
  const [revealed, setRevealed] = useState(false);
  const [hovered, setHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const active = revealed || hovered;

  // Close mobile reveal on outside tap
  useEffect(() => {
    if (!revealed) return;
    const handleClick = (e: MouseEvent) => {
      if (cardRef.current && !cardRef.current.contains(e.target as Node)) {
        setRevealed(false);
      }
    };
    const raf = requestAnimationFrame(() => {
      document.addEventListener("click", handleClick);
    });
    return () => {
      cancelAnimationFrame(raf);
      document.removeEventListener("click", handleClick);
    };
  }, [revealed]);

  const handleClick = () => {
    // Desktop (hover available): click opens lightbox directly
    if (hovered) {
      onOpen(index);
      return;
    }
    // Mobile: first tap reveals, second tap (on fullscreen btn) opens
    if (!revealed) setRevealed(true);
  };

  return (
    <motion.div
      ref={cardRef}
      onClick={handleClick}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      className="relative aspect-[4/3] rounded overflow-hidden border border-border cursor-pointer transition-colors duration-500 ease-out hover:border-primary/40"
      animate={{ y: active ? -4 : 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      <motion.img
        src={photo.src}
        alt={photo.alt}
        className="w-full h-full object-cover"
        animate={{
          scale: active ? 1.05 : 1,
          filter: active ? "grayscale(0%)" : "grayscale(100%)",
        }}
        transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
        loading="lazy"
      />

      {/* Overlay — info + fullscreen button */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-t from-background/70 via-transparent to-transparent flex items-end p-3"
        initial={false}
        animate={{ opacity: active ? 1 : 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
      >
        <motion.div
          className="flex flex-col gap-1"
          initial={false}
          animate={{ y: active ? 0 : 8, opacity: active ? 1 : 0 }}
          transition={{ duration: 0.4, ease: "easeOut", delay: 0.05 }}
        >
          <span className="text-white text-xs font-medium drop-shadow-lg flex items-center gap-1">
            <MapPin size={10} />
            {photo.meta?.location?.split(",")[0] || photo.alt}
          </span>
        </motion.div>
      </motion.div>

      {/* Fullscreen button — mobile only */}
      <motion.button
        initial={false}
        animate={{ opacity: revealed ? 1 : 0, scale: revealed ? 1 : 0.5 }}
        transition={{ duration: 0.3 }}
        onClick={(e) => { e.stopPropagation(); onOpen(index); }}
        className="md:hidden absolute top-2 right-2 bg-background/70 backdrop-blur-sm text-foreground p-1.5 rounded border border-border/50 transition-colors cursor-pointer"
        style={{ pointerEvents: revealed ? "auto" : "none" }}
      >
        <Maximize2 size={14} />
      </motion.button>
    </motion.div>
  );
}

function LocationCard() {
  return (
    <div className="hidden md:flex flex-col items-center justify-center rounded-xl border border-border/40 bg-card/30 p-8 h-full min-h-[200px] relative overflow-hidden">
      {/* Decorative concentric rings */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-40 h-40 rounded-full border border-border/20" />
        <div className="absolute w-28 h-28 rounded-full border border-border/15" />
        <div className="absolute w-16 h-16 rounded-full border border-border/10" />
      </div>

      {/* Pin + label */}
      <div className="relative flex flex-col items-center gap-3">
        <motion.div
          className="flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 text-primary"
          animate={{ y: [0, -4, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        >
          <MapPin size={22} />
        </motion.div>
        <div className="text-center">
          <p className="text-foreground font-semibold text-sm">{siteConfig.locationShort}</p>
          <p className="text-muted-foreground/60 text-xs mt-0.5">{siteConfig.locationEmoji} Canada</p>
        </div>
      </div>
    </div>
  );
}

function SocialPill({ href, icon, label }: { href: string; icon: React.ReactNode; label: string }) {
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center gap-1.5 bg-card border border-border text-muted-foreground hover:text-primary hover:border-primary/40 px-3 py-1.5 rounded text-xs font-medium transition-all"
      whileHover={{ scale: 1.05, y: -1 }}
      whileTap={{ scale: 0.97 }}
      transition={{ duration: 0.15 }}
    >
      {icon}
      {label}
    </motion.a>
  );
}

function SkillGroup({ icon, title, items }: { icon: React.ReactNode; title: string; items: { name: string }[] }) {
  return (
    <div className="bg-card border border-border rounded p-5 h-full">
      <div className="flex items-center gap-2 mb-4">
        {icon}
        <h3 className="text-foreground font-semibold text-sm">{title}</h3>
      </div>
      <div className="flex flex-wrap gap-2">
        {items.map((s) => (
          <span key={s.name} className="bg-secondary text-secondary-foreground px-2.5 py-1 rounded-sm text-xs border border-border">
            {s.name}
          </span>
        ))}
      </div>
    </div>
  );
}
