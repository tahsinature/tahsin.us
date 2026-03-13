import { Map, MapMarker, MarkerContent } from "@/components/ui/map";
import { MapPin } from "lucide-react";
import { siteConfig } from "@/config/site";

const LONDON_ON = { lng: -81.2453, lat: 42.9849 };

export default function LocationMap() {
  return (
    <div className="hidden md:block rounded-xl border border-border/40 overflow-hidden relative h-[200px]">
      <Map
        className="!absolute inset-0 !w-full !h-full"
        center={[LONDON_ON.lng, LONDON_ON.lat]}
        zoom={10}
        pitch={40}
        bearing={-15}
        attributionControl={false}
      >
        <MapMarker longitude={LONDON_ON.lng} latitude={LONDON_ON.lat}>
          <MarkerContent>
            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground shadow-lg shadow-primary/30">
              <MapPin size={16} />
            </div>
          </MarkerContent>
        </MapMarker>
      </Map>

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
