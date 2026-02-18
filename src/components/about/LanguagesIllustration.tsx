/**
 * Globe with speech bubbles SVG illustration — represents multilingual ability.
 */
export default function LanguagesIllustration({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 160 120" className={className} xmlns="http://www.w3.org/2000/svg" aria-label="Languages illustration">
      {/* Globe */}
      <circle cx="60" cy="60" r="32" fill="#1a1a2e" stroke="#3a3b55" strokeWidth="1.5" />
      {/* Latitude lines */}
      <ellipse cx="60" cy="60" rx="32" ry="12" fill="none" stroke="#3a3b55" strokeWidth="0.8" opacity="0.5" />
      <ellipse cx="60" cy="60" rx="32" ry="24" fill="none" stroke="#3a3b55" strokeWidth="0.8" opacity="0.4" />
      {/* Longitude line */}
      <ellipse cx="60" cy="60" rx="12" ry="32" fill="none" stroke="#3a3b55" strokeWidth="0.8" opacity="0.5" />
      {/* Meridian */}
      <line x1="60" y1="28" x2="60" y2="92" stroke="#3a3b55" strokeWidth="0.8" opacity="0.4" />
      <line x1="28" y1="60" x2="92" y2="60" stroke="#3a3b55" strokeWidth="0.8" opacity="0.4" />
      {/* Continents - abstract shapes */}
      <path d="M50,40 C54,38 62,36 68,40 C72,44 70,52 66,54 C62,56 56,52 52,48 C48,44 48,42 50,40Z" fill="#69f0ae" opacity="0.3" />
      <path d="M42,58 C46,54 52,56 54,60 C56,64 52,70 48,72 C44,74 38,68 38,64 C38,60 40,58 42,58Z" fill="#69f0ae" opacity="0.25" />
      <path d="M64,62 C68,58 76,60 78,66 C80,70 76,76 72,76 C68,76 62,70 64,62Z" fill="#69f0ae" opacity="0.2" />
      {/* Globe shine */}
      <ellipse cx="48" cy="44" rx="8" ry="12" fill="#fff" opacity="0.04" transform="rotate(-20 48 44)" />

      {/* Speech bubble 1 — top right */}
      <rect x="100" y="10" width="50" height="24" rx="6" fill="#e8a830" opacity="0.9" />
      <text x="125" y="22" textAnchor="middle" fill="#1a1a2e" fontSize="6" fontWeight="bold" fontFamily="system-ui">
        হ্যালো
      </text>
      <text x="125" y="30" textAnchor="middle" fill="#1a1a2e" fontSize="4.5" fontFamily="system-ui" opacity="0.7">
        Bengali
      </text>

      {/* Speech bubble 2 — top left */}
      <rect x="4" y="4" width="44" height="24" rx="6" fill="#4fc3f7" opacity="0.85" />
      <text x="26" y="16" textAnchor="middle" fill="#1a1a2e" fontSize="6" fontWeight="bold" fontFamily="system-ui">
        Hello
      </text>
      <text x="26" y="24" textAnchor="middle" fill="#1a1a2e" fontSize="4.5" fontFamily="system-ui" opacity="0.7">
        English
      </text>

      {/* Speech bubble 3 — bottom right */}
      <rect x="104" y="72" width="50" height="24" rx="6" fill="#b39ddb" opacity="0.85" />
      <text x="129" y="84" textAnchor="middle" fill="#1a1a2e" fontSize="6" fontWeight="bold" fontFamily="system-ui">
        Halo
      </text>
      <text x="129" y="92" textAnchor="middle" fill="#1a1a2e" fontSize="4.5" fontFamily="system-ui" opacity="0.7">
        Indonesian
      </text>

      {/* Speech bubble 4 — bottom left */}
      <rect x="2" y="80" width="48" height="24" rx="6" fill="#ff6b9d" opacity="0.85" />
      <text x="26" y="92" textAnchor="middle" fill="#1a1a2e" fontSize="5.5" fontWeight="bold" fontFamily="system-ui">
        Walaikum
      </text>
      <text x="26" y="100" textAnchor="middle" fill="#1a1a2e" fontSize="4.5" fontFamily="system-ui" opacity="0.7">
        Ruáingga
      </text>
    </svg>
  );
}
