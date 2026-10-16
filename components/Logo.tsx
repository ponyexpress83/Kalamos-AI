/**
 * Logo Kalamos·AI — emblema (libro/pagine a ventaglio che formano una K) +
 * wordmark. Ricostruito come SVG scalabile nei colori di brand.
 *
 * variant "ink"  → emblema scuro su fondo chiaro (default)
 * variant "paper"→ emblema chiaro su fondo scuro
 */
export default function Logo({
  height = 40,
  wordmark = true,
  variant = "ink",
  className = "",
}: {
  height?: number;
  wordmark?: boolean;
  variant?: "ink" | "paper";
  className?: string;
}) {
  const width = Math.round((height * 88) / 76);
  const kFill = variant === "paper" ? "#f7f3ec" : "#14213d";
  const stroke = variant === "paper" ? "#0e1830" : "#14213d";
  const wordColor = variant === "paper" ? "text-carta" : "text-inchiostro";

  return (
    <span className={`inline-flex items-center gap-3 ${className}`}>
      <svg
        height={height}
        width={width}
        viewBox="0 0 88 76"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        role="img"
        aria-label="Kalamos AI"
      >
        <g stroke={stroke} strokeWidth="1.4" strokeLinejoin="round">
          <rect x="40" y="20" width="8" height="46" rx="3" fill="#efe6d3" transform="rotate(-34 44 66)" />
          <rect x="40" y="20" width="8" height="46" rx="3" fill="#f0e8d6" transform="rotate(-23 44 66)" />
          <rect x="40" y="20" width="8" height="46" rx="3" fill="#f2ecdc" transform="rotate(-12 44 66)" />
        </g>
        <g fill={kFill}>
          <rect x="39" y="16" width="9" height="50" rx="2.5" />
          <path d="M46 41 L72 13 L79 20 L53 41 Z" />
          <path d="M46 41 L72 69 L79 62 L53 41 Z" />
        </g>
        <path d="M46 41 L60 26 L64 30 L52 44 Z" fill="#cb5a3c" />
      </svg>

      {wordmark && (
        <span
          className={`font-serif font-semibold tracking-[0.14em] ${wordColor}`}
          style={{ fontSize: Math.round(height * 0.52) }}
        >
          KALAMOS <span className="text-accento">AI</span>
        </span>
      )}
    </span>
  );
}
