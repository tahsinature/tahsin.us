/**
 * Workspace / desk SVG illustration — monitor, keyboard, coffee.
 */
export default function WorkspaceIllustration({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 160 100" className={className} xmlns="http://www.w3.org/2000/svg" aria-label="Workspace setup">
      {/* Desk surface */}
      <rect x="5" y="72" width="150" height="6" rx="2" fill="#2a2b45" />

      {/* Monitor */}
      <rect x="35" y="16" width="90" height="52" rx="3" fill="#1a1a2e" stroke="#3a3b55" strokeWidth="1" />
      {/* Screen */}
      <rect x="39" y="20" width="82" height="44" rx="1" fill="#0f1020" />
      {/* Code lines on screen */}
      <rect x="44" y="26" width="30" height="2" rx="1" fill="#4fc3f7" opacity="0.6" />
      <rect x="44" y="31" width="45" height="2" rx="1" fill="#69f0ae" opacity="0.5" />
      <rect x="50" y="36" width="35" height="2" rx="1" fill="#ffd644" opacity="0.5" />
      <rect x="50" y="41" width="40" height="2" rx="1" fill="#b39ddb" opacity="0.4" />
      <rect x="44" y="46" width="28" height="2" rx="1" fill="#ff6b9d" opacity="0.5" />
      <rect x="44" y="51" width="50" height="2" rx="1" fill="#4fc3f7" opacity="0.4" />
      <rect x="50" y="56" width="22" height="2" rx="1" fill="#69f0ae" opacity="0.5" />
      {/* Monitor stand */}
      <rect x="74" y="68" width="12" height="4" rx="1" fill="#2a2b45" />
      <rect x="68" y="70" width="24" height="3" rx="1" fill="#2a2b45" />

      {/* Keyboard */}
      <rect x="48" y="76" width="64" height="10" rx="2" fill="#252640" stroke="#3a3b55" strokeWidth="0.5" />
      {/* Key rows */}
      {[0, 1, 2].map((row) => Array.from({ length: 8 }).map((_, col) => <rect key={`${row}-${col}`} x={52 + col * 7} y={78 + row * 3} width={5} height={2} rx={0.5} fill="#3a3b55" opacity="0.7" />))}

      {/* Coffee cup */}
      <rect x="12" y="60" width="14" height="12" rx="2" fill="#4a3520" />
      <path d="M26,63 C30,63 30,69 26,69" fill="none" stroke="#4a3520" strokeWidth="1.5" />
      {/* Steam */}
      <path d="M16,58 Q17,54 16,50" fill="none" stroke="#9ba0b8" strokeWidth="0.8" opacity="0.4" />
      <path d="M20,57 Q21,52 20,48" fill="none" stroke="#9ba0b8" strokeWidth="0.8" opacity="0.3" />

      {/* Plant */}
      <rect x="132" y="58" width="12" height="14" rx="2" fill="#4a3520" />
      <circle cx="138" cy="52" r="8" fill="#69f0ae" opacity="0.6" />
      <circle cx="134" cy="50" r="5" fill="#69f0ae" opacity="0.5" />
      <circle cx="142" cy="49" r="6" fill="#69f0ae" opacity="0.55" />
    </svg>
  );
}
