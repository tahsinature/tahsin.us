import { useState, useMemo } from "react";
import { GitPullRequest, MessageSquare, AlertCircle, HelpCircle, FileText, Mic, Eye, Code2, Github, Globe, Star, ChevronDown } from "lucide-react";
import { contributions, contributionTags, tagLabels, tagColors, projects, projectTagLabels, projectTagColors, type ContributionTag, type Contribution, type Project } from "@/data/contributions";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";

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
            w-2 h-2 rounded-full shrink-0 ring-2 ring-bg-primary
            ${c.tag === "pull-request" ? "bg-accent-green" : ""}
            ${c.tag === "comment" ? "bg-accent-blue" : ""}
            ${c.tag === "issue" ? "bg-accent-pink" : ""}
            ${c.tag === "answer" ? "bg-accent-yellow" : ""}
            ${c.tag === "blog-post" ? "bg-accent-purple" : ""}
            ${c.tag === "talk" ? "bg-accent-pink" : ""}
            ${c.tag === "review" ? "bg-accent-blue" : ""}
            ${c.tag === "open-source" ? "bg-accent-green" : ""}
          `}
        />
        {!isLast && <div className="w-px flex-1 bg-border/40 mt-1" />}
      </div>

      {/* Row content */}
      <div className="flex-1 pb-4 flex flex-wrap items-baseline gap-x-2 gap-y-0.5 min-w-0">
        <a href={c.url} target="_blank" rel="noopener noreferrer" className="text-text-primary text-sm font-medium hover:text-accent-yellow transition-colors truncate max-w-full">
          {c.title}
        </a>
        <span className="flex items-center gap-1.5 shrink-0">
          <span className={`inline-flex items-center gap-1 text-[10px] font-medium px-1.5 py-px rounded-full border ${tagColors[c.tag]}`}>
            {tagIcons[c.tag]}
            {tagLabels[c.tag]}
          </span>
          {c.repo && <span className="text-text-muted text-[11px] font-mono">{c.repo}</span>}
          <span className="text-text-muted text-[11px] tabular-nums" title={formatDate(c.date)}>
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

  return (
    <div
      className={`
        group bg-bg-card border border-border rounded-xl overflow-hidden
        transition-all duration-300 hover:border-accent-yellow/30 hover:-translate-y-1
        hover:shadow-[0_8px_30px_rgba(0,0,0,0.18)]
        ${project.featured ? "md:col-span-2" : ""}
      `}
    >
      {/* Screenshot */}
      {project.screenshot && (
        <div className="relative overflow-hidden">
          <img
            src={project.screenshot}
            alt={`${project.title} screenshot`}
            className="w-full h-48 md:h-56 object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-bg-card/90 via-transparent to-transparent" />
        </div>
      )}

      <div className="p-5 md:p-6">
        {/* Top row: tag + period */}
        <div className="flex items-center gap-2 mb-3">
          <span className={`text-xs font-medium px-2.5 py-0.5 rounded-full border ${projectTagColors[project.tag]}`}>{projectTagLabels[project.tag]}</span>
          {project.featured && (
            <span className="inline-flex items-center gap-1 text-xs font-medium px-2 py-0.5 rounded-full bg-accent-yellow/15 text-accent-yellow border border-accent-yellow/30">
              <Star size={10} fill="currentColor" />
              Featured
            </span>
          )}
          {project.period && <span className="ml-auto text-text-muted text-xs tabular-nums">{project.period}</span>}
        </div>

        {/* Title */}
        <h3 className="text-text-primary font-bold text-lg mb-2 leading-tight">{project.title}</h3>

        {/* Description */}
        <p className="text-text-secondary text-sm leading-relaxed mb-3">{project.description}</p>

        {/* Expandable writeup */}
        {project.writeup && (
          <>
            <div className={`overflow-hidden transition-all duration-300 ${expanded ? "max-h-96 opacity-100" : "max-h-0 opacity-0"}`}>
              <p className="text-text-secondary text-sm leading-relaxed mb-3 border-l-2 border-accent-yellow/30 pl-3">{project.writeup}</p>
            </div>
            <button onClick={() => setExpanded(!expanded)} className="inline-flex items-center gap-1 text-xs text-text-muted hover:text-accent-yellow transition-colors mb-3">
              {expanded ? "Show less" : "Read more"}
              <ChevronDown size={12} className={`transition-transform duration-200 ${expanded ? "rotate-180" : ""}`} />
            </button>
          </>
        )}

        {/* Tech stack */}
        {project.techStack && project.techStack.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-4">
            {project.techStack.map((tech) => (
              <span key={tech} className="text-xs bg-bg-secondary border border-border rounded px-2 py-0.5 text-text-secondary">
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
              className="inline-flex items-center gap-1.5 text-xs font-medium text-text-secondary
                         hover:text-text-primary transition-colors"
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
              className="inline-flex items-center gap-1.5 text-xs font-medium text-text-secondary
                         hover:text-text-primary transition-colors"
            >
              <Globe size={14} />
              Live
            </a>
          )}
        </div>
      </div>
    </div>
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
      <section className="max-w-5xl mx-auto px-6 pt-16 pb-10 md:pt-24 md:pb-14">
        <h1 className="text-3xl md:text-4xl font-bold text-text-primary mb-3">Community &amp; Work</h1>
        <p className="text-text-secondary max-w-2xl leading-relaxed text-base md:text-lg">Projects I've built, open-source work I've contributed to, and a running log of community interactions.</p>
      </section>

      {/* ═══════════════════════════════════════════
       *  Featured Projects / Works
       * ═══════════════════════════════════════════ */}
      {projects.length > 0 && (
        <section className="max-w-5xl mx-auto px-6 mb-16">
          <div className="flex items-center gap-3 mb-8">
            <h2 className="text-accent-yellow uppercase tracking-[0.2em] text-xs font-bold">Projects &amp; Works</h2>
            <div className="flex-1 h-px bg-border" />
            <span className="text-text-muted text-xs">
              {projects.length} project{projects.length !== 1 ? "s" : ""}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {projects.map((p) => (
              <ProjectCard key={p.id} project={p} />
            ))}
          </div>
        </section>
      )}

      {/* ═══════════════════════════════════════════
       *  Activity Log (existing contributions timeline)
       * ═══════════════════════════════════════════ */}
      <section className="max-w-4xl mx-auto px-6">
        <div className="flex items-center gap-3 mb-8">
          <h2 className="text-accent-yellow uppercase tracking-[0.2em] text-xs font-bold">Activity Log</h2>
          <div className="flex-1 h-px bg-border" />
        </div>

        <p className="text-text-secondary text-sm leading-relaxed mb-8 max-w-2xl">Pull requests, code reviews, bug reports, answers, and other community interactions.</p>

        {/* Filters */}
        <div className="flex flex-wrap gap-2 mb-10">
          <button
            onClick={() => setActiveTag(null)}
            className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-all ${
              activeTag === null ? "bg-accent-yellow/15 border-accent-yellow/40 text-accent-yellow" : "bg-tag-bg border-border text-tag-text hover:text-text-primary hover:border-accent-yellow/30"
            }`}
          >
            All
            <span className="ml-1.5 text-text-muted">{contributions.length}</span>
          </button>
          {availableTags.map((tag) => {
            const count = contributions.filter((c) => c.tag === tag).length;
            return (
              <button
                key={tag}
                onClick={() => setActiveTag(activeTag === tag ? null : tag)}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium border transition-all ${
                  activeTag === tag ? tagColors[tag] : "bg-tag-bg border-border text-tag-text hover:text-text-primary hover:border-accent-yellow/30"
                }`}
              >
                {tagIcons[tag]}
                {tagLabels[tag]}
                <span className="text-text-muted">{count}</span>
              </button>
            );
          })}
        </div>

        {/* Timeline feed */}
        {grouped.length === 0 ? (
          <p className="text-text-muted py-16 text-center text-sm">No contributions found.</p>
        ) : (
          grouped.map(([year, items]) => (
            <div key={year} className="mb-10">
              {/* Year header */}
              <div className="flex items-center gap-3 mb-6">
                <span className="text-text-primary font-bold text-lg tabular-nums">{year}</span>
                <div className="flex-1 h-px bg-border" />
                <span className="text-text-muted text-xs">
                  {items.length} contribution{items.length !== 1 ? "s" : ""}
                </span>
              </div>

              {/* Cards */}
              <div className="ml-1">
                {items.map((c, i) => (
                  <ContributionCard key={c.id} c={c} isLast={i === items.length - 1} />
                ))}
              </div>
            </div>
          ))
        )}
      </section>
    </main>
  );
}
