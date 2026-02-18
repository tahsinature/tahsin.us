import { siteConfig } from "@/config/site";

interface LogoProps {
  size?: number;
  className?: string;
}

export default function Logo({ size = 32, className = "" }: LogoProps) {
  return <img src="/favicon.ico" alt={siteConfig.name.brand} width={size} height={size} className={`rounded-full ${className}`} />;
}
