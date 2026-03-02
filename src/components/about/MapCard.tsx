import { useEffect, useRef, useState } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { useThemeStore } from "@/stores/useThemeStore";

const MY_LOCATION = { lat: 42.98, lng: -81.25 };
const MY_LABEL = "London, Canada";

/** Haversine distance in km */
const haversine = (lat1: number, lon1: number, lat2: number, lon2: number) => {
  const R = 6371;
  const toRad = (d: number) => (d * Math.PI) / 180;
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a = Math.sin(dLat / 2) ** 2 + Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
};

/** Round to nearest 10 */
const roundTo10 = (n: number) => Math.round(n / 10) * 10;

/** Country code → demonym */
const demonyms: Record<string, string> = {
  CA: "Canadian",
  US: "American",
  GB: "British",
  AU: "Australian",
  IN: "Indian",
  SG: "Singaporean",
  ID: "Indonesian",
  BD: "Bangladeshi",
  DE: "German",
  FR: "French",
  JP: "Japanese",
  KR: "Korean",
  BR: "Brazilian",
  NZ: "New Zealander",
  MY: "Malaysian",
  PH: "Filipino",
  PK: "Pakistani",
  NL: "Dutch",
  IT: "Italian",
  ES: "Spanish",
  SE: "Swedish",
  NO: "Norwegian",
  FI: "Finnish",
  DK: "Danish",
  IE: "Irish",
  MX: "Mexican",
  AE: "Emirati",
  SA: "Saudi",
  NG: "Nigerian",
  ZA: "South African",
  CN: "Chinese",
  TW: "Taiwanese",
  TH: "Thai",
  VN: "Vietnamese",
  TR: "Turkish",
  RU: "Russian",
  PL: "Polish",
  PT: "Portuguese",
  AR: "Argentinian",
  CL: "Chilean",
  CO: "Colombian",
  EG: "Egyptian",
};

/** Small SVG marker icons */
const createIcon = (color: string, borderColor: string) =>
  L.divIcon({
    className: "",
    html: `<div style="width:12px;height:12px;background:${color};border:2px solid ${borderColor};border-radius:50%;box-shadow:0 0 6px ${color}80;"></div>`,
    iconSize: [12, 12],
    iconAnchor: [6, 6],
  });

const TILE_URLS = {
  dark: "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png",
  light: "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png",
};

export default function MapCard() {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstance = useRef<L.Map | null>(null);
  const tileLayerRef = useRef<L.TileLayer | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const theme = useThemeStore((s) => s.theme);

  // Swap tile layer when theme changes
  useEffect(() => {
    if (!mapInstance.current || !tileLayerRef.current) return;
    tileLayerRef.current.setUrl(TILE_URLS[theme]);
  }, [theme]);

  useEffect(() => {
    if (!mapRef.current || mapInstance.current) return;

    const map = L.map(mapRef.current, {
      center: [MY_LOCATION.lat, MY_LOCATION.lng],
      zoom: 10,
      zoomControl: false,
      attributionControl: false,
      scrollWheelZoom: true,
      dragging: true,
    });

    mapInstance.current = map;

    const tileLayer = L.tileLayer(TILE_URLS[theme], {
      maxZoom: 19,
    }).addTo(map);
    tileLayerRef.current = tileLayer;

    // Marker icons — border adapts to tile theme
    const border = theme === "dark" ? "white" : "#1a1a2e";
    const myIcon = createIcon("#60a5fa", border);
    const userIcon = createIcon("#34d399", border);

    // My marker
    L.marker([MY_LOCATION.lat, MY_LOCATION.lng], { icon: myIcon }).addTo(map).bindPopup(`<b>🇨🇦 ${MY_LABEL}</b><br/><span style="color:#60a5fa">Tahsin's location</span>`, {
      className: "custom-popup",
    });

    // Try to get user location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (pos) => {
          const { latitude, longitude } = pos.coords;

          // User marker (reuse icon from outer scope)
          L.marker([latitude, longitude], { icon: userIcon }).addTo(map).bindPopup("<b>📍 You</b>", { className: "custom-popup" });

          // Fit bounds to show both
          const bounds = L.latLngBounds([MY_LOCATION.lat, MY_LOCATION.lng], [latitude, longitude]);
          map.fitBounds(bounds, { padding: [30, 30], maxZoom: 6 });

          // Dashed line between
          L.polyline(
            [
              [MY_LOCATION.lat, MY_LOCATION.lng],
              [latitude, longitude],
            ],
            { color: "#60a5fa", weight: 1.5, dashArray: "6 4", opacity: 0.5 },
          ).addTo(map);

          // Distance
          const dist = roundTo10(haversine(MY_LOCATION.lat, MY_LOCATION.lng, latitude, longitude));

          // Reverse geocode for country
          try {
            const res = await fetch(`https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json&zoom=3`, { headers: { "Accept-Language": "en" } });
            const data = await res.json();
            const countryCode = data.address?.country_code?.toUpperCase();
            const countryName = data.address?.country;

            if (countryCode && countryCode === "CA") {
              setMessage(`Hello, fellow Canadian! I'm based in ${MY_LABEL}, roughly ${dist.toLocaleString()}km away from you.`);
            } else if (countryCode && demonyms[countryCode]) {
              setMessage(`Hello, fellow ${demonyms[countryCode]}! I'm based in ${MY_LABEL}, roughly ${dist.toLocaleString()}km away from you.`);
            } else if (countryName) {
              setMessage(`Hello from ${countryName}! I'm based in ${MY_LABEL}, roughly ${dist.toLocaleString()}km away from you.`);
            } else {
              setMessage(`I'm based in ${MY_LABEL}, roughly ${dist.toLocaleString()}km away from you.`);
            }
          } catch {
            setMessage(`I'm based in ${MY_LABEL}, roughly ${dist.toLocaleString()}km away from you.`);
          }
        },
        () => {
          // Denied or error
          setMessage(`I'm based in ${MY_LABEL} 🇨🇦`);
        },
        { timeout: 8000 },
      );
    } else {
      setMessage(`I'm based in ${MY_LABEL} 🇨🇦`);
    }

    return () => {
      map.remove();
      mapInstance.current = null;
    };
  }, []);

  return (
    <div className="relative w-full h-full min-h-[220px]">
      <div ref={mapRef} className="absolute inset-0 z-0" />

      {/* Message overlay */}
      {message && (
        <div className="absolute bottom-0 left-0 right-0 z-[1000] bg-gradient-to-t from-background via-background/90 to-transparent px-4 pt-6 pb-3">
          <p className="text-foreground text-xs leading-relaxed font-medium">{message}</p>
        </div>
      )}

      <style>{`
        .custom-popup .leaflet-popup-content-wrapper {
          background: hsl(var(--card));
          color: hsl(var(--foreground));
          border: 1px solid hsl(var(--border));
          border-radius: 8px;
          font-size: 12px;
          box-shadow: 0 4px 12px rgba(0,0,0,0.3);
        }
        .custom-popup .leaflet-popup-tip {
          background: hsl(var(--card));
          border: 1px solid hsl(var(--border));
        }
        .leaflet-container {
          background: hsl(var(--card)) !important;
        }
      `}</style>
    </div>
  );
}
