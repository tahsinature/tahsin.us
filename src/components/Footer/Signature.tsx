"use client";

import { useTheme } from "next-themes";
import Image from "next/image";
import { useEffect, useState } from "react";

const sign: Record<string, string> = {
  light: "/images/signature-black.png",
  dark: "/images/signature-white.png",
};

const Signature = (props: { className?: string; scale?: number }) => {
  const { resolvedTheme } = useTheme();

  const [src, setSrc] = useState("");

  const widthBase = 3.81;
  const heightBase = 1.91;
  const scale = props.scale || 100;

  const width = widthBase * scale;
  const height = heightBase * scale;

  useEffect(() => {
    setSrc(sign[resolvedTheme as string]);
  }, [resolvedTheme]);

  return <div className={props.className}>{src && <Image alt="Signature" height={height} src={src} width={width} />}</div>;
};

export default Signature;
