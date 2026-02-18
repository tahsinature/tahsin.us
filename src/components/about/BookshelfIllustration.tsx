/**
 * Bookshelf SVG illustration — a row of colourful book spines.
 */
export default function BookshelfIllustration({ className = "" }: { className?: string }) {
  const books = [
    { x: 8, w: 10, h: 55, color: "#ff6b9d", label: "" },
    { x: 20, w: 8, h: 50, color: "#4fc3f7", label: "" },
    { x: 30, w: 12, h: 58, color: "#ffd644", label: "" },
    { x: 44, w: 9, h: 48, color: "#b39ddb", label: "" },
    { x: 55, w: 11, h: 54, color: "#69f0ae", label: "" },
    { x: 68, w: 8, h: 52, color: "#ff8833", label: "" },
    { x: 78, w: 13, h: 56, color: "#4fc3f7", label: "" },
    { x: 93, w: 9, h: 50, color: "#ff6b9d", label: "" },
  ];

  return (
    <svg viewBox="0 0 110 70" className={className} xmlns="http://www.w3.org/2000/svg" aria-label="Bookshelf">
      {/* Shelf */}
      <rect x="2" y="62" width="106" height="4" rx="1" fill="#2a2b45" />
      {/* Books */}
      {books.map((b, i) => (
        <g key={i}>
          <rect x={b.x} y={62 - b.h} width={b.w} height={b.h} rx="1" fill={b.color} opacity="0.85" />
          {/* Spine line */}
          <line x1={b.x + b.w / 2} y1={62 - b.h + 5} x2={b.x + b.w / 2} y2={62 - 5} stroke="#0008" strokeWidth="0.5" />
        </g>
      ))}
    </svg>
  );
}
