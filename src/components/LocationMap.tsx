import { useEffect, useRef } from "react";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
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

  useEffect(() => {
    if (!containerRef.current) return;

    const theme = getTheme();
    const map = new maplibregl.Map({
      container: containerRef.current,
      style: STYLES[theme],
      center: LONDON_ON,
      zoom: 4,
      attributionControl: false,
    });

    new maplibregl.Marker({ color: getComputedStyle(document.documentElement).getPropertyValue("--primary").trim() })
      .setLngLat(LONDON_ON)
      .addTo(map);

    map.on("load", () => {
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

    const observer = new MutationObserver(() => {
      map.setStyle(STYLES[getTheme()]);
    });
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => {
      observer.disconnect();
      map.remove();
    };
  }, []);

  return (
    <div className="hidden md:block rounded-xl border border-border/40 overflow-hidden relative" style={{ minHeight: 240 }}>
      <div ref={containerRef} style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0 }} />

      <div className="absolute bottom-0 left-0 right-0 z-20 p-3 bg-gradient-to-t from-background/80 via-background/40 to-transparent pointer-events-none">
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
