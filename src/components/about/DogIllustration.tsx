/**
 * Cute dog SVG illustration for the about page.
 * Stylised sitting dog with big eyes — matches CatIllustration style.
 */
export default function DogIllustration({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 120" className={className} xmlns="http://www.w3.org/2000/svg" aria-label="Dog illustration">
      {/* Body */}
      <ellipse cx="60" cy="82" rx="30" ry="24" fill="#3d2e1e" />
      {/* Tail */}
      <path d="M90,78 C102,68 108,56 100,48" stroke="#3d2e1e" strokeWidth="6" strokeLinecap="round" fill="none" />
      <circle cx="100" cy="47" r="4" fill="#ffd644" />
      {/* Head */}
      <ellipse cx="60" cy="48" rx="24" ry="22" fill="#3d2e1e" />
      {/* Snout */}
      <ellipse cx="60" cy="58" rx="12" ry="9" fill="#5a4332" />
      {/* Floppy ears */}
      <path d="M38,40 C28,36 22,48 26,60 C30,62 36,56 40,48Z" fill="#2a1e10" />
      <path d="M82,40 C92,36 98,48 94,60 C90,62 84,56 80,48Z" fill="#2a1e10" />
      {/* Eyes */}
      <ellipse cx="48" cy="46" rx="5" ry="6" fill="#1a1a2e" />
      <ellipse cx="72" cy="46" rx="5" ry="6" fill="#1a1a2e" />
      <circle cx="46" cy="44" r="2" fill="#fff" opacity="0.7" />
      <circle cx="70" cy="44" r="2" fill="#fff" opacity="0.7" />
      {/* Nose */}
      <ellipse cx="60" cy="54" rx="4" ry="3" fill="#1a1a2e" />
      <ellipse cx="60" cy="53.5" rx="2" ry="1" fill="#fff" opacity="0.15" />
      {/* Mouth */}
      <path d="M60,57 Q56,62 52,60" fill="none" stroke="#4a4f6a" strokeWidth="1" strokeLinecap="round" />
      <path d="M60,57 Q64,62 68,60" fill="none" stroke="#4a4f6a" strokeWidth="1" strokeLinecap="round" />
      {/* Tongue */}
      <path d="M58,60 Q60,66 62,60" fill="#ff6b9d" />
      {/* Paws */}
      <ellipse cx="44" cy="102" rx="7" ry="4" fill="#3d2e1e" />
      <ellipse cx="76" cy="102" rx="7" ry="4" fill="#3d2e1e" />
      {/* Paw toes */}
      <circle cx="40" cy="101" r="1.5" fill="#5a4332" />
      <circle cx="44" cy="100" r="1.5" fill="#5a4332" />
      <circle cx="48" cy="101" r="1.5" fill="#5a4332" />
      <circle cx="72" cy="101" r="1.5" fill="#5a4332" />
      <circle cx="76" cy="100" r="1.5" fill="#5a4332" />
      <circle cx="80" cy="101" r="1.5" fill="#5a4332" />
      {/* Chest patch */}
      <ellipse cx="60" cy="78" rx="14" ry="10" fill="#5a4332" opacity="0.5" />
    </svg>
  );
}
