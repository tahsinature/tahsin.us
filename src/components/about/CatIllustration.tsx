/**
 * Cute cat SVG illustration for the about page.
 * Stylised sitting cat with big eyes — dark-theme friendly.
 */
export default function CatIllustration({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 120" className={className} xmlns="http://www.w3.org/2000/svg" aria-label="Cat illustration">
      {/* Body */}
      <ellipse cx="60" cy="82" rx="28" ry="22" fill="#2a2b45" />
      {/* Tail */}
      <path d="M88,82 C100,70 105,55 95,50" stroke="#2a2b45" strokeWidth="6" strokeLinecap="round" fill="none" />
      <circle cx="95" cy="49" r="4" fill="#ffd644" />
      {/* Head */}
      <ellipse cx="60" cy="50" rx="22" ry="20" fill="#2a2b45" />
      {/* Ears */}
      <path d="M40,38 L35,18 L50,32Z" fill="#2a2b45" />
      <path d="M80,38 L85,18 L70,32Z" fill="#2a2b45" />
      <path d="M42,36 L38,22 L50,33Z" fill="#ff6b9d" opacity="0.4" />
      <path d="M78,36 L82,22 L70,33Z" fill="#ff6b9d" opacity="0.4" />
      {/* Eyes */}
      <ellipse cx="50" cy="48" rx="5" ry="6" fill="#1a1a2e" />
      <ellipse cx="70" cy="48" rx="5" ry="6" fill="#1a1a2e" />
      <circle cx="48" cy="46" r="2" fill="#fff" opacity="0.7" />
      <circle cx="68" cy="46" r="2" fill="#fff" opacity="0.7" />
      {/* Nose */}
      <path d="M58,54 L60,56 L62,54Z" fill="#ff6b9d" />
      {/* Mouth */}
      <path d="M60,56 Q57,60 54,58" fill="none" stroke="#4a4f6a" strokeWidth="1" strokeLinecap="round" />
      <path d="M60,56 Q63,60 66,58" fill="none" stroke="#4a4f6a" strokeWidth="1" strokeLinecap="round" />
      {/* Whiskers */}
      <line x1="30" y1="50" x2="46" y2="52" stroke="#4a4f6a" strokeWidth="0.8" />
      <line x1="30" y1="55" x2="46" y2="55" stroke="#4a4f6a" strokeWidth="0.8" />
      <line x1="74" y1="52" x2="90" y2="50" stroke="#4a4f6a" strokeWidth="0.8" />
      <line x1="74" y1="55" x2="90" y2="55" stroke="#4a4f6a" strokeWidth="0.8" />
      {/* Paws */}
      <ellipse cx="48" cy="100" rx="6" ry="4" fill="#2a2b45" />
      <ellipse cx="72" cy="100" rx="6" ry="4" fill="#2a2b45" />
    </svg>
  );
}
