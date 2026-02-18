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
            <h1 className="text-4xl md:text-5xl font-bold text-text-primary leading-tight italic">Hi there! I'm {siteConfig.name.first}.</h1>
            <p className="text-text-secondary leading-relaxed text-base md:text-lg">{siteConfig.bio}</p>
            <p className="text-text-secondary leading-relaxed text-base md:text-lg">
              I've worked at organizations like{" "}
              {workExperiences.slice(0, 3).map((job, i) => (
                <span key={job.company}>
                  {i > 0 && (i === 2 ? ", and " : ", ")}
                  {job.url ? (
                    <a href={job.url} target="_blank" rel="noopener noreferrer" className="text-accent-blue hover:underline">
                      {job.company}
                    </a>
                  ) : (
                    job.company
                  )}
                </span>
              ))}
              .
            </p>
            <p className="text-text-secondary leading-relaxed text-base md:text-lg">{siteConfig.bioExtended}</p>
          </div>

          {/* Character illustration — reuse the SVG style from the HeroBanner */}
          <div className="hidden md:flex justify-center">
            <div className="relative">
              <svg viewBox="0 0 200 260" width="280" xmlns="http://www.w3.org/2000/svg" aria-label={`${siteConfig.name.first} illustration`}>
                {/* Shadow */}
                <ellipse cx="100" cy="248" rx="60" ry="8" fill="#0a0c18" opacity="0.3" />
                {/* Legs */}
                <rect x="78" y="190" width="16" height="50" rx="6" fill="#1a1a2e" />
                <rect x="106" y="190" width="16" height="50" rx="6" fill="#1a1a2e" />
                {/* Shoes */}
                <ellipse cx="86" cy="242" rx="12" ry="5" fill="#e8e8e8" />
                <ellipse cx="114" cy="242" rx="12" ry="5" fill="#e8e8e8" />
                {/* Body / hoodie */}
                <path
                  d="M68,110 C65,140 64,170 68,195 C72,200 86,204 100,204 C114,204 128,200 132,195
                     C136,170 135,140 132,110 C125,98 112,92 100,92 C88,92 75,98 68,110Z"
                  fill="#e8a830"
                />
                {/* Hoodie panel */}
                <path
                  d="M80,115 C78,140 78,170 80,192 C84,198 92,200 100,200 C108,200 116,198 120,192
                     C122,170 122,140 120,115 C114,108 108,104 100,104 C92,104 86,108 80,115Z"
                  fill="#d4d4d8"
                />
                {/* Pocket */}
                <path d="M88,160 C90,153 110,153 112,160 C112,172 110,178 100,178 C90,178 88,172 88,160Z" fill="#c8c8cc" opacity="0.5" />
                {/* Arms */}
                <path d="M68,118 C56,132 52,155 58,175" fill="none" stroke="#e8a830" strokeWidth="12" strokeLinecap="round" />
                <path d="M132,118 C144,132 148,155 142,175" fill="none" stroke="#e8a830" strokeWidth="12" strokeLinecap="round" />
                {/* Hands */}
                <circle cx="58" cy="178" r="8" fill="#f0c8a0" />
                <circle cx="142" cy="178" r="8" fill="#f0c8a0" />
                {/* Neck */}
                <rect x="92" y="75" width="16" height="14" rx="5" fill="#f0c8a0" />
                {/* Head */}
                <ellipse cx="100" cy="55" rx="32" ry="35" fill="#f0c8a0" />
                {/* Hair */}
                <path
                  d="M68,48 C66,30 74,14 88,8 C94,6 104,5 112,8 C126,14 134,30 132,48
                     C133,38 128,22 116,14 C108,9 92,9 84,14 C74,22 68,36 68,48Z"
                  fill="#4a3520"
                />
                {/* Hair tufts */}
                <path d="M120,16 C128,6 136,12 130,24 C128,16 124,12 120,16Z" fill="#4a3520" />
                <path d="M72,24 C66,14 60,20 66,30 C66,24 70,20 72,24Z" fill="#4a3520" />
                {/* Side hair */}
                <path d="M68,48 C66,55 67,62 70,60 C70,55 69,50 68,48Z" fill="#4a3520" />
                <path d="M132,48 C134,55 133,62 130,60 C130,55 131,50 132,48Z" fill="#4a3520" />
                {/* Eyes */}
                <circle cx="86" cy="56" r="5" fill="#1a1a2e" />
                <circle cx="114" cy="56" r="5" fill="#1a1a2e" />
                <circle cx="87.5" cy="54.5" r="1.8" fill="#fff" opacity="0.7" />
                <circle cx="115.5" cy="54.5" r="1.8" fill="#fff" opacity="0.7" />
                {/* Mouth */}
                <path d="M92,68 Q100,74 108,68" fill="none" stroke="#1a1a2e" strokeWidth="2" strokeLinecap="round" />
                {/* Blush */}
                <ellipse cx="78" cy="64" rx="5" ry="3" fill="#e8a0a0" opacity="0.3" />
                <ellipse cx="122" cy="64" rx="5" ry="3" fill="#e8a0a0" opacity="0.3" />
              </svg>

              {/* Confetti dots around the illustration */}
              <div className="absolute -top-4 -left-8 w-3 h-3 rounded-full bg-accent-pink opacity-60" />
              <div className="absolute top-8 -right-6 w-2 h-2 rounded-full bg-accent-blue opacity-50" />
              <div className="absolute top-20 -left-10 w-2 h-2 rounded-full bg-accent-yellow opacity-50" />
              <div className="absolute -top-2 right-8 w-2 h-2 rounded-full bg-accent-green opacity-40" />
              <div className="absolute bottom-16 -right-8 w-3 h-3 rounded-full bg-accent-purple opacity-50" />
            </div>
          </div>
        </div>
      </section>

      {/* ─── Bento Grid ─── */}
      <section className="max-w-5xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* ─ Row 1 ─ */}

          {/* Card: Location + Cat */}
          <BentoCard className="flex flex-col items-center text-center gap-3">
            <CatIllustration className="w-24 h-24" />
            <p className="text-text-secondary text-sm leading-relaxed">
              Hello, fellow human! I'm based in <span className="text-text-primary font-medium">{siteConfig.location}</span>.
            </p>
          </BentoCard>

          {/* Card: Music lover */}
          <BentoCard className="flex flex-col items-center justify-center text-center gap-3">
            <div className="text-5xl">🎧</div>
            <p className="text-text-secondary text-sm leading-relaxed">
              I code with <span className="text-accent-yellow font-semibold">music</span> on. Lo-fi, rock, or whatever matches the bug I'm debugging.
            </p>
            <div className="flex gap-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <Headphones key={i} size={14} className={i < 4 ? "text-accent-yellow" : "text-text-muted"} />
              ))}
            </div>
          </BentoCard>

          {/* Card: Backend & Cloud */}
          <BentoCard className="flex flex-col items-center justify-center text-center gap-4">
            <div className="flex gap-3 text-accent-blue">
              <Server size={28} />
              <Cloud size={28} />
            </div>
            <p className="text-text-secondary text-sm">
              I specialize in <span className="text-accent-yellow font-semibold">backend development</span> and <span className="text-accent-yellow font-semibold">cloud infrastructure</span>.
            </p>
            <p className="text-text-muted text-xs">AWS · Docker · Kubernetes · Microservices</p>
          </BentoCard>

          {/* ─ Row 2 ─ */}

          {/* Card: Where I live */}
          <BentoCard className="flex flex-col gap-3">
            <div className="flex items-center gap-2 text-accent-pink">
              <MapPin size={16} />
              <span className="text-xs font-semibold uppercase tracking-wider">Based in</span>
            </div>
            <h3 className="text-text-primary text-lg font-bold">
              {siteConfig.location} {siteConfig.locationEmoji}
            </h3>
            <p className="text-text-secondary text-sm leading-relaxed">Building software, exploring new cities, and always looking for the next adventure.</p>
          </BentoCard>

          {/* Card: Years of experience */}
          <BentoCard className="flex flex-col items-center justify-center text-center gap-2">
            <p className="text-text-secondary text-sm">I've been coding for</p>
            <p className="text-3xl font-bold text-text-primary">
              {new Date().getFullYear() - siteConfig.startYear}+ <span className="text-base font-normal text-text-muted">years.</span>
            </p>
            <p className="text-text-secondary text-sm leading-relaxed">From startups to enterprise — it's been quite a ride. 🚀</p>
          </BentoCard>

          {/* Card: Bookshelf */}
          <BentoCard className="flex flex-col items-center justify-center gap-3">
            <BookshelfIllustration className="w-32 h-20" />
            <p className="text-text-secondary text-xs text-center">Avid reader. Always have a book on the go.</p>
          </BentoCard>

          {/* ─ Row 3 ─ */}

          {/* Card: Open source & GitHub */}
          <BentoCard className="flex flex-col gap-4">
            <div className="flex gap-2">
              {["P", "y", "J", "S"].map((key) => (
                <div key={key} className="w-9 h-9 rounded border border-border bg-bg-secondary flex items-center justify-center text-text-primary font-mono text-sm font-bold">
                  {key}
                </div>
              ))}
            </div>
            <p className="text-text-secondary text-sm leading-relaxed">
              I work across multiple languages and stacks daily — from <span className="text-accent-blue font-semibold">Python</span> and <span className="text-accent-yellow font-semibold">Java</span>{" "}
              on the backend, to <span className="text-accent-green font-semibold">TypeScript</span> on the front.
            </p>
            <p className="text-text-secondary text-sm">
              Check out my work on{" "}
              <a href={siteConfig.social.github} target="_blank" rel="noopener noreferrer" className="text-accent-blue hover:underline underline decoration-dotted">
                GitHub
              </a>
              .
            </p>
          </BentoCard>

          {/* Card: Workspace */}
          <BentoCard className="flex flex-col items-center justify-center gap-3">
            <WorkspaceIllustration className="w-full max-w-[200px] h-auto" />
            <p className="text-text-muted text-xs text-center">
              Clean desk, dual monitors, and a <span className="text-accent-blue">terminal always open</span>.
            </p>
          </BentoCard>

          {/* Card: Scalable systems */}
          <BentoCard className="flex flex-col gap-3">
            <div className="flex items-center gap-2 text-accent-green">
              <Zap size={16} />
              <span className="text-xs font-semibold uppercase tracking-wider">Scalable Systems</span>
            </div>
            <p className="text-text-secondary text-sm leading-relaxed">I love designing systems that handle scale gracefully — from microservices architectures to event-driven pipelines.</p>
            <p className="text-text-secondary text-sm leading-relaxed">There's something deeply satisfying about a well-orchestrated distributed system.</p>
          </BentoCard>

          {/* ─ Row 4 ─ */}

          {/* Card: Pet lover */}
          <BentoCard className="flex flex-col items-center text-center gap-3">
            <div className="flex gap-3 items-end">
              <CatIllustration className="w-12 h-12" />
              <DogIllustration className="w-14 h-14" />
            </div>
            <p className="text-text-secondary text-sm leading-relaxed">
              I love cats and dogs. I have a cat at home named <span className="text-accent-yellow font-semibold">Tommy</span> 🐱
            </p>
            <p className="text-text-secondary text-sm leading-relaxed">He stays with my sister most of the time — they're best friends.</p>
          </BentoCard>

          {/* Card: Global Experience */}
          <BentoCard className="flex flex-col gap-3">
            <SpeakerIllustration className="w-full max-w-[140px] mx-auto h-auto" />
            <p className="text-text-secondary text-sm leading-relaxed">I've worked with teams across the globe — from Southeast Asia to North America.</p>
            <ul className="space-y-1.5">
              {workExperiences.slice(0, 4).map((job) => (
                <li key={job.company} className="flex items-center gap-2 text-sm">
                  <ArrowRight size={12} className="text-accent-yellow shrink-0" />
                  <span className="text-text-primary">{job.company}</span>
                  <span className="text-text-muted text-xs ml-auto">
                    {job.from}–{job.to}
                  </span>
                </li>
              ))}
            </ul>
          </BentoCard>

          {/* Card: Languages I speak */}
          <BentoCard className="flex flex-col items-center justify-center gap-3">
            <LanguagesIllustration className="w-full max-w-[200px] h-auto" />
            <p className="text-text-secondary text-sm text-center leading-relaxed">
              I speak <span className="text-accent-yellow font-semibold">4 languages</span> — Bengali, English, Indonesian &amp; Ruáingga.
            </p>
            <div className="flex flex-wrap justify-center gap-1.5">
              {["বাংলা", "English", "Bahasa", "Ruáingga"].map((lang) => {
                const data = languagesByLabel[lang];
                return (
                  <button
                    key={lang}
                    onClick={() => setActiveHumanLang(lang)}
                    className="group/lang text-xs bg-bg-secondary border border-border rounded px-2 py-0.5 text-text-secondary hover:text-text-primary transition-all duration-200 cursor-pointer"
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
            <p className="text-text-muted text-[10px] mt-2 flex items-center gap-1">
              <Sparkles size={10} className="animate-pulse" />
              Click a language to hear how it sounds
            </p>
          </BentoCard>

          {/* Card: Always learning */}
          <BentoCard className="flex flex-col gap-3">
            <div className="flex items-center gap-2 text-accent-purple">
              <BookOpen size={16} />
              <span className="text-xs font-semibold uppercase tracking-wider">Always Learning</span>
            </div>
            <p className="text-text-secondary text-sm leading-relaxed">
              I believe the best engineers never stop learning. Whether it's a new language, a cloud service, or an architectural pattern — I'm always exploring.
            </p>
            <p className="text-text-secondary text-sm leading-relaxed">This blog is where I share the things I learn along the way. If something helped me, it might help you too. ✨</p>
            <div className="flex flex-wrap gap-1.5 pt-1">
              {siteConfig.skills.slice(0, 8).map((skill) => {
                const hasSnippet = !!snippetsByLabel[skill.name];
                return hasSnippet ? (
                  <button
                    key={skill.name}
                    onClick={() => setActiveLang(skill.name)}
                    className="group/chip text-xs bg-bg-secondary border border-border rounded px-2 py-0.5 text-text-secondary hover:border-accent-yellow/60 hover:text-accent-yellow hover:bg-accent-yellow/5 transition-all duration-200 cursor-pointer"
                  >
                    <span className="flex items-center gap-1">{skill.name}</span>
                  </button>
                ) : (
                  <span key={skill.name} className="text-xs bg-bg-secondary border border-border rounded px-2 py-0.5 text-text-secondary">
                    {skill.name}
                  </span>
                );
              })}
            </div>
          </BentoCard>
        </div>
      </section>

      {/* ─── Social Links ─── */}
      <section className="max-w-5xl mx-auto px-6 mt-20">
        <h2 className="flex items-center gap-2 text-accent-yellow uppercase tracking-[0.2em] text-xs font-bold mb-6">Find me online</h2>
        <SocialLinks />
      </section>

      {/* ─── Contact CTA ─── */}
      <section className="max-w-5xl mx-auto px-6 mt-20">
        <ContactCTA />
      </section>

      {/* ── Code Terminal Modal (portal) ── */}
      {activeLang && createPortal(<CodeTerminalModal key={activeLang} activeLang={activeLang} onClose={handleClose} />, document.body)}

      {/* ── Language Card Modal ── */}
      {activeHumanLang && <LanguageCardModal key={activeHumanLang} language={activeHumanLang} onClose={handleHumanLangClose} />}
    </main>
  );
}
