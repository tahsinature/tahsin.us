import { useState, useRef, useCallback, useEffect } from "react";
import type { DirectiveProps } from "../types";
import { useResolvedSrc } from "../contexts";

export default function RetroDiskDirective({ props }: { props: DirectiveProps }) {
  const { title, artist } = props;
  const { url: audioSrc, loading } = useResolvedSrc((props.src as string) ?? "");
  const audioRef = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);

  const toggle = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;
    if (audio.paused) {
      audio.play();
      setPlaying(true);
    } else {
      audio.pause();
      setPlaying(false);
    }
  }, []);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    const onTime = () => {
      if (audio.duration) setProgress(audio.currentTime / audio.duration);
    };
    const onEnd = () => {
      setPlaying(false);
      setProgress(0);
    };
    audio.addEventListener("timeupdate", onTime);
    audio.addEventListener("ended", onEnd);
    return () => {
      audio.removeEventListener("timeupdate", onTime);
      audio.removeEventListener("ended", onEnd);
    };
  }, [audioSrc]);

  if (loading) {
    return (
      <div className="flex items-center gap-4 p-4 rounded-xl border border-border bg-muted/20 my-4 animate-pulse">
        <div className="w-16 h-16 rounded-full bg-muted" />
        <div className="flex-1 space-y-2">
          <div className="h-4 bg-muted rounded w-1/3" />
          <div className="h-1 bg-muted rounded" />
        </div>
      </div>
    );
  }

  if (!audioSrc) {
    return <div className="text-xs text-muted-foreground/50 italic my-4">[audio unavailable]</div>;
  }

  return (
    <div className="flex items-center gap-4 p-4 rounded-xl border border-border bg-muted/20 my-4">
      <audio ref={audioRef} src={audioSrc} preload="metadata" />

      {/* Vinyl disk */}
      <button
        onClick={toggle}
        className="relative w-16 h-16 shrink-0 rounded-full bg-neutral-900 border-2 border-neutral-700 cursor-pointer group"
        style={{ animation: playing ? "spin 2s linear infinite" : "none" }}
      >
        {/* Grooves */}
        <div className="absolute inset-2 rounded-full border border-neutral-700/50" />
        <div className="absolute inset-4 rounded-full border border-neutral-700/30" />
        {/* Center label */}
        <div className="absolute inset-0 m-auto w-5 h-5 rounded-full bg-amber-600/90 border border-amber-700" />
        {/* Center dot */}
        <div className="absolute inset-0 m-auto w-1.5 h-1.5 rounded-full bg-neutral-900" />
        {/* Play/Pause overlay */}
        <div className={`absolute inset-0 rounded-full flex items-center justify-center transition-colors ${playing ? "bg-black/20" : "bg-black/0 group-hover:bg-black/20"}`}>
          <svg viewBox="0 0 24 24" fill="white" className={`h-5 w-5 transition-opacity drop-shadow ${playing ? "opacity-80" : "opacity-0 group-hover:opacity-80"}`}>
            {playing ? (
              <>
                <rect x="6" y="4" width="4" height="16" rx="1" />
                <rect x="14" y="4" width="4" height="16" rx="1" />
              </>
            ) : (
              <path d="M8 5v14l11-7z" />
            )}
          </svg>
        </div>
      </button>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold text-foreground truncate">{(title as string) || "Untitled Track"}</p>
        {artist && <p className="text-xs text-muted-foreground mt-0.5 truncate">{artist as string}</p>}
        {/* Progress bar */}
        <div className="mt-2 h-1 rounded-full bg-muted overflow-hidden">
          <div
            className="h-full bg-amber-600/70 rounded-full transition-[width] duration-200"
            style={{ width: `${progress * 100}%` }}
          />
        </div>
      </div>

      <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}
