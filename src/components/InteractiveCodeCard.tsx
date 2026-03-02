import { useState, useEffect, useCallback, useRef } from "react";
import { createPortal } from "react-dom";
import { X, ChevronRight, Sparkles, RotateCcw } from "lucide-react";
import { codeToTokens, type ThemedToken, type BundledLanguage } from "shiki";
import { useThemeStore } from "@/stores/useThemeStore";
import { snippetsByLabel, type CodeSnippet } from "@/data/code-snippets";

// ── Shiki theme mapping ─────────────────────────────────────────
const SHIKI_THEMES = { dark: "github-dark-dimmed", light: "github-light" } as const;

// ── Types ───────────────────────────────────────────────────────
interface ColoredChar {
  char: string;
  color: string;
}

type Phase = "idle" | "loading" | "typing" | "running" | "done";
// ── Shiki helpers ───────────────────────────────────────────────
/** Flatten Shiki tokens into per-character color data. */
function tokensToChars(tokens: ThemedToken[][]): ColoredChar[] {
  const chars: ColoredChar[] = [];
  for (let i = 0; i < tokens.length; i++) {
    if (i > 0) chars.push({ char: "\n", color: "" });
    for (const token of tokens[i]) {
      const color = token.color ?? "";
      for (const ch of token.content) {
        chars.push({ char: ch, color });
      }
    }
  }
  return chars;
}

/** Group consecutive same-color characters for efficient rendering. */
function groupChars(chars: ColoredChar[]): Array<{ text: string; color: string }> {
  const groups: Array<{ text: string; color: string }> = [];
  for (const c of chars) {
    if (groups.length > 0 && groups[groups.length - 1].color === c.color) {
      groups[groups.length - 1].text += c.char;
    } else {
      groups.push({ text: c.char, color: c.color });
    }
  }
  return groups;
}

// ── Shiki highlight hook ────────────────────────────────────────
function useShikiHighlight(snippet: CodeSnippet | undefined, theme: string) {
  const [chars, setChars] = useState<ColoredChar[]>([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (!snippet) return;
    let cancelled = false;
    // Reset ready state before async work via rAF to avoid synchronous setState in effect
    requestAnimationFrame(() => {
      if (!cancelled) setReady(false);
    });

    const shikiTheme = SHIKI_THEMES[theme as keyof typeof SHIKI_THEMES] ?? SHIKI_THEMES.dark;

    codeToTokens(snippet.code, { lang: snippet.lang as BundledLanguage, theme: shikiTheme }).then(({ tokens }) => {
      if (cancelled) return;
      setChars(tokensToChars(tokens));
      setReady(true);
    });

    return () => {
      cancelled = true;
    };
  }, [snippet, theme]);

  return { chars, ready };
}

// ── Component ───────────────────────────────────────────────────
interface InteractiveCodeCardProps {
  items: { name: string }[];
  icon: React.ReactNode;
  title: string;
}

export default function InteractiveCodeCard({ items, icon, title }: InteractiveCodeCardProps) {
  const [activeLang, setActiveLang] = useState<string | null>(null);

  const selectLanguage = useCallback((lang: string) => {
    setActiveLang(lang);
  }, []);

  const handleClose = useCallback(() => {
    setActiveLang(null);
  }, []);

  return (
    <>
      {/* ── Card (always rendered at fixed size) ── */}
      <div className="bg-card border border-border rounded p-5 h-full">
        <div className="flex items-center gap-2 mb-4">
          {icon}
          <h3 className="text-foreground font-semibold text-sm">{title}</h3>
        </div>
        <div className="flex flex-wrap gap-2">
          {items.map((s) => {
            const hasSnippet = !!snippetsByLabel[s.name];
            return (
              <button
                key={s.name}
                onClick={hasSnippet ? () => selectLanguage(s.name) : undefined}
                className={`group/tag px-2.5 py-1 rounded-sm text-xs border transition-all duration-200
                  ${
                    hasSnippet
                      ? "bg-secondary text-secondary-foreground border-border hover:border-primary/60 hover:text-primary hover:bg-primary/5 cursor-pointer"
                      : "bg-secondary text-secondary-foreground border-border cursor-default"
                  }`}
              >
                <span className="flex items-center gap-1">{s.name}</span>
              </button>
            );
          })}
        </div>
        <p className="text-muted-foreground text-[10px] mt-3 flex items-center gap-1">
          <Sparkles size={10} className="animate-pulse" />
          Click a language to see it in action
        </p>
      </div>

      {/* ── Modal (portal) ── */}
      {activeLang && createPortal(<CodeTerminalModal key={activeLang} activeLang={activeLang} onClose={handleClose} />, document.body)}
    </>
  );
}

