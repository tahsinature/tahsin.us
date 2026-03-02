import { useState, useCallback } from "react";
import { createPortal } from "react-dom";
import { MapPin, ArrowRight, Headphones, BookOpen, Zap, Server, Cloud, Sparkles } from "lucide-react";
import ContactCTA from "@/components/ContactCTA";
import SocialLinks from "@/components/SocialLinks";
import { CodeTerminalModal } from "@/components/InteractiveCodeCard";
import { LanguageCardModal } from "@/components/LanguageCardModal";
import { snippetsByLabel } from "@/data/code-snippets";
import { languagesByLabel } from "@/data/language-phrases";
import BentoCard from "@/components/about/BentoCard";
import CatIllustration from "@/components/about/CatIllustration";
import DogIllustration from "@/components/about/DogIllustration";
import BookshelfIllustration from "@/components/about/BookshelfIllustration";
import WorkspaceIllustration from "@/components/about/WorkspaceIllustration";
import SpeakerIllustration from "@/components/about/SpeakerIllustration";
import LanguagesIllustration from "@/components/about/LanguagesIllustration";
import { workExperiences } from "@/data/about";
import { siteConfig } from "@/config/site";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";
import { FadeIn, BlurFadeIn, SlideIn, StaggerContainer, StaggerItem, Float } from "@/components/MotionWrapper";
import { CharacterIllustration } from "@/components/SVGs";

