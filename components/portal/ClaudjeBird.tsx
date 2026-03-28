import Image from "next/image";

interface ClaudjeBirdProps {
  size?: number;
  className?: string;
  style?: React.CSSProperties;
  light?: boolean;
}

export default function ClaudjeBird({
  size = 48,
  className = "",
  style,
}: ClaudjeBirdProps) {
  return (
    <Image
      src="/logo.svg"
      alt="claudje eagle"
      width={size}
      height={size}
      className={className}
      style={style}
    />
  );
}

/**
 * Flying eagle — side-view for animation.
 * Brown body/wings, white head, gold beak.
 * Wings are separate <g> elements with pivot points for CSS rotation.
 */
export function FlyingEagle({
  size = 100,
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
      viewBox="0 0 100 50"
      width={size}
      height={size * 0.5}
      className={className}
      style={style}
    >
      {/* Tail feathers — white (bald eagle) */}
      <path d="M34,28 L20,24 L14,28 L18,30 L22,34 L34,32 Z" fill="#FFFFFF" stroke="#3A2519" strokeWidth="0.3" />

      {/* Body — streamlined */}
      <ellipse cx="52" cy="28" rx="16" ry="5" fill="#3A2519" />
      <ellipse cx="52" cy="30" rx="12" ry="3" fill="#2C1810" opacity="0.3" />

      {/* Upper wing — pivots at shoulder (48, 26) */}
      <g transform="translate(48, 26)">
        <g className="eagle-wing">
          <g transform="translate(-48, -26)">
            <path
              d="M48,26 L36,16 L24,6 L16,0 L22,8 L12,2 L20,12 L8,6 L18,18 L32,26 Z"
              fill="#3A2519"
            />
            <path d="M32,26 L18,18 L24,22 Z" fill="#2C1810" opacity="0.5" />
          </g>
        </g>
      </g>

      {/* Far wing — peeks below body, pivots at (52, 30) */}
      <g transform="translate(52, 30)">
        <g className="eagle-wing-far">
          <g transform="translate(-52, -30)">
            <path
              d="M52,30 L42,36 L34,42 L30,46 L36,40 L28,44 L38,36 Z"
              fill="#2C1810"
              opacity="0.6"
            />
          </g>
        </g>
      </g>

      {/* Talons — orange */}
      <path d="M46,33 L44,37 L46,36 L48,38 L47,33 Z" fill="#E86F00" />
      <path d="M54,33 L52,37 L54,36 L56,38 L55,33 Z" fill="#E86F00" />

      {/* Head — angular, aggressive profile */}
      <path d="M66,25 L67,20 L74,19 L78,22 L78,26 Q76,29 72,29 Q67,29 66,25 Z" fill="#FFFFFF" stroke="#3A2519" strokeWidth="0.5" />
      {/* Eye */}
      <circle cx="74" cy="23" r="1.2" fill="#2C1810" />
      <circle cx="74.3" cy="22.7" r="0.4" fill="#FAF6F0" />
      {/* Beak — hooked, gold */}
      <path
        d="M77,24 L84,26 L82,28 L78,27 Q80,25 77,24 Z"
        fill="#D4A030"
      />
      <path d="M78,25 L82,26.5 L80,27.5 Z" fill="#B8860B" />
    </svg>
  );
}

