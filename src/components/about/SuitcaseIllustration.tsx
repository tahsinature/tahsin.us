/**
 * Travel suitcase with country stickers — playful journey vibe.
 */
export default function SuitcaseIllustration({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 140 100" className={className} xmlns="http://www.w3.org/2000/svg" aria-label="Suitcase illustration">
      {/* Handle */}
      <path d="M55,22 L55,14 C55,10 60,8 70,8 C80,8 85,10 85,14 L85,22" fill="none" stroke="#3a3b55" strokeWidth="3" strokeLinecap="round" />

      {/* Suitcase body */}
      <rect x="28" y="22" width="84" height="58" rx="6" fill="#2a2b45" />
      <rect x="28" y="22" width="84" height="58" rx="6" fill="none" stroke="#3a3b55" strokeWidth="1" />

      {/* Middle clasp band */}
      <rect x="28" y="48" width="84" height="4" fill="#3a3b55" />
      {/* Clasps */}
      <rect x="52" y="46" width="8" height="8" rx="1.5" fill="#e8a830" />
      <rect x="80" y="46" width="8" height="8" rx="1.5" fill="#e8a830" />

      {/* Sticker: Canada maple leaf */}
      <circle cx="48" cy="35" r="8" fill="#ef4444" opacity="0.85" />
      <text x="48" y="38" textAnchor="middle" fontSize="10" fill="white">🍁</text>

      {/* Sticker: Singapore */}
      <rect x="66" y="28" width="18" height="12" rx="2" fill="#60a5fa" opacity="0.8" />
      <text x="75" y="37" textAnchor="middle" fontSize="7" fill="white" fontWeight="bold">SG</text>

      {/* Sticker: Indonesia */}
      <circle cx="98" cy="36" r="7" fill="#34d399" opacity="0.8" />
      <text x="98" y="39" textAnchor="middle" fontSize="6" fill="white" fontWeight="bold">ID</text>

      {/* Sticker: code bracket */}
      <rect x="38" y="58" width="22" height="12" rx="2" fill="#a78bfa" opacity="0.7" />
      <text x="49" y="67" textAnchor="middle" fontSize="8" fill="white" fontFamily="monospace" fontWeight="bold">{"</>"}</text>

      {/* Sticker: heart */}
      <circle cx="78" cy="65" r="6" fill="#ff6b9d" opacity="0.7" />
      <text x="78" y="68" textAnchor="middle" fontSize="8" fill="white">♥</text>

      {/* Wheels */}
      <circle cx="42" cy="84" r="4" fill="#1a1a2e" stroke="#3a3b55" strokeWidth="1" />
      <circle cx="98" cy="84" r="4" fill="#1a1a2e" stroke="#3a3b55" strokeWidth="1" />
      <circle cx="42" cy="84" r="1.5" fill="#3a3b55" />
      <circle cx="98" cy="84" r="1.5" fill="#3a3b55" />

      {/* Ground shadow */}
      <ellipse cx="70" cy="92" rx="45" ry="3" fill="#1a1a2e" opacity="0.2" />
    </svg>
  );
}