export default function AboutPage() {
  useDocumentTitle("About");
  const [activeLang, setActiveLang] = useState<string | null>(null);
  const handleClose = useCallback(() => setActiveLang(null), []);

  const [activeHumanLang, setActiveHumanLang] = useState<string | null>(null);
  const handleHumanLangClose = useCallback(() => setActiveHumanLang(null), []);

  return (
    <main className="pb-20">
      {/* ─── Hero Section ─── */}
      <section className="max-w-5xl mx-auto px-6 pt-16 pb-12 md:pt-24 md:pb-20">
        <div className="grid md:grid-cols-[1fr_340px] gap-10 items-start">
          <div className="space-y-6">
            <BlurFadeIn>
              <h1 className="text-4xl md:text-5xl font-bold text-foreground leading-tight italic">Hi there! I'm {siteConfig.name.first}.</h1>
            </BlurFadeIn>
            <BlurFadeIn delay={0.1}>
              <p className="text-muted-foreground leading-relaxed text-base md:text-lg">{siteConfig.bio}</p>
            </BlurFadeIn>
            <BlurFadeIn delay={0.2}>
              <p className="text-muted-foreground leading-relaxed text-base md:text-lg">
                I've worked at organizations like{" "}
                {workExperiences.slice(0, 3).map((job, i) => (
                  <span key={job.company}>
                    {i > 0 && (i === 2 ? ", and " : ", ")}
                    {job.url ? (
                      <a href={job.url} target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">
                        {job.company}
                      </a>
                    ) : (
                      job.company
                    )}
                  </span>
                ))}
                .
              </p>
            </BlurFadeIn>
            <BlurFadeIn delay={0.3}>
              <p className="text-muted-foreground leading-relaxed text-base md:text-lg">{siteConfig.bioExtended}</p>
            </BlurFadeIn>
          </div>

          {/* Character illustration — reuse the SVG style from the HeroBanner */}
          <SlideIn direction="right" delay={0.3} className="hidden md:flex justify-center">
            <div className="relative">
              <Float y={6} duration={4}>
                <CharacterIllustration width="280" aria-label={`${siteConfig.name.first} illustration`} />
              </Float>

              {/* Confetti dots around the illustration */}
              <div className="absolute -top-4 -left-8 w-3 h-3 rounded-full bg-warm opacity-60 animate-pulse" />
              <div className="absolute top-8 -right-6 w-2 h-2 rounded-full bg-accent opacity-50 animate-pulse [animation-delay:0.5s]" />
              <div className="absolute top-20 -left-10 w-2 h-2 rounded-full bg-primary opacity-50 animate-pulse [animation-delay:1s]" />
              <div className="absolute -top-2 right-8 w-2 h-2 rounded-full bg-accent opacity-40 animate-pulse [animation-delay:1.5s]" />
              <div className="absolute bottom-16 -right-8 w-3 h-3 rounded-full bg-primary opacity-50 animate-pulse [animation-delay:2s]" />
            </div>
          </SlideIn>
        </div>
      </section>

      {/* ─── Bento Grid ─── */}
      <section className="max-w-5xl mx-auto px-6">
        <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-4" staggerDelay={0.07}>
          {/* ─ Row 1 ─ */}

          {/* Card: Location + Cat */}
          <StaggerItem variant="scale">
            <BentoCard className="flex flex-col items-center text-center gap-3">
              <CatIllustration className="w-24 h-24" />
              <p className="text-muted-foreground text-sm leading-relaxed">
                Hello, fellow human! I'm based in <span className="text-foreground font-medium">{siteConfig.location}</span>.
              </p>
            </BentoCard>
          </StaggerItem>

          {/* Card: Music lover */}
          <StaggerItem variant="scale">
            <BentoCard className="flex flex-col items-center justify-center text-center gap-3">
              <div className="text-5xl">🎧</div>
              <p className="text-muted-foreground text-sm leading-relaxed">
                I code with <span className="text-primary font-semibold">music</span> on. Lo-fi, rock, or whatever matches the bug I'm debugging.
              </p>
              <div className="flex gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Headphones key={i} size={14} className={i < 4 ? "text-primary" : "text-muted-foreground"} />
                ))}
              </div>
            </BentoCard>
          </StaggerItem>

          {/* Card: Backend & Cloud */}
          <StaggerItem variant="scale">
            <BentoCard className="flex flex-col items-center justify-center text-center gap-4">
              <div className="flex gap-3 text-accent">
                <Server size={28} />
                <Cloud size={28} />
              </div>
              <p className="text-muted-foreground text-sm">
                I specialize in <span className="text-primary font-semibold">backend development</span> and <span className="text-primary font-semibold">cloud infrastructure</span>.
              </p>
              <p className="text-muted-foreground text-xs">AWS · Docker · Kubernetes · Microservices</p>
            </BentoCard>
          </StaggerItem>

          {/* ─ Row 2 ─ */}

          {/* Card: Where I live */}
          <StaggerItem variant="scale">
            <BentoCard className="flex flex-col gap-3">
              <div className="flex items-center gap-2 text-warm">
                <MapPin size={16} />
                <span className="text-xs font-semibold uppercase tracking-wider">Based in</span>
              </div>
              <h3 className="text-foreground text-lg font-bold">
                {siteConfig.location} {siteConfig.locationEmoji}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">Building software, exploring new cities, and always looking for the next adventure.</p>
            </BentoCard>
          </StaggerItem>

          {/* Card: Years of experience */}
          <StaggerItem variant="scale">
            <BentoCard className="flex flex-col items-center justify-center text-center gap-2">
              <p className="text-muted-foreground text-sm">I've been coding for</p>
              <p className="text-3xl font-bold text-foreground">
                {new Date().getFullYear() - siteConfig.startYear}+ <span className="text-base font-normal text-muted-foreground">years.</span>
              </p>
              <p className="text-muted-foreground text-sm leading-relaxed">From startups to enterprise — it's been quite a ride. 🚀</p>
            </BentoCard>
          </StaggerItem>

          {/* Card: Bookshelf */}
          <StaggerItem variant="scale">
            <BentoCard className="flex flex-col items-center justify-center gap-3">
              <BookshelfIllustration className="w-32 h-20" />
              <p className="text-muted-foreground text-xs text-center">Avid reader. Always have a book on the go.</p>
            </BentoCard>
          </StaggerItem>

          {/* ─ Row 3 ─ */}

          {/* Card: Open source & GitHub */}
          <StaggerItem variant="scale">
            <BentoCard className="flex flex-col gap-4">
              <div className="flex gap-2">
                {["P", "y", "J", "S"].map((key) => (
                  <div key={key} className="w-9 h-9 rounded border border-border bg-secondary flex items-center justify-center text-foreground font-mono text-sm font-bold">
                    {key}
                  </div>
                ))}
              </div>
              <p className="text-muted-foreground text-sm leading-relaxed">
                I work across multiple languages and stacks daily — from <span className="text-accent font-semibold">Python</span> and <span className="text-primary font-semibold">Java</span> on the
                backend, to <span className="text-accent font-semibold">TypeScript</span> on the front.
              </p>
              <p className="text-muted-foreground text-sm">
                Check out my work on{" "}
                <a href={siteConfig.social.github} target="_blank" rel="noopener noreferrer" className="text-accent hover:underline underline decoration-dotted">
                  GitHub
                </a>
                .
              </p>
            </BentoCard>
          </StaggerItem>

          {/* Card: Workspace */}
          <StaggerItem variant="scale">
            <BentoCard className="flex flex-col items-center justify-center gap-3">
              <WorkspaceIllustration className="w-full max-w-[200px] h-auto" />
              <p className="text-muted-foreground text-xs text-center">
                Clean desk, dual monitors, and a <span className="text-accent">terminal always open</span>.
              </p>
            </BentoCard>
          </StaggerItem>

          {/* Card: Scalable systems */}
          <StaggerItem variant="scale">
            <BentoCard className="flex flex-col gap-3">
              <div className="flex items-center gap-2 text-accent">
                <Zap size={16} />
                <span className="text-xs font-semibold uppercase tracking-wider">Scalable Systems</span>
              </div>
              <p className="text-muted-foreground text-sm leading-relaxed">I love designing systems that handle scale gracefully — from microservices architectures to event-driven pipelines.</p>
              <p className="text-muted-foreground text-sm leading-relaxed">There's something deeply satisfying about a well-orchestrated distributed system.</p>
            </BentoCard>
          </StaggerItem>

          {/* ─ Row 4 ─ */}

          {/* Card: Pet lover */}
          <StaggerItem variant="scale">
            <BentoCard className="flex flex-col items-center text-center gap-3">
              <div className="flex gap-3 items-end">
                <CatIllustration className="w-12 h-12" />
                <DogIllustration className="w-14 h-14" />
              </div>
              <p className="text-muted-foreground text-sm leading-relaxed">
                I love cats and dogs. I have a cat at home named <span className="text-primary font-semibold">Tommy</span> 🐱
              </p>
              <p className="text-muted-foreground text-sm leading-relaxed">He stays with my sister most of the time — they're best friends.</p>
            </BentoCard>
          </StaggerItem>

          {/* Card: Global Experience */}
          <StaggerItem variant="scale">
            <BentoCard className="flex flex-col gap-3">
              <SpeakerIllustration className="w-full max-w-[140px] mx-auto h-auto" />
              <p className="text-muted-foreground text-sm leading-relaxed">I've worked with teams across the globe — from Southeast Asia to North America.</p>
              <ul className="space-y-1.5">
                {workExperiences.slice(0, 4).map((job) => (
                  <li key={job.company} className="flex items-center gap-2 text-sm">
                    <ArrowRight size={12} className="text-primary shrink-0" />
                    <span className="text-foreground">{job.company}</span>
                    <span className="text-muted-foreground text-xs ml-auto">
                      {job.from}–{job.to}
                    </span>
                  </li>
                ))}
              </ul>
            </BentoCard>
          </StaggerItem>

          {/* Card: Languages I speak */}
          <StaggerItem variant="scale">
            <BentoCard className="flex flex-col items-center justify-center gap-3">
              <LanguagesIllustration className="w-full max-w-[200px] h-auto" />
              <p className="text-muted-foreground text-sm text-center leading-relaxed">
                I speak <span className="text-primary font-semibold">4 languages</span> — Bengali, English, Indonesian &amp; Ruáingga.
              </p>
              <div className="flex flex-wrap justify-center gap-1.5">
                {["বাংলা", "English", "Bahasa", "Ruáingga"].map((lang) => {
                  const data = languagesByLabel[lang];
                  return (
                    <button
                      key={lang}
                      onClick={() => setActiveHumanLang(lang)}
                      className="group/lang text-xs bg-secondary border border-border rounded px-2 py-0.5 text-muted-foreground hover:text-foreground transition-all duration-200 cursor-pointer"
                      style={{ ["--chip-color" as string]: data?.color }}
                      onMouseEnter={(e) => {
                        if (data) {
                          e.currentTarget.style.borderColor = `${data.color}60`;
                          e.currentTarget.style.backgroundColor = `${data.color}10`;
                          e.currentTarget.style.color = data.color;
                        }
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.borderColor = "";
                        e.currentTarget.style.backgroundColor = "";
                        e.currentTarget.style.color = "";
                      }}
                    >
                      <span className="flex items-center gap-1">{lang}</span>
                    </button>
                  );
                })}
              </div>
              <p className="text-muted-foreground text-[10px] mt-2 flex items-center gap-1">
                <Sparkles size={10} className="animate-pulse" />
                Click a language to hear how it sounds
              </p>
            </BentoCard>
          </StaggerItem>

          {/* Card: Always learning */}
          <StaggerItem variant="scale">
            <BentoCard className="flex flex-col gap-3">
              <div className="flex items-center gap-2 text-primary">
                <BookOpen size={16} />
                <span className="text-xs font-semibold uppercase tracking-wider">Always Learning</span>
              </div>
              <p className="text-muted-foreground text-sm leading-relaxed">
                I believe the best engineers never stop learning. Whether it's a new language, a cloud service, or an architectural pattern — I'm always exploring.
              </p>
              <p className="text-muted-foreground text-sm leading-relaxed">This blog is where I share the things I learn along the way. If something helped me, it might help you too. ✨</p>
              <div className="flex flex-wrap gap-1.5 pt-1">
                {siteConfig.skills.slice(0, 8).map((skill) => {
                  const hasSnippet = !!snippetsByLabel[skill.name];
                  return hasSnippet ? (
                    <button
                      key={skill.name}
                      onClick={() => setActiveLang(skill.name)}
                      className="group/chip text-xs bg-secondary border border-border rounded px-2 py-0.5 text-muted-foreground hover:border-primary/60 hover:text-primary hover:bg-primary/5 transition-all duration-200 cursor-pointer"
                    >
                      <span className="flex items-center gap-1">{skill.name}</span>
                    </button>
                  ) : (
                    <span key={skill.name} className="text-xs bg-secondary border border-border rounded px-2 py-0.5 text-muted-foreground">
                      {skill.name}
                    </span>
                  );
                })}
              </div>
            </BentoCard>
          </StaggerItem>
        </StaggerContainer>
      </section>

      {/* ─── Social Links ─── */}
      <section className="max-w-5xl mx-auto px-6 mt-20">
        <FadeIn>
          <div className="flex items-center gap-4 mb-2">
            <h2 className="text-primary uppercase tracking-[0.2em] text-xs font-bold whitespace-nowrap">Find me online</h2>
            <div className="flex-1 h-px bg-border" />
          </div>
          <p className="text-muted-foreground text-sm mb-6">I'm active across these platforms — feel free to connect.</p>
        </FadeIn>
        <SocialLinks />
      </section>

      {/* ─── Contact CTA ─── */}
      <section className="max-w-5xl mx-auto px-6 mt-20">
        <FadeIn>
          <ContactCTA />
        </FadeIn>
      </section>

      {/* ── Code Terminal Modal (portal) ── */}
      {activeLang && createPortal(<CodeTerminalModal key={activeLang} activeLang={activeLang} onClose={handleClose} />, document.body)}

      {/* ── Language Card Modal ── */}
      {activeHumanLang && <LanguageCardModal key={activeHumanLang} language={activeHumanLang} onClose={handleHumanLangClose} />}
    </main>
  );
}
