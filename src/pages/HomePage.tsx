import { useState, useEffect, useRef, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowRight, Briefcase, MapPin, ExternalLink, Mail, Github, Twitter, Linkedin, Camera, BookOpen, Code2, Layers, Wrench, Clock, Building2, Cpu, Headphones, Maximize2, User } from "lucide-react";
import HeroBanner from "@/components/HeroBanner";
import InteractiveCodeCard from "@/components/InteractiveCodeCard";
import { FadeIn, StaggerContainer, StaggerItem, motion } from "@/components/MotionWrapper";
import { blogPosts } from "@/data/posts";
import { featuredPhotos } from "@/data/featured-photos";
import { workExperiences, skills, socialLinks } from "@/data/about";
import { siteConfig } from "@/config/site";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";

export default function HomePage() {
  useDocumentTitle();
  const recentPosts = blogPosts.slice(0, 3);
  const previewPhotos = featuredPhotos.slice(0, 6);

  return (
    <>
      <HeroBanner />

      <main className="max-w-5xl mx-auto px-6 relative z-10 space-y-24 pb-8">
        {/* ─── About Me ─── */}
        <section id="about">
          <div className="grid md:grid-cols-[1fr_260px] gap-10 items-start">
            <FadeIn>
              <div className="space-y-4">
                <SectionLabel icon={<User size={14} />} label="About Me" />
                <p className="text-muted-foreground leading-relaxed">{siteConfig.bio}</p>
                <p className="text-muted-foreground leading-relaxed">{siteConfig.bioExtended}</p>
                <div className="flex gap-3 pt-2">
                  <SocialPill href={socialLinks.github} icon={<Github size={15} />} label="GitHub" />
                  {socialLinks.twitter && <SocialPill href={socialLinks.twitter} icon={<Twitter size={15} />} label="Twitter" />}
                  <SocialPill href={socialLinks.linkedin} icon={<Linkedin size={15} />} label="LinkedIn" />
                  <SocialPill href={socialLinks.email} icon={<Mail size={15} />} label="Email" />
                </div>
              </div>
            </FadeIn>

            {/* Quick stats card */}
            <FadeIn delay={0.2}>
              <StatsCard />
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
              <SkillGroup icon={<Layers size={16} className="text-primary" />} title="Frameworks" items={skills.filter((s) => s.category === "framework")} />
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
                  className="group block bg-card border border-border rounded p-5 hover:border-primary/30 transition-all duration-300 h-full"
                >
                  <motion.div whileHover={{ y: -3 }} transition={{ duration: 0.2 }}>
                    <span className="text-xs text-warm font-medium uppercase tracking-wider">{post.category}</span>
                    <h3 className="text-foreground font-semibold mt-2 mb-2 group-hover:text-primary transition-colors leading-snug">{post.title}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed line-clamp-3">{post.description}</p>
                    <span className="inline-flex items-center gap-1 text-primary text-xs font-medium mt-3 group-hover:gap-2 transition-all">
                      Read more <ArrowRight size={12} />
                    </span>
                  </motion.div>
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
                <PhotoCard photo={photo} index={i} />
              </StaggerItem>
            ))}
          </StaggerContainer>
        </section>
      </main>
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

function PhotoCard({ photo, index }: { photo: (typeof import("@/data/featured-photos"))["featuredPhotos"][number]; index: number }) {
  const navigate = useNavigate();
  const [revealed, setRevealed] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleClick = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      if (!revealed) {
        setRevealed(true);
        // Auto-hide after 4 seconds of inactivity
        timerRef.current = setTimeout(() => setRevealed(false), 4000);
      } else {
        navigate(`/photography?view=featured&photo=${index}`);
      }
    },
    [revealed, navigate, index],
  );

  // Clear timer on unmount
  useEffect(
    () => () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    },
    [],
  );

  // Reset timer on re-tap while revealed
  const resetTimer = useCallback(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => setRevealed(false), 4000);
  }, []);

  return (
    <div
      onClick={handleClick}
      className={`group relative aspect-[4/3] rounded overflow-hidden border transition-all duration-300 cursor-pointer
        ${revealed ? "border-primary/40 shadow-[0_0_20px_rgba(255,214,68,0.1)]" : "border-border hover:border-primary/40"}`}
    >
      <img
        src={photo.src}
        alt={photo.alt}
        className={`w-full h-full object-cover transition-all duration-700
          ${revealed ? "grayscale-0 scale-105" : "grayscale group-hover:grayscale-0 group-hover:scale-105"}`}
        loading="lazy"
      />

      {/* Location overlay — visible on reveal or hover */}
      <div
        className={`absolute inset-0 bg-gradient-to-t from-background/70 via-transparent to-transparent transition-opacity duration-300 flex items-end p-3
          ${revealed ? "opacity-100" : "opacity-0 group-hover:opacity-100"}`}
      >
        <span className="text-white text-xs font-medium drop-shadow-lg flex items-center gap-1">
          <MapPin size={10} />
          {photo.meta?.location?.split(",")[0] || photo.alt}
        </span>
      </div>

      {/* "Open" button — appears after reveal */}
      {revealed && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.2 }}
          onClick={(e) => {
            e.stopPropagation();
            navigate(`/photography?view=featured&photo=${index}`);
          }}
          onMouseEnter={resetTimer}
          className="absolute top-2 right-2 bg-background/80 backdrop-blur-sm border border-border hover:border-primary/60 text-muted-foreground hover:text-primary rounded-full p-1.5 transition-all duration-200 cursor-pointer"
          aria-label="View full size"
        >
          <Maximize2 size={13} />
        </motion.button>
      )}

      {/* Tap hint — subtle pulse on grayscale images */}
      {!revealed && (
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-0 pointer-events-none md:hidden">
          <div className="w-8 h-8 rounded-full bg-white/10 animate-ping" />
        </div>
      )}
    </div>
  );
}

