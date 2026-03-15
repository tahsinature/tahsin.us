import { useState, useMemo } from "react";
import { GitPullRequest, MessageSquare, AlertCircle, HelpCircle, FileText, Mic, Eye, Code2, Github, Globe, Star, ChevronDown } from "lucide-react";
import { contributions, contributionTags, tagLabels, tagColors, projects, projectTagLabels, projectTagColors, type ContributionTag, type Contribution, type Project } from "@/data/contributions";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";
import { FadeIn, StaggerContainer, StaggerItem, motion } from "@/components/MotionWrapper";
import { PAGE_PADDING } from "@/config/layout";
import { AnimatePresence } from "motion/react";

/* ── Icon map for tags ── */
const tagIcons: Record<ContributionTag, React.ReactNode> = {
  "pull-request": <GitPullRequest size={14} />,
  comment: <MessageSquare size={14} />,
  issue: <AlertCircle size={14} />,
  answer: <HelpCircle size={14} />,
  "blog-post": <FileText size={14} />,
  talk: <Mic size={14} />,
  review: <Eye size={14} />,
  "open-source": <Code2 size={14} />,
};

/* ── Helpers ── */
function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

function relativeDate(iso: string): string {
  const now = new Date();
  const d = new Date(iso);
  const diff = Math.floor((now.getTime() - d.getTime()) / 86_400_000);
  if (diff === 0) return "today";
  if (diff === 1) return "yesterday";
  if (diff < 30) return `${diff}d ago`;
  if (diff < 365) return `${Math.floor(diff / 30)}mo ago`;
  return `${Math.floor(diff / 365)}y ago`;
}

/* ── Contribution row (minimal) ── */
function ContributionCard({ c, isLast }: { c: Contribution; isLast: boolean }) {
  return (
    <div className="relative flex gap-3 group">
      {/* Timeline dot + connector */}
      <div className="flex flex-col items-center pt-2">
        <div
          className={`
            w-2 h-2 rounded-full shrink-0 ring-2 ring-background
            ${c.tag === "pull-request" ? "bg-accent" : ""}
            ${c.tag === "comment" ? "bg-accent" : ""}
            ${c.tag === "issue" ? "bg-warm" : ""}
            ${c.tag === "answer" ? "bg-primary" : ""}
            ${c.tag === "blog-post" ? "bg-primary" : ""}
            ${c.tag === "talk" ? "bg-warm" : ""}
            ${c.tag === "review" ? "bg-accent" : ""}
            ${c.tag === "open-source" ? "bg-accent" : ""}
          `}
        />
        {!isLast && <div className="w-px flex-1 bg-border/40 mt-1" />}
      </div>

      {/* Row content */}
      <div className="flex-1 pb-4 flex flex-wrap items-baseline gap-x-2 gap-y-0.5 min-w-0">
        <a href={c.url} target="_blank" rel="noopener noreferrer" className="text-foreground text-sm font-medium hover:text-primary transition-colors truncate max-w-full">
          {c.title}
        </a>
        <span className="flex items-center gap-1.5 shrink-0">
          <span className={`inline-flex items-center gap-1 text-[10px] font-medium px-1.5 py-px rounded-full border ${tagColors[c.tag]}`}>
            {tagIcons[c.tag]}
            {tagLabels[c.tag]}
          </span>
          {c.repo && <span className="text-muted-foreground text-[11px] font-mono">{c.repo}</span>}
          <span className="text-muted-foreground text-[11px] tabular-nums" title={formatDate(c.date)}>
            {relativeDate(c.date)}
          </span>
        </span>
      </div>
    </div>
  );
}

