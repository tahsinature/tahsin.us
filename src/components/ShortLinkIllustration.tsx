import type { ShortLinkTheme } from "@shared/short-links";

export default function ShortLinkIllustration({ theme }: { theme: ShortLinkTheme }) {
  return (
    <svg viewBox="0 0 320 240" fill="none" aria-hidden="true" className="short-link-illustration">
      <circle cx="160" cy="116" r="95" className="short-link-orbit" />
      <circle cx="160" cy="116" r="72" className="short-link-orbit" strokeDasharray="2 9" />
      <path d="M40 201H280" className="short-link-orbit" />
      <circle cx="78" cy="68" r="5" fill="currentColor" opacity=".55" />
      <circle cx="248" cy="153" r="3" fill="currentColor" opacity=".6" />
      <path d="M258 63V75M252 69H264M55 139V147M51 143H59" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      {theme === "meeting" ? (
        <g stroke="currentColor" strokeWidth="3" strokeLinejoin="round">
          <rect x="89" y="67" width="120" height="98" rx="20" className="short-link-illustration-fill" />
          <path d="M209 102L244 82V150L209 130Z" className="short-link-illustration-fill" />
          <path d="M109 165L101 189H199L191 165" opacity=".45" />
          <circle cx="149" cy="107" r="12" opacity=".8" />
          <path d="M127 143C127 121 171 121 171 143" strokeLinecap="round" opacity=".8" />
        </g>
      ) : (
        <g stroke="currentColor" strokeWidth="9" strokeLinecap="round">
          <rect x="85" y="94" width="100" height="48" rx="24" transform="rotate(-35 135 118)" className="short-link-illustration-fill" />
          <rect x="139" y="94" width="100" height="48" rx="24" transform="rotate(-35 189 118)" className="short-link-illustration-fill" />
          <path d="M142 130L181 103" />
        </g>
      )}
      <circle cx="227" cy="179" r="22" className="short-link-status" />
      <path d="M227 168V180L235 185" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
