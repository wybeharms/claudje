interface ClaudjeBirdProps {
  size?: number;
  className?: string;
  style?: React.CSSProperties;
}

/**
 * Standing eagle — front-facing, wings spread.
 * Used for favicon, sidebar, static placements.
 * Gold (#C9A96E) on transparent (caller provides background).
 */
export default function ClaudjeBird({
  size = 48,
  className = "",
  style,
}: ClaudjeBirdProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 64 64"
      width={size}
      height={size}
      className={className}
      style={style}
    >
      {/* Left wing — spread out */}
      <path d="M8,30 Q4,22 2,16 Q6,18 12,17 Q10,20 14,24 Q12,26 14,30 Z" fill="#C9A96E" />
      <path d="M14,30 Q16,26 18,24 L20,30 Z" fill="#B8954F" />
      {/* Right wing — spread out */}
      <path d="M56,30 Q60,22 62,16 Q58,18 52,17 Q54,20 50,24 Q52,26 50,30 Z" fill="#C9A96E" />
      <path d="M50,30 Q48,26 46,24 L44,30 Z" fill="#B8954F" />
      {/* Body */}
      <path d="M24,28 Q22,32 22,40 Q24,46 32,48 Q40,46 42,40 Q42,32 40,28 Z" fill="#C9A96E" />
      {/* Chest feather detail */}
      <path d="M27,34 Q32,38 37,34 Q32,42 27,34 Z" fill="#B8954F" opacity="0.5" />
      {/* Neck */}
      <path d="M26,24 Q26,28 24,30 L40,30 Q38,28 38,24 Z" fill="#C9A96E" />
      {/* Head */}
      <ellipse cx="32" cy="18" rx="8" ry="9" fill="#FAF6F0" />
      {/* Head top (brown cap) */}
      <path d="M24,16 Q24,10 32,9 Q40,10 40,16 Q36,14 32,14 Q28,14 24,16 Z" fill="#2C1810" />
      {/* Eyes */}
      <circle cx="28" cy="18" r="1.5" fill="#2C1810" />
      <circle cx="36" cy="18" r="1.5" fill="#2C1810" />
      {/* Eye shine */}
      <circle cx="28.5" cy="17.5" r="0.5" fill="#FAF6F0" />
      <circle cx="36.5" cy="17.5" r="0.5" fill="#FAF6F0" />
      {/* Beak */}
      <path d="M30,21 L32,26 L34,21 Q32,22.5 30,21 Z" fill="#D4A030" />
      <path d="M30.5,21.5 L32,24 L33.5,21.5 Q32,22 30.5,21.5 Z" fill="#B8860B" />
      {/* Talons */}
      <path d="M26,48 L24,54 L26,53 L28,55 L29,52 L28,48 Z" fill="#D4A030" />
      <path d="M38,48 L40,54 L38,53 L36,55 L35,52 L36,48 Z" fill="#D4A030" />
    </svg>
  );
}

/**
 * Flying eagle — side-view, for animations.
 * Wings are separate elements so they can be animated.
 */
export function FlyingEagle({
  size = 64,
  className = "",
  style,
}: {
  size?: number;
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 80 40"
      width={size}
      height={size * 0.5}
      className={className}
      style={style}
    >
      {/* Upper wing */}
      <path
        className="eagle-wing"
        d="M20,18 Q10,8 2,2 Q8,10 14,14 Q10,12 4,6 Q12,14 18,16 Z"
        fill="#C9A96E"
      />
      <path
        className="eagle-wing"
        d="M56,18 Q66,8 74,2 Q68,10 62,14 Q66,12 72,6 Q64,14 58,16 Z"
        fill="#C9A96E"
      />
      {/* Lower wing feathers */}
      <path
        className="eagle-wing"
        d="M18,18 Q12,16 6,10 Q14,16 20,18 Z"
        fill="#B8954F"
      />
      <path
        className="eagle-wing"
        d="M58,18 Q64,16 70,10 Q62,16 56,18 Z"
        fill="#B8954F"
      />
      {/* Body */}
      <ellipse cx="38" cy="20" rx="20" ry="7" fill="#C9A96E" />
      {/* Body shading */}
      <ellipse cx="38" cy="22" rx="16" ry="4" fill="#B8954F" opacity="0.4" />
      {/* Tail */}
      <path d="M18,18 L8,22 L10,20 L6,24 L14,20 L18,22 Z" fill="#B8954F" />
      {/* Head */}
      <ellipse cx="58" cy="17" rx="6" ry="5" fill="#FAF6F0" />
      {/* Head top */}
      <path d="M53,15 Q54,11 58,10 Q62,11 63,15 Q60,13 58,13 Q56,13 53,15 Z" fill="#2C1810" />
      {/* Eye */}
      <circle cx="60" cy="16" r="1.2" fill="#2C1810" />
      <circle cx="60.3" cy="15.7" r="0.4" fill="#FAF6F0" />
      {/* Beak */}
      <path d="M63,17 L68,18 L63,19.5 Q64,18.5 63,17 Z" fill="#D4A030" />
      <path d="M64,17.5 L67,18 L64,19 Z" fill="#B8860B" />
    </svg>
  );
}

/**
 * Sidebar eagle — cream/gold colors for visibility on dark brown sidebar.
 */
export function SidebarEagle({
  size = 24,
  className = "",
}: {
  size?: number;
  className?: string;
}) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 64 64"
      width={size}
      height={size}
      className={className}
    >
      {/* Wings — gold */}
      <path d="M8,30 Q4,22 2,16 Q6,18 12,17 Q10,20 14,24 Q12,26 14,30 Z" fill="#C9A96E" />
      <path d="M56,30 Q60,22 62,16 Q58,18 52,17 Q54,20 50,24 Q52,26 50,30 Z" fill="#C9A96E" />
      {/* Body — cream */}
      <path d="M24,28 Q22,32 22,40 Q24,46 32,48 Q40,46 42,40 Q42,32 40,28 Z" fill="#FAF6F0" />
      {/* Neck */}
      <path d="M26,24 Q26,28 24,30 L40,30 Q38,28 38,24 Z" fill="#FAF6F0" />
      {/* Head */}
      <ellipse cx="32" cy="18" rx="8" ry="9" fill="#FAF6F0" />
      {/* Eyes */}
      <circle cx="28" cy="18" r="1.5" fill="#2C1810" />
      <circle cx="36" cy="18" r="1.5" fill="#2C1810" />
      {/* Beak */}
      <path d="M30,21 L32,26 L34,21 Z" fill="#C9A96E" />
      {/* Talons */}
      <path d="M26,48 L24,54 L28,55 L29,52 L28,48 Z" fill="#C9A96E" />
      <path d="M38,48 L40,54 L36,55 L35,52 L36,48 Z" fill="#C9A96E" />
    </svg>
  );
}