function useCountUp(end: number, duration = 1200) {
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStarted(true);
          observer.disconnect();
        }
      },
      { threshold: 0.5 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!started) return;
    const steps = 30;
    const increment = end / steps;
    let current = 0;
    const interval = setInterval(() => {
      current += increment;
      if (current >= end) {
        setCount(end);
        clearInterval(interval);
      } else setCount(Math.floor(current));
    }, duration / steps);
    return () => clearInterval(interval);
  }, [started, end, duration]);

  return { count, ref };
}

function StatsCard() {
  const years = new Date().getFullYear() - siteConfig.startYear;
  const companies = siteConfig.workExperiences.length;
  const tools = siteConfig.skills.length;

  const yearsCounter = useCountUp(years);
  const companiesCounter = useCountUp(companies, 800);
  const toolsCounter = useCountUp(tools, 1000);

  const [musicHover, setMusicHover] = useState(false);
  const [noteTick, setNoteTick] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setNoteTick((t) => t + 1), 2000);
    return () => clearInterval(id);
  }, []);

  const stats = [
    {
      icon: <Clock size={18} />,
      label: "Years of experience",
      value: `${yearsCounter.count}+`,
      ref: yearsCounter.ref,
      color: "text-primary",
      barColor: "bg-primary",
      barWidth: `${Math.min((years / 15) * 100, 100)}%`,
    },
    {
      icon: <Building2 size={18} />,
      label: "Companies worked at",
      value: `${companiesCounter.count}`,
      ref: companiesCounter.ref,
      color: "text-accent",
      barColor: "bg-accent",
      barWidth: `${(companies / 8) * 100}%`,
    },
    {
      icon: <Cpu size={18} />,
      label: "Languages & tools",
      value: `${toolsCounter.count}+`,
      ref: toolsCounter.ref,
      color: "text-accent",
      barColor: "bg-accent",
      barWidth: `${Math.min((tools / 20) * 100, 100)}%`,
    },
  ];

  return (
    <div className="bg-card border border-border rounded-lg p-5 space-y-3">
      {stats.map((stat) => (
        <div key={stat.label} ref={stat.ref} className="group cursor-default">
          <div className="flex items-center gap-3 mb-1.5">
            <div className={`${stat.color} transition-transform group-hover:scale-125 group-hover:rotate-12 duration-300`}>{stat.icon}</div>
            <span className="text-muted-foreground text-sm flex-1">{stat.label}</span>
            <span className={`font-bold text-lg tabular-nums ${stat.color} transition-all group-hover:scale-110 duration-300`}>{stat.value}</span>
          </div>
          <div className="h-1 rounded-full bg-secondary overflow-hidden ml-[30px]">
            <div className={`h-full rounded-full ${stat.barColor} opacity-60 transition-all duration-1000 ease-out group-hover:opacity-100`} style={{ width: stat.barWidth }} />
          </div>
        </div>
      ))}

      {/* Music row — special interactive one */}
      <div className="group cursor-pointer select-none" onMouseEnter={() => setMusicHover(true)} onMouseLeave={() => setMusicHover(false)}>
        <div className="flex items-center gap-3">
          <div className={`text-warm transition-all duration-300 ${musicHover ? "scale-125 -rotate-12" : ""}`}>
            <Headphones size={18} />
          </div>
          <span className="text-muted-foreground text-sm flex-1">Hours of music while coding</span>
          <span className="relative font-bold text-lg text-warm">
            {musicHover ? "🎵🎵🎵" : "∞"}
            {/* Animated note */}
            <span key={noteTick} className="absolute -top-3 right-0 text-[10px] opacity-0 animate-[float-up_2s_ease-out_infinite] pointer-events-none">
              🎶
            </span>
          </span>
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
