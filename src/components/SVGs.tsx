import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

export const SunIcon = (props: IconProps) => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <circle cx="12" cy="12" r="4" />
    <path d="M12 2v2" />
    <path d="M12 20v2" />
    <path d="m4.93 4.93 1.41 1.41" />
    <path d="m17.66 17.66 1.41 1.41" />
    <path d="M2 12h2" />
    <path d="M20 12h2" />
    <path d="m6.34 17.66-1.41 1.41" />
    <path d="m19.07 4.93-1.41 1.41" />
  </svg>
);

export const MoonIcon = (props: IconProps) => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
  </svg>
);

export const GearIcon = (props: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);


export const CharacterIllustration = (props: IconProps) => (
  <svg viewBox="0 0 200 260" xmlns="http://www.w3.org/2000/svg" {...props}>
    {/* Shadow */}
    <ellipse cx="100" cy="248" rx="60" ry="8" fill="#0a0c18" opacity="0.3" />
    {/* Legs */}
    <rect x="78" y="190" width="16" height="50" rx="6" fill="#1a1a2e" />
    <rect x="106" y="190" width="16" height="50" rx="6" fill="#1a1a2e" />
    {/* Shoes */}
    <ellipse cx="86" cy="242" rx="12" ry="5" fill="#e8e8e8" />
    <ellipse cx="114" cy="242" rx="12" ry="5" fill="#e8e8e8" />
    {/* Body / hoodie */}
    <path
      d="M68,110 C65,140 64,170 68,195 C72,200 86,204 100,204 C114,204 128,200 132,195
         C136,170 135,140 132,110 C125,98 112,92 100,92 C88,92 75,98 68,110Z"
      fill="#e8a830"
    />
    {/* Hoodie panel */}
    <path
      d="M80,115 C78,140 78,170 80,192 C84,198 92,200 100,200 C108,200 116,198 120,192
         C122,170 122,140 120,115 C114,108 108,104 100,104 C92,104 86,108 80,115Z"
      fill="#d4d4d8"
    />
    {/* Pocket */}
    <path d="M88,160 C90,153 110,153 112,160 C112,172 110,178 100,178 C90,178 88,172 88,160Z" fill="#c8c8cc" opacity="0.5" />
    {/* Arms */}
    <path d="M68,118 C56,132 52,155 58,175" fill="none" stroke="#e8a830" strokeWidth="12" strokeLinecap="round" />
    <path d="M132,118 C144,132 148,155 142,175" fill="none" stroke="#e8a830" strokeWidth="12" strokeLinecap="round" />
    {/* Hands */}
    <circle cx="58" cy="178" r="8" fill="#f0c8a0" />
    <circle cx="142" cy="178" r="8" fill="#f0c8a0" />
    {/* Neck */}
    <rect x="92" y="75" width="16" height="14" rx="5" fill="#f0c8a0" />
    {/* Head */}
    <ellipse cx="100" cy="55" rx="32" ry="35" fill="#f0c8a0" />
    {/* Hair */}
    <path
      d="M68,48 C66,30 74,14 88,8 C94,6 104,5 112,8 C126,14 134,30 132,48
         C133,38 128,22 116,14 C108,9 92,9 84,14 C74,22 68,36 68,48Z"
      fill="#4a3520"
    />
    {/* Hair tufts */}
    <path d="M120,16 C128,6 136,12 130,24 C128,16 124,12 120,16Z" fill="#4a3520" />
    <path d="M72,24 C66,14 60,20 66,30 C66,24 70,20 72,24Z" fill="#4a3520" />
    {/* Side hair */}
    <path d="M68,48 C66,55 67,62 70,60 C70,55 69,50 68,48Z" fill="#4a3520" />
    <path d="M132,48 C134,55 133,62 130,60 C130,55 131,50 132,48Z" fill="#4a3520" />
    {/* Eyes */}
    <circle cx="86" cy="56" r="5" fill="#1a1a2e" />
    <circle cx="114" cy="56" r="5" fill="#1a1a2e" />
    <circle cx="87.5" cy="54.5" r="1.8" fill="#fff" opacity="0.7" />
    <circle cx="115.5" cy="54.5" r="1.8" fill="#fff" opacity="0.7" />
    {/* Mouth */}
    <path d="M92,68 Q100,74 108,68" fill="none" stroke="#1a1a2e" strokeWidth="2" strokeLinecap="round" />
    {/* Blush */}
    <ellipse cx="78" cy="64" rx="5" ry="3" fill="#e8a0a0" opacity="0.3" />
    <ellipse cx="122" cy="64" rx="5" ry="3" fill="#e8a0a0" opacity="0.3" />
  </svg>
);