// ── Terminal Modal ──────────────────────────────────────────────
export interface CodeTerminalModalProps {
  activeLang: string;
  onClose: () => void;
}

export function CodeTerminalModal({ activeLang, onClose }: CodeTerminalModalProps) {
  const theme = useThemeStore((s) => s.theme);
  const snippet = snippetsByLabel[activeLang];

  const { chars: coloredChars, ready } = useShikiHighlight(snippet, theme);

  const [charIndex, setCharIndex] = useState(0);
  const [phase, setPhase] = useState<Phase>("loading");
  const [visibleOutputLines, setVisibleOutputLines] = useState(0);
  const [closing, setClosing] = useState(false);
  const typingRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const codeAreaRef = useRef<HTMLDivElement>(null);

  /* ── Start typing once Shiki is ready ── */
  useEffect(() => {
    if (ready && phase === "loading") {
      requestAnimationFrame(() => setPhase("typing"));
    }
  }, [ready, phase]);

  /* ── Animated close ── */
  const animatedClose = useCallback(() => {
    setClosing(true);
    setTimeout(onClose, 200);
  }, [onClose]);

  /* ── Replay ── */
  const replay = useCallback(() => {
    setCharIndex(0);
    setVisibleOutputLines(0);
    setPhase("loading");
    // ready is already true so next render will flip to "typing"
  }, []);

  /* ── Lock body scroll ── */
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, []);

  /* ── Escape key to close ── */
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") animatedClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [animatedClose]);

  /* ── Typing effect ── */
  useEffect(() => {
    if (phase !== "typing") return;
    if (charIndex >= coloredChars.length) {
      requestAnimationFrame(() => setPhase("running"));
      return;
    }

    const char = coloredChars[charIndex]?.char;
    const delay = char === "\n" ? 55 + Math.random() * 35 : char === " " ? 12 + Math.random() * 10 : 22 + Math.random() * 18;

    typingRef.current = setTimeout(() => {
      setCharIndex((i) => i + 1);
    }, delay);

    return () => {
      if (typingRef.current) clearTimeout(typingRef.current);
    };
  }, [phase, charIndex, coloredChars]);

  /* ── Auto-scroll code area during typing ── */
  useEffect(() => {
    if (phase === "typing" && codeAreaRef.current) {
      codeAreaRef.current.scrollTop = codeAreaRef.current.scrollHeight;
    }
  }, [charIndex, phase]);

  /* ── Running → Done ── */
  useEffect(() => {
    if (phase !== "running") return;
    const timeout = setTimeout(() => setPhase("done"), 800);
    return () => clearTimeout(timeout);
  }, [phase]);

  /* ── Reveal output lines one by one ── */
  useEffect(() => {
    if (phase !== "done" || !snippet) return;
    if (visibleOutputLines >= snippet.output.length) return;
    const timeout = setTimeout(() => setVisibleOutputLines((n) => n + 1), 120);
    return () => clearTimeout(timeout);
  }, [phase, visibleOutputLines, snippet]);

  /* ── Build visible lines ── */
  const visibleChars = coloredChars.slice(0, charIndex);
  const lines: ColoredChar[][] = [[]];
  for (const c of visibleChars) {
    if (c.char === "\n") {
      lines.push([]);
    } else {
      lines[lines.length - 1].push(c);
    }
  }

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6
        ${closing ? "animate-[modal-backdrop-out_0.2s_ease-in_forwards]" : "animate-[modal-backdrop-in_0.25s_ease-out_forwards]"}`}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={animatedClose} />

      {/* Modal shell */}
      <div
        className={`relative w-full max-w-lg max-h-[85vh] flex flex-col
          bg-code-bg border border-border rounded-xl overflow-hidden
          shadow-[0_0_60px_rgba(0,0,0,0.25),0_20px_60px_rgba(0,0,0,0.3)]
          ${closing ? "animate-[modal-content-out_0.2s_ease-in_forwards]" : "animate-[modal-content-in_0.3s_ease-out_forwards]"}`}
        role="dialog"
        aria-label={`${activeLang} code terminal`}
        aria-modal="true"
      >
        {/* ── CRT scanline overlay ── */}
        <div
          className="absolute inset-0 pointer-events-none z-10 opacity-[0.02]"
          style={{
            background: "repeating-linear-gradient(transparent, transparent 2px, rgba(0,0,0,0.3) 2px, rgba(0,0,0,0.3) 4px)",
          }}
        />

        {/* ── Title bar ── */}
        <div className="relative z-20 flex items-center justify-between px-4 py-2.5 bg-secondary border-b border-border shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="flex gap-1.5">
              <button onClick={animatedClose} className="w-3 h-3 rounded-full bg-[#ff5f57] hover:brightness-125 transition-all cursor-pointer" aria-label="Close terminal" />
              <span className="w-3 h-3 rounded-full bg-[#febc2e]" />
              <span className={`w-3 h-3 rounded-full transition-all duration-500 ${phase === "done" ? "bg-[#28c840] shadow-[0_0_6px_#28c840]" : "bg-[#28c840]/50"}`} />
            </div>
            <span className="text-muted-foreground text-xs font-mono ml-1">{snippet?.file}</span>
          </div>
          <div className="flex items-center gap-1">
            {phase === "done" && (
              <button onClick={replay} className="text-muted-foreground/50 hover:text-primary transition-colors cursor-pointer p-1" aria-label="Replay" title="Replay">
                <RotateCcw size={13} />
              </button>
            )}
            <button onClick={animatedClose} className="text-muted-foreground/50 hover:text-foreground transition-colors cursor-pointer p-1" aria-label="Close">
              <X size={14} />
            </button>
          </div>
        </div>

        {/* ── Loading spinner ── */}
        {phase === "loading" && (
          <div className="flex items-center justify-center py-12">
            <div className="w-5 h-5 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
          </div>
        )}

        {/* ── Code area (scrollable) ── */}
        {phase !== "loading" && (
          <div ref={codeAreaRef} className={`relative z-20 px-4 py-3 min-h-[120px] overflow-y-auto flex-1 transition-all duration-700 ${phase === "done" ? "opacity-40 blur-[0.3px]" : ""}`}>

            <pre className="font-mono text-xs sm:text-[13px] leading-[1.7] m-0 p-0 bg-transparent border-none overflow-x-auto">
              <code>
                {lines.map((line, i) => (
                  <div key={i} className="flex">
                    <span className="text-muted-foreground/25 select-none w-6 text-right pr-3 shrink-0 text-[11px] leading-[1.7]">{i + 1}</span>
                    <span>
                      {groupChars(line).map((group, j) => (
                        <span key={j} style={{ color: group.color }}>
                          {group.text}
                        </span>
                      ))}
                      {/* Blinking block cursor at end of last line */}
                      {i === lines.length - 1 && phase === "typing" && <span className="inline-block w-[7px] h-[15px] bg-primary ml-[1px] align-middle animate-[cursor-blink_1s_step-end_infinite]" />}
                    </span>
                  </div>
                ))}
              </code>
            </pre>
          </div>
        )}

        {/* ── Output area ── */}
        {(phase === "running" || phase === "done") && (
          <div className="relative z-20 border-t border-border px-4 py-3 bg-background shrink-0 overflow-hidden">
            {/* Spotlight glow */}
            {phase === "done" && (
              <div
                className="absolute inset-0 pointer-events-none animate-[spotlight-pulse_2s_ease-out_forwards]"
                style={{
                  background: "radial-gradient(ellipse at 50% 0%, rgba(105, 240, 174, 0.08) 0%, transparent 70%)",
                }}
              />
            )}
            {/* Accent bar */}
            {phase === "done" && (
              <div
                className="absolute left-0 top-0 bottom-0 w-[1px] animate-[accent-bar-in_0.5s_ease-out_0.2s_both] bg-accent/60"
                style={{ background: "linear-gradient(to bottom, transparent 0%, var(--color-accent) 20%, var(--color-accent) 70%, transparent 100%)" }}
              />
            )}
            {/* Run command */}
            <div className="flex items-center gap-1.5 text-xs font-mono text-muted-foreground/50 mb-2">
              <ChevronRight size={11} className="text-accent/60" />
              <span>{snippet?.runCmd}</span>
            </div>

            {/* Progress bar (visible during "running" phase) */}
            {phase === "running" && (
              <div className="h-[3px] rounded-full bg-secondary overflow-hidden mt-1 mb-1">
                <div className="h-full bg-accent/60 rounded-full animate-[code-progress_0.7s_ease-in-out_forwards]" />
              </div>
            )}

            {/* Output lines */}
            {snippet?.output.slice(0, visibleOutputLines).map((line, i) => (
              <div key={i} className="text-accent text-xs sm:text-[13px] font-mono pl-5 animate-[code-fade-in_0.25s_ease-out_both]" style={{ animationDelay: `${i * 60}ms` }}>
                {line}
              </div>
            ))}

            {/* Done indicator */}
            {phase === "done" && visibleOutputLines >= (snippet?.output.length ?? 0) && (
              <div className="flex items-center gap-1.5 text-[11px] font-mono text-muted-foreground/30 mt-2.5 animate-[code-fade-in_0.3s_ease-out_both]">
                <span className="text-accent/40">✓</span>
                <span>Process exited with code 0</span>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
