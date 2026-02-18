/**
 * Person at podium / speaking SVG illustration.
 */
export default function SpeakerIllustration({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 100" className={className} xmlns="http://www.w3.org/2000/svg" aria-label="Speaker illustration">
      {/* Podium */}
      <path d="M40,60 L35,95 L85,95 L80,60Z" fill="#2a2b45" />
      <rect x="44" y="62" width="32" height="3" rx="1" fill="#3a3b55" />

      {/* Person body */}
      <rect x="50" y="35" width="20" height="28" rx="4" fill="#e8a830" />
      {/* Arms */}
      <path d="M50,42 L38,52 L40,54" fill="none" stroke="#e8a830" strokeWidth="3" strokeLinecap="round" />
      <path d="M70,42 L82,50 L80,52" fill="none" stroke="#e8a830" strokeWidth="3" strokeLinecap="round" />
      {/* Hands */}
      <circle cx="40" cy="54" r="2.5" fill="#f0c8a0" />
      <circle cx="80" cy="52" r="2.5" fill="#f0c8a0" />

      {/* Head */}
      <circle cx="60" cy="24" r="12" fill="#f0c8a0" />
      {/* Hair */}
      <path d="M48,20 C48,10 55,6 60,6 C65,6 72,10 72,20 C72,14 65,10 60,10 C55,10 48,14 48,20Z" fill="#4a3520" />
      {/* Eyes */}
      <circle cx="55" cy="24" r="2" fill="#1a1a2e" />
      <circle cx="65" cy="24" r="2" fill="#1a1a2e" />
      <circle cx="54.5" cy="23.3" r="0.8" fill="#fff" opacity="0.6" />
      <circle cx="64.5" cy="23.3" r="0.8" fill="#fff" opacity="0.6" />
      {/* Smile */}
      <path d="M56,29 Q60,32 64,29" fill="none" stroke="#1a1a2e" strokeWidth="1" strokeLinecap="round" />

      {/* Microphone */}
      <circle cx="40" cy="53" r="3" fill="#3a3b55" />
      <rect x="39" y="55" width="2" height="6" fill="#3a3b55" />
    </svg>
  );
}
