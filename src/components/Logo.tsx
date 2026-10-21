import { siteConfig } from "@/config/site";
import { getFaviconAssets } from "@shared/favicons";

interface LogoProps {
  size?: number;
  className?: string;
}

export default function Logo({ size = 32, className = "" }: LogoProps) {
  return <img src={getFaviconAssets().png} alt={siteConfig.name.brand} width={size} height={size} className={`rounded-full ${className}`} />;
}
