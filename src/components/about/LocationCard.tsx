import { MapPin } from "lucide-react";
import { LocationMapIllustration } from "@/components/SVGs";
import { siteConfig } from "@/config/site";

export default function LocationCard() {
  return (
    <div className="location-card" aria-label={`Based in ${siteConfig.location}`}>
      <div className="location-card-art" aria-hidden="true">
        <LocationMapIllustration />
        <span className="location-card-marker"><MapPin className="size-5" /></span>
      </div>
      <div className="location-card-caption">
        <p className="location-card-eyebrow">A little corner of the world</p>
        <h3>{siteConfig.locationShort}</h3>
        <p className="location-card-country">{siteConfig.locationEmoji} Home base in Canada</p>
      </div>
    </div>
  );
}