/* ── Project card ── */
function ProjectCard({ project }: { project: Project }) {
  const [expanded, setExpanded] = useState(false);
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      className="group bg-card border border-border rounded-xl overflow-hidden h-full"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      animate={hovered
        ? { borderColor: "var(--color-primary)", boxShadow: "0 8px 30px rgba(0,0,0,0.18)" }
        : { borderColor: "var(--color-border)", boxShadow: "0 0 0 rgba(0,0,0,0)" }
      }
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      {/* Screenshot */}
      {project.screenshot && (
        <div className="relative overflow-hidden h-48 md:h-56">
          <motion.img
            src={project.screenshot}
            alt={`${project.title} screenshot`}
            className="absolute inset-0 w-full h-full object-cover object-top"
            loading="lazy"
            animate={{ scale: hovered ? 1.05 : 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-card/90 via-transparent to-transparent" />
        </div>
      )}

      <div className="p-5 md:p-6">
        {/* Top row: tag + period */}
        <div className="flex items-center gap-2 mb-3">
          <span className={`text-xs font-medium px-2.5 py-0.5 rounded-full border ${projectTagColors[project.tag]}`}>{projectTagLabels[project.tag]}</span>
          {project.featured && (
            <span className="inline-flex items-center gap-1 text-xs font-medium px-2 py-0.5 rounded-full bg-primary/15 text-primary border border-primary/30">
              <Star size={10} fill="currentColor" />
              Featured
            </span>
          )}
          {project.period && <span className="ml-auto text-muted-foreground text-xs tabular-nums">{project.period}</span>}
        </div>

        {/* Title */}
        <h3 className="text-foreground font-bold text-lg mb-2 leading-tight">{project.title}</h3>

        {/* Description */}
        <p className="text-muted-foreground text-sm leading-relaxed mb-3">{project.description}</p>

        {/* Expandable writeup */}
        {project.writeup && (
          <>
            <AnimatePresence>
              {expanded && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <p className="text-muted-foreground text-sm leading-relaxed mb-3 border-l-2 border-primary/30 pl-3">{project.writeup}</p>
                </motion.div>
              )}
            </AnimatePresence>
            <button onClick={() => setExpanded(!expanded)} className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-primary transition-colors mb-3">
              {expanded ? "Show less" : "Read more"}
              <motion.span animate={{ rotate: expanded ? 180 : 0 }} transition={{ duration: 0.2 }}>
                <ChevronDown size={12} />
              </motion.span>
            </button>
          </>
        )}

        {/* Tech stack */}
        {project.techStack && project.techStack.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-4">
            {project.techStack.map((tech) => (
              <span key={tech} className="text-xs bg-secondary border border-border rounded px-2 py-0.5 text-muted-foreground">
                {tech}
              </span>
            ))}
          </div>
        )}

        {/* Links */}
        <div className="flex items-center gap-3">
          {project.repoUrl && (
            <a
              href={project.repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground
                         hover:text-foreground transition-colors"
            >
              <Github size={14} />
              Source
            </a>
          )}
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground
                         hover:text-foreground transition-colors"
            >
              <Globe size={14} />
              Live
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
}

/* ── Page ── */
export default function ContributionsPage() {
  useDocumentTitle("Contributions");
  const [activeTag, setActiveTag] = useState<ContributionTag | null>(null);

  /* Only show tags that have at least 1 entry */
  const availableTags = useMemo(() => contributionTags.filter((tag) => contributions.some((c) => c.tag === tag)), []);

  const filtered = useMemo(() => (activeTag ? contributions.filter((c) => c.tag === activeTag) : contributions), [activeTag]);

  /* Group by year */
  const grouped = useMemo(() => {
    const map = new Map<number, Contribution[]>();
    for (const c of filtered) {
      const year = new Date(c.date).getFullYear();
      if (!map.has(year)) map.set(year, []);
      map.get(year)!.push(c);
    }
    return Array.from(map.entries()).sort(([a], [b]) => b - a);
  }, [filtered]);

  return (
    <main className="pb-20">
      {/* ─── Hero ─── */}
      <section className={`max-w-5xl mx-auto ${PAGE_PADDING} pb-10`}>
        <FadeIn>
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-3">Community &amp; Work</h1>
        </FadeIn>
        <FadeIn delay={0.1}>
          <p className="text-muted-foreground max-w-2xl leading-relaxed text-base md:text-lg">Projects I've built, open-source work I've contributed to, and a running log of community interactions.</p>
        </FadeIn>
      </section>

      {/* Featured Projects / Works */}
      {projects.length > 0 && (
        <section className={`max-w-5xl mx-auto ${PAGE_PADDING} mb-16`}>
          <FadeIn>
            <div className="flex items-center gap-3 mb-8">
              <h2 className="text-primary uppercase tracking-[0.2em] text-xs font-bold">Projects &amp; Works</h2>
              <div className="flex-1 h-px bg-border" />
              <span className="text-muted-foreground text-xs">
                {projects.length} project{projects.length !== 1 ? "s" : ""}
              </span>
            </div>
          </FadeIn>

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-5" staggerDelay={0.1}>
            {projects.map((p) => (
              <StaggerItem key={p.id} variant="scale" className={p.featured ? "md:col-span-2" : ""}>
                <ProjectCard project={p} />
              </StaggerItem>
            ))}
          </StaggerContainer>
        </section>
      )}

      {/* Activity Log */}
      <section className={`max-w-4xl mx-auto ${PAGE_PADDING}`}>
        <FadeIn>
          <div className="flex items-center gap-3 mb-8">
            <h2 className="text-primary uppercase tracking-[0.2em] text-xs font-bold">Activity Log</h2>
            <div className="flex-1 h-px bg-border" />
          </div>
        </FadeIn>

        <FadeIn delay={0.1}>
          <p className="text-muted-foreground text-sm leading-relaxed mb-8 max-w-2xl">Pull requests, code reviews, bug reports, answers, and other community interactions.</p>
        </FadeIn>

        {/* Filters */}
        <FadeIn delay={0.15}>
          <div className="flex flex-wrap gap-2 mb-10">
            <motion.button
              onClick={() => setActiveTag(null)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-all ${
                activeTag === null ? "bg-primary/15 border-primary/40 text-primary" : "bg-secondary border-border text-secondary-foreground hover:text-foreground hover:border-primary/30"
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              All
              <span className="ml-1.5 text-muted-foreground">{contributions.length}</span>
            </motion.button>
            {availableTags.map((tag) => {
              const count = contributions.filter((c) => c.tag === tag).length;
              return (
                <motion.button
                  key={tag}
                  onClick={() => setActiveTag(activeTag === tag ? null : tag)}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium border transition-all ${
                    activeTag === tag ? tagColors[tag] : "bg-secondary border-border text-secondary-foreground hover:text-foreground hover:border-primary/30"
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {tagIcons[tag]}
                  {tagLabels[tag]}
                  <span className="text-muted-foreground">{count}</span>
                </motion.button>
              );
            })}
          </div>
        </FadeIn>

        {/* Timeline feed */}
        {grouped.length === 0 ? (
          <p className="text-muted-foreground py-16 text-center text-sm">No contributions found.</p>
        ) : (
          grouped.map(([year, items]) => (
            <FadeIn key={year}>
              <div className="mb-10">
                {/* Year header */}
                <div className="flex items-center gap-3 mb-6">
                  <span className="text-foreground font-bold text-lg tabular-nums">{year}</span>
                  <div className="flex-1 h-px bg-border" />
                  <span className="text-muted-foreground text-xs">
                    {items.length} contribution{items.length !== 1 ? "s" : ""}
                  </span>
                </div>

                {/* Cards */}
                <div className="ml-1">
                  {items.map((c, i) => (
                    <motion.div
                      key={c.id}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, margin: "-20px" }}
                      transition={{ duration: 0.3, delay: i * 0.03 }}
                    >
                      <ContributionCard c={c} isLast={i === items.length - 1} />
                    </motion.div>
                  ))}
                </div>
              </div>
            </FadeIn>
          ))
        )}
      </section>
    </main>
  );
}
