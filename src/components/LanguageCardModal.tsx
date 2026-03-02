import { useState, useEffect, useCallback, useRef } from "react";
import { createPortal } from "react-dom";
import { X, ChevronRight, ChevronLeft, Volume2, Globe, Users, Lightbulb } from "lucide-react";
import { languagesByLabel, type LanguageData, type LanguagePhrase } from "@/data/language-phrases";

// ── Types ───────────────────────────────────────────────────────
type Phase = "intro" | "typing-native" | "pause" | "typing-english" | "done";

// ── Typing hook ─────────────────────────────────────────────────
function useTypewriter(text: string, active: boolean, speed: number = 45) {
  const [index, setIndex] = useState(0);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Reset index when text changes
  useEffect(() => {
    requestAnimationFrame(() => setIndex(0));
  }, [text]);

  useEffect(() => {
    if (!active || index >= text.length) return;

    const char = text[index];
    const delay = char === " " ? speed * 0.4 : char === "—" || char === "." || char === "," ? speed * 2.5 : speed + Math.random() * (speed * 0.6);

    timerRef.current = setTimeout(() => setIndex((i) => i + 1), delay);
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [active, index, text, speed]);

  return { displayed: text.slice(0, index), done: index >= text.length };
}

// ── Main component (exported for use in AboutPage) ──────────────
interface LanguageCardModalProps {
  language: string;
  onClose: () => void;
}

export function LanguageCardModal({ language, onClose }: LanguageCardModalProps) {
  const lang = languagesByLabel[language];
  if (!lang) return null;

  return createPortal(<LanguageCardModalInner lang={lang} onClose={onClose} />, document.body);
}

// ── Inner modal (manages all state) ─────────────────────────────
function LanguageCardModalInner({ lang, onClose }: { lang: LanguageData; onClose: () => void }) {
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [phase, setPhase] = useState<Phase>("intro");
  const [closing, setClosing] = useState(false);
  const [factIndex, setFactIndex] = useState(0);
  const [showPronunciation, setShowPronunciation] = useState(false);

  const phrase: LanguagePhrase = lang.phrases[phraseIndex];

  // Typing hooks
  const native = useTypewriter(phrase.native, phase === "typing-native", 50);
  const english = useTypewriter(phrase.english, phase === "typing-english", 35);

  /* ── Phase machine ── */
  useEffect(() => {
    if (phase === "intro") {
      const t = setTimeout(() => setPhase("typing-native"), 600);
      return () => clearTimeout(t);
    }
    if (phase === "typing-native" && native.done) {
      const t = setTimeout(() => setPhase("pause"), 400);
      return () => clearTimeout(t);
    }
    if (phase === "pause") {
      const t = setTimeout(() => setPhase("typing-english"), 500);
      return () => clearTimeout(t);
    }
    if (phase === "typing-english" && english.done) {
      const t = setTimeout(() => setPhase("done"), 300);
      return () => clearTimeout(t);
    }
  }, [phase, native.done, english.done]);

  /* ── Rotate facts ── */
  useEffect(() => {
    if (phase !== "done") return;
    const interval = setInterval(() => {
      setFactIndex((i) => (i + 1) % lang.facts.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [phase, lang.facts.length]);

  /* ── Navigate phrases ── */
  const goToPhrase = useCallback(
    (dir: 1 | -1) => {
      setPhraseIndex((i) => {
        const next = i + dir;
        if (next < 0) return lang.phrases.length - 1;
        if (next >= lang.phrases.length) return 0;
        return next;
      });
      setPhase("intro");
      setShowPronunciation(false);
    },
    [lang.phrases.length],
  );

  /* ── Close animation ── */
  const animatedClose = useCallback(() => {
    setClosing(true);
    setTimeout(onClose, 200);
  }, [onClose]);

  /* ── Lock scroll + escape ── */
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, []);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") animatedClose();
      if (e.key === "ArrowRight") goToPhrase(1);
      if (e.key === "ArrowLeft") goToPhrase(-1);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [animatedClose, goToPhrase]);

  // Accent color as CSS var for this modal
  const accentVar = { "--lang-accent": lang.color } as React.CSSProperties;

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6
        ${closing ? "animate-[modal-backdrop-out_0.2s_ease-in_forwards]" : "animate-[modal-backdrop-in_0.25s_ease-out_forwards]"}`}
      style={accentVar}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={animatedClose} />

      {/* Modal shell */}
      <div
        className={`relative w-full max-w-lg max-h-[90vh] flex flex-col
          bg-card border border-border rounded-2xl overflow-hidden
          shadow-[0_0_80px_rgba(0,0,0,0.3),0_20px_60px_rgba(0,0,0,0.35)]
          ${closing ? "animate-[modal-content-out_0.2s_ease-in_forwards]" : "animate-[modal-content-in_0.3s_ease-out_forwards]"}`}
        role="dialog"
        aria-label={`${lang.englishName} language card`}
        aria-modal="true"
      >
        {/* ── Header ── */}
        <div className="relative z-20 flex items-center justify-between px-5 py-3.5 border-b border-border shrink-0">
          <div className="flex items-center gap-3">
            <span className="text-2xl">{lang.flag}</span>
            <div>
              <h3 className="text-foreground text-sm font-bold flex items-center gap-2">
                {lang.label}
                <span className="text-muted-foreground font-normal text-xs">/ {lang.englishName}</span>
              </h3>
              <p className="text-muted-foreground text-[10px] flex items-center gap-1">
                <Globe size={9} />
                {lang.script}
                <span className="mx-1">·</span>
                <Users size={9} />
                {lang.speakers}
              </p>
            </div>
          </div>
          <button onClick={animatedClose} className="text-muted-foreground/50 hover:text-foreground transition-colors cursor-pointer p-1" aria-label="Close">
            <X size={16} />
          </button>
        </div>

        {/* ── Greeting banner ── */}
        <div className="px-5 py-2.5 text-center text-sm font-semibold animate-[code-fade-in_0.5s_ease-out_both]" style={{ backgroundColor: `${lang.color}12`, color: lang.color }}>
          {lang.greeting}
        </div>

        {/* ── Main typing area ── */}
        <div className="flex-1 overflow-y-auto px-5 py-6">
          {/* Context label */}
          {phrase.context && (
            <p className="text-muted-foreground text-[11px] uppercase tracking-widest mb-4 animate-[code-fade-in_0.4s_ease-out_both]" key={`ctx-${phraseIndex}`}>
              {phrase.context}
            </p>
          )}

          {/* Native text */}
          <div className="min-h-[4rem] mb-5" key={`native-${phraseIndex}`}>
            {(phase === "typing-native" || phase === "pause" || phase === "typing-english" || phase === "done") && (
              <p className="text-xl sm:text-2xl font-semibold leading-relaxed text-foreground" style={{ color: lang.color }}>
                {native.displayed}
                {phase === "typing-native" && (
                  <span className="inline-block w-[2px] h-[1.2em] ml-[2px] align-middle animate-[cursor-blink_1s_step-end_infinite]" style={{ backgroundColor: lang.color }} />
                )}
              </p>
            )}
          </div>

          {/* Divider with animated pen */}
          {(phase === "pause" || phase === "typing-english" || phase === "done") && (
            <div className="flex items-center gap-3 mb-5 animate-[code-fade-in_0.3s_ease-out_both]">
              <div className="flex-1 h-px" style={{ backgroundColor: `${lang.color}25` }} />
              <span className="text-lg" style={{ color: lang.color }}>
                ✦
              </span>
              <div className="flex-1 h-px" style={{ backgroundColor: `${lang.color}25` }} />
            </div>
          )}

          {/* English translation */}
          <div className="min-h-[3rem]" key={`eng-${phraseIndex}`}>
            {(phase === "typing-english" || phase === "done") && (
              <p className="text-base sm:text-lg text-muted-foreground leading-relaxed italic">
                "{english.displayed}"
                {phase === "typing-english" && <span className="inline-block w-[2px] h-[1em] bg-muted-foreground ml-[2px] align-middle animate-[cursor-blink_1s_step-end_infinite]" />}
              </p>
            )}
          </div>

          {/* Pronunciation guide (toggle) */}
          {phase === "done" && lang.englishName !== "English" && (
            <div className="mt-4 animate-[code-fade-in_0.3s_ease-out_both]">
              <button onClick={() => setShowPronunciation((v) => !v)} className="flex items-center gap-1.5 text-[11px] text-muted-foreground hover:text-muted-foreground transition-colors cursor-pointer">
                <Volume2 size={12} style={{ color: lang.color }} />
                {showPronunciation ? "Hide" : "Show"} pronunciation
              </button>
              {showPronunciation && <p className="text-sm text-muted-foreground font-mono mt-2 pl-5 animate-[code-fade-in_0.25s_ease-out_both]">{phrase.pronunciation}</p>}
            </div>
          )}
        </div>

        {/* ── Fun fact strip ── */}
        {phase === "done" && (
          <div className="px-5 py-3 border-t border-border animate-[code-fade-in_0.4s_ease-out_both] shrink-0" style={{ backgroundColor: `${lang.color}08` }}>
            <div className="flex items-start gap-2">
              <Lightbulb size={13} className="shrink-0 mt-0.5" style={{ color: lang.color }} />
              <p key={factIndex} className="text-xs text-muted-foreground leading-relaxed animate-[lang-fact-swap_0.4s_ease-out_both]">
                {lang.facts[factIndex]}
              </p>
            </div>
          </div>
        )}

        {/* ── Footer / Navigation ── */}
        <div className="flex items-center justify-between px-5 py-3 border-t border-border shrink-0">
          <button onClick={() => goToPhrase(-1)} className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors cursor-pointer">
            <ChevronLeft size={14} />
            Prev
          </button>

          {/* Phrase dots */}
          <div className="flex items-center gap-1.5">
            {lang.phrases.map((_, i) => (
              <button
                key={i}
                onClick={() => {
                  setPhraseIndex(i);
                  setPhase("intro");
                  setShowPronunciation(false);
                }}
                className={`w-1.5 h-1.5 rounded-full transition-all duration-300 cursor-pointer ${i === phraseIndex ? "scale-125" : "bg-muted-foreground/30 hover:bg-muted-foreground/50"}`}
                style={i === phraseIndex ? { backgroundColor: lang.color } : undefined}
                aria-label={`Phrase ${i + 1}`}
              />
            ))}
          </div>

          <button onClick={() => goToPhrase(1)} className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors cursor-pointer">
            Next
            <ChevronRight size={14} />
          </button>
        </div>
      </div>
    </div>
  );
}
