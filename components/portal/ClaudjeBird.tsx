interface ClaudjeBirdProps {
  size?: number;
  className?: string;
  style?: React.CSSProperties;
}

/**
 * Geometric/robotic eagle mascot — front-facing, wings spread.
 * Blocky pixel-art style inspired by Claude Code mascot.
 * Dark brown body (#2C1810), gold accents (#C9A96E).
 */
export default function ClaudjeBird({
  size = 48,
  className = "",
  style,
}: ClaudjeBirdProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 32 32"
      width={size}
      height={size}
      className={className}
      style={style}
    >
      {/* Left wing */}
      <rect x="1" y="12" width="4" height="3" rx="0.5" fill="#C9A96E" />
      <rect x="3" y="10" width="4" height="3" rx="0.5" fill="#C9A96E" />
      <rect x="5" y="8" width="4" height="5" rx="0.5" fill="#B8954F" />
      {/* Right wing */}
      <rect x="27" y="12" width="4" height="3" rx="0.5" fill="#C9A96E" />
      <rect x="25" y="10" width="4" height="3" rx="0.5" fill="#C9A96E" />
      <rect x="23" y="8" width="4" height="5" rx="0.5" fill="#B8954F" />
      {/* Body */}
      <rect x="11" y="10" width="10" height="12" rx="1" fill="#2C1810" />
      {/* Chest */}
      <rect x="13" y="14" width="6" height="6" rx="0.5" fill="#3A2519" />
      {/* Head */}
      <rect x="12" y="3" width="8" height="8" rx="1" fill="#2C1810" />
      {/* White head patch (eagle marking) */}
      <rect x="13" y="4" width="6" height="3" rx="0.5" fill="#FAF6F0" />
      {/* Eyes */}
      <rect x="13.5" y="8" width="2" height="1.5" rx="0.3" fill="#C9A96E" />
      <rect x="16.5" y="8" width="2" height="1.5" rx="0.3" fill="#C9A96E" />
      {/* Beak */}
      <path d="M15,10 L16,12 L17,10 Z" fill="#C9A96E" />
      {/* Talons */}
      <rect x="12" y="22" width="3" height="2" rx="0.3" fill="#C9A96E" />
      <rect x="17" y="22" width="3" height="2" rx="0.3" fill="#C9A96E" />
      {/* Talon toes */}
      <rect x="11" y="24" width="2" height="1.5" rx="0.3" fill="#B8954F" />
      <rect x="13.5" y="24" width="2" height="1.5" rx="0.3" fill="#B8954F" />
      <rect x="16.5" y="24" width="2" height="1.5" rx="0.3" fill="#B8954F" />
      <rect x="19" y="24" width="2" height="1.5" rx="0.3" fill="#B8954F" />
    </svg>
  );
}

/**
 * Smaller eagle for sidebar — simplified.
 */
export function MiniBird({
  size = 20,
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
      viewBox="0 0 16 16"
      width={size}
      height={size}
      className={className}
      style={style}
    >
      {/* Wings */}
      <rect x="0" y="6" width="3" height="2" rx="0.3" fill="#C9A96E" />
      <rect x="13" y="6" width="3" height="2" rx="0.3" fill="#C9A96E" />
      {/* Body */}
      <rect x="5" y="5" width="6" height="7" rx="0.5" fill="#2C1810" />
      {/* Head */}
      <rect x="5.5" y="1" width="5" height="5" rx="0.5" fill="#2C1810" />
      {/* White patch */}
      <rect x="6.5" y="2" width="3" height="2" rx="0.3" fill="#FAF6F0" />
      {/* Eyes */}
      <rect x="6.5" y="4.5" width="1" height="1" fill="#C9A96E" />
      <rect x="8.5" y="4.5" width="1" height="1" fill="#C9A96E" />
      {/* Beak */}
      <path d="M7.5,5.5 L8,7 L8.5,5.5 Z" fill="#C9A96E" />
      {/* Talons */}
      <rect x="6" y="12" width="2" height="1" rx="0.2" fill="#C9A96E" />
      <rect x="8.5" y="12" width="2" height="1" rx="0.2" fill="#C9A96E" />
    </svg>
  );
}
