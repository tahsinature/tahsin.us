import { platforms, type PlatformKey } from "@/config/platforms";

export default function PlatformIcon({ platform }: { platform: PlatformKey }) {
  const { favicon, name } = platforms[platform];
  return <img src={favicon} alt={name} className="w-3.5 h-3.5" loading="lazy" />;
}
