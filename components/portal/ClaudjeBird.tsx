interface ClaudjeBirdProps {
  size?: number;
  className?: string;
  style?: React.CSSProperties;
  /** Use light (gold) fills for dark backgrounds like header/sidebar */
  light?: boolean;
}

/**
 * Standing eagle — front-facing, bent-wing pose (upper arm up, primaries down).
 * Bald eagle colors: brown body/wings, white head, gold beak/talons.
 * Set light=true for gold fills on dark backgrounds.
 */
export default function ClaudjeBird({
  size = 48,
  className = "",
  style,
  light = false,
}: ClaudjeBirdProps) {
  const wing = light ? "#C9A96E" : "#3A2519";
  const wingDetail = light ? "#B8954F" : "#2C1810";
  const body = light ? "#C9A96E" : "#3A2519";
  const bodyDetail = light ? "#B8954F" : "#2C1810";

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 64 64"
      width={size}
      height={size}
      className={className}
      style={style}
    >
      {/* Left wing — bent pose: upper arm UP, primaries angle DOWN */}
      <path
        d="M24,28 L18,20 L12,10 L8,16 L6,12 L3,20 L2,16 L2,24 L10,28 L18,30 Z"
        fill={wing}
      />
      <path d="M18,30 L10,28 L14,28 L20,30 Z" fill={wingDetail} />

      {/* Right wing — bent pose (mirrored) */}
      <path
        d="M40,28 L46,20 L52,10 L56,16 L58,12 L61,20 L62,16 L62,24 L54,28 L46,30 Z"
        fill={wing}
      />
      <path d="M46,30 L54,28 L50,28 L44,30 Z" fill={wingDetail} />

      {/* Body */}
      <path
        d="M24,28 Q22,34 23,40 Q25,48 32,50 Q39,48 41,40 Q42,34 40,28 Z"
        fill={body}
      />
      <path
        d="M28,34 Q32,38 36,34 Q32,42 28,34 Z"
        fill={bodyDetail}
        opacity="0.4"
      />

      {/* Neck */}
      <path d="M28,20 Q28,24 24,28 L40,28 Q36,24 36,20 Z" fill={body} />

      {/* Head — white (bald eagle) */}
      <ellipse cx="32" cy="14" rx="6" ry="7" fill="#FAF6F0" />

      {/* Eyes */}
      <circle cx="29" cy="14" r="1.3" fill="#2C1810" />
      <circle cx="35" cy="14" r="1.3" fill="#2C1810" />
      <circle cx="29.3" cy="13.6" r="0.4" fill="#FAF6F0" />
      <circle cx="35.3" cy="13.6" r="0.4" fill="#FAF6F0" />

      {/* Beak — gold */}
      <path d="M30,17 L32,22 L34,17 Q32,19 30,17 Z" fill="#D4A030" />

      {/* Talons — gold */}
      <path
        d="M26,50 L24,56 L26,55 L28,57 L29,54 L28,50 Z"
        fill="#D4A030"
      />
      <path
        d="M38,50 L40,56 L38,55 L36,57 L35,54 L36,50 Z"
        fill="#D4A030"
      />
    </svg>
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

/**
 * Sidebar eagle — brown variant (matches favicon) on near-white background
 * for visibility on the dark brown sidebar.
 */
export function SidebarEagle({
  size = 24,
  className = "",
}: {
  size?: number;
  className?: string;
}) {
  return (
    <span
      className={`inline-flex items-center justify-center rounded-md ${className}`}
      style={{
        width: size + 8,
        height: size + 8,
        backgroundColor: "rgba(255, 255, 255, 0.9)",
      }}
    >
      <ClaudjeBird size={size} />
    </span>
  );
}
