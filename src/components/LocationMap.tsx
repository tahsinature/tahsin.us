import { useEffect, useRef, useState } from "react";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import { MapPin } from "lucide-react";
import { siteConfig } from "@/config/site";

const LONDON_ON: [number, number] = [-81.2453, 42.9849];

const STYLES = {
  light: "https://basemaps.cartocdn.com/gl/positron-gl-style/style.json",
  dark: "https://basemaps.cartocdn.com/gl/dark-matter-gl-style/style.json",
};

function getTheme(): "light" | "dark" {
  if (document.documentElement.classList.contains("dark")) return "dark";
  return "light";
}

export default function LocationMap() {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<maplibregl.Map | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (!containerRef.current) return;

    const theme = getTheme();
    const map = new maplibregl.Map({
      container: containerRef.current,
      style: STYLES[theme],
      center: LONDON_ON,
      zoom: 4,
      pitch: 0,
      attributionControl: false,
      interactive: false,
      fadeDuration: 0,
    });

    mapRef.current = map;

    map.on("load", () => {
      setReady(true);
      // Fly in after a brief pause
      setTimeout(() => {
        map.flyTo({
          center: LONDON_ON,
          zoom: 10.5,
          pitch: 40,
          bearing: -15,
          duration: 2800,
          essential: true,
        });
      }, 400);
    });

    // Watch theme changes
    const observer = new MutationObserver(() => {
      const newTheme = getTheme();
      map.setStyle(STYLES[newTheme]);
    });
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => {
      observer.disconnect();
      map.remove();
      mapRef.current = null;
    };
  }, []);

  return (
    <div className="hidden md:flex flex-col rounded-xl border border-border/40 bg-card/30 h-full min-h-[200px] relative overflow-hidden group">
      {/* Map canvas */}
      <div ref={containerRef} className="absolute inset-0" />

      {/* Vignette overlay */}
      <div className="absolute inset-0 pointer-events-none shadow-[inset_0_0_30px_rgba(0,0,0,0.15)] dark:shadow-[inset_0_0_30px_rgba(0,0,0,0.4)] rounded-xl z-10" />

      {/* Pulsing marker */}
      <div
        className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20 transition-opacity duration-700 ${ready ? "opacity-100" : "opacity-0"}`}
      >
        {/* Ping ring */}
        <span className="absolute inset-0 -m-3 rounded-full bg-primary/20 animate-ping" />
        {/* Steady glow */}
        <span className="absolute inset-0 -m-2 rounded-full bg-primary/15" />
        {/* Pin */}
        <div className="relative flex items-center justify-center w-8 h-8 rounded-full bg-primary/90 text-primary-foreground shadow-lg shadow-primary/30">
          <MapPin size={16} />
        </div>
      </div>

      {/* Location label */}
      <div className="absolute bottom-0 left-0 right-0 z-20 p-3 bg-gradient-to-t from-background/80 via-background/40 to-transparent">
        <p className="text-foreground font-semibold text-sm leading-tight">
          {siteConfig.locationShort}
        </p>
        <p className="text-muted-foreground/70 text-xs mt-0.5">
          {siteConfig.locationEmoji} Canada
        </p>
      </div>
    </div>
  );
}
