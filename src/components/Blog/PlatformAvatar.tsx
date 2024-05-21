import { Button } from "@nextui-org/react";
import Image from "next/image";
import Link from "next/link";

const getBaseUrl = (url: string) => {
  const urlObject = new URL(url);
  return urlObject.origin;
};

const platformMap: Record<string, (url: string) => JSX.Element> = {
  "medium.com": (url) => (
    <Link href={url} target="_blank" className="cursor-pointer">
      <Button size="sm" startContent={<Image src={"/images/medium-logo.png"} width={20} height={20} alt="medium icon"></Image>}>
        Medium
      </Button>
    </Link>
  ),
  "dev.to": (url) => (
    <Link href={url} target="_blank" className="cursor-pointer">
      <Button size="sm" startContent={<Image src={"/images/dev-to-logo.png"} width={20} height={20} alt="dev.to icon"></Image>}>
        Dev.to
      </Button>
    </Link>
  ),
  "linkedin.com": (url) => (
    <Link href={url} target="_blank" className="cursor-pointer">
      <Button size="sm" startContent={<Image src={"/images/linkedin-logo.ico"} width={20} height={20} alt="dev.to icon"></Image>}>
        LinkedIn
      </Button>
    </Link>
  ),
  unknown: (url) => (
    <Link href={url} target="_blank" className="cursor-pointer">
      <Button size="sm">Visit</Button>
    </Link>
  ),
};

const getPlatform = (url: string) => {
  const baseUrl = getBaseUrl(url);

  const platform = Object.keys(platformMap).find((key) => baseUrl.includes(key));
  if (!platform) return platformMap["unknown"](url);

  return platformMap[platform](url);
};

const PlatformAvatar = ({ urls }: { urls: string[] }) => {
  return (
    <div className="flex gap-4 items-center">
      {urls.map((url) => (
        <div key={url}>{getPlatform(url) as JSX.Element}</div>
      ))}
    </div>
  );
};

export default PlatformAvatar;
