interface ClaudjeBirdProps {
  size?: number;
  color?: string;
  accentColor?: string;
  className?: string;
}

export default function ClaudjeBird({
  size = 48,
  color = "#C9A96E",
  accentColor = "#B8954F",
  className = "",
}: ClaudjeBirdProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="-12 -12 24 24"
      width={size}
      height={size}
      className={className}
    >
      {/* Wing (spread, upper) */}
      <path d="M-4,-2 Q-8,-8 -2,-10 Q2,-8 0,-4 Z" fill={color} />
      {/* Wing (spread, lower) */}
      <path d="M-4,-1 Q-10,-2 -10,4 Q-6,2 -2,0 Z" fill={accentColor} />
      {/* Body */}
      <ellipse cx="0" cy="0" rx="4" ry="3" fill={color} />
      {/* Head */}
      <circle cx="4" cy="-2" r="2.5" fill={color} />
      {/* Beak */}
      <path d="M6,-2.5 L9,-2 L6,-1.5 Z" fill={accentColor} />
      {/* Eye */}
      <circle cx="4.8" cy="-2.5" r="0.6" fill="#2C1810" />
      {/* Tail feathers */}
      <path d="M-4,1 L-8,3 L-7,0 Z" fill={accentColor} />
      <path d="M-4,2 L-9,5 L-7,1 Z" fill={color} opacity="0.8" />
    </svg>
  );
}

export function MiniBird({
  size = 16,
  color = "#C9A96E",
  className = "",
  style,
}: {
  size?: number;
  color?: string;
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="-6 -6 12 12"
      width={size}
      height={size}
      className={className}
      style={style}
    >
      {/* Simplified bird for small sizes */}
      <ellipse cx="0" cy="0" rx="3" ry="2" fill={color} />
      <circle cx="2.5" cy="-1" r="1.5" fill={color} />
      <path d="M3.5,-1.5 L5.5,-1 L3.5,-0.5 Z" fill={color} />
      <path d="M-3,0.5 L-5,2 L-4,-0.5 Z" fill={color} opacity="0.7" />
    </svg>
  );
}
