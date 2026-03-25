interface ClaudjeBirdProps {
  size?: number;
  className?: string;
  style?: React.CSSProperties;
}

/**
 * Standing eagle — front-facing, wings fully spread with feather tips.
 * Gold (#C9A96E) on transparent background.
 * Used for favicon and general branding placements.
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
      {/* Left wing — large spread with feather tips */}
      <path
        d="M24,28 L16,20 L8,10 L4,6 L6,12 L1,10 L4,18 L1,16 L6,24 L14,28 Z"
        fill="#C9A96E"
      />
      <path d="M24,28 L14,22 L10,20 L14,24 Z" fill="#B8954F" opacity="0.5" />

      {/* Right wing — large spread with feather tips */}
      <path
        d="M40,28 L48,20 L56,10 L60,6 L58,12 L63,10 L60,18 L63,16 L58,24 L50,28 Z"
        fill="#C9A96E"
      />
      <path d="M40,28 L50,22 L54,20 L50,24 Z" fill="#B8954F" opacity="0.5" />

      {/* Body */}
      <path
        d="M24,28 Q22,34 23,40 Q25,48 32,50 Q39,48 41,40 Q42,34 40,28 Z"
        fill="#C9A96E"
      />
      <path
        d="M28,34 Q32,38 36,34 Q32,42 28,34 Z"
        fill="#B8954F"
        opacity="0.4"
      />

      {/* Neck */}
      <path d="M28,20 Q28,24 24,28 L40,28 Q36,24 36,20 Z" fill="#C9A96E" />

      {/* Head */}
      <ellipse cx="32" cy="14" rx="6" ry="7" fill="#FAF6F0" />
      {/* Dark cap */}
      <path
        d="M26,12 Q27,6 32,5 Q37,6 38,12 Q35,9 32,9 Q29,9 26,12 Z"
        fill="#3A2519"
      />

      {/* Eyes */}
      <circle cx="29" cy="14" r="1.3" fill="#2C1810" />
      <circle cx="35" cy="14" r="1.3" fill="#2C1810" />
      <circle cx="29.3" cy="13.6" r="0.4" fill="#FAF6F0" />
      <circle cx="35.3" cy="13.6" r="0.4" fill="#FAF6F0" />

      {/* Beak */}
      <path d="M30,17 L32,22 L34,17 Q32,19 30,17 Z" fill="#D4A030" />

      {/* Talons */}
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
 * Wings are separate <g> elements with transform pivot points
 * so CSS can rotate them for flapping animation.
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
      {/* Tail feathers */}
      <path d="M34,28 L20,24 L14,28 L18,30 L22,34 L34,32 Z" fill="#B8954F" />

      {/* Body — streamlined */}
      <ellipse cx="52" cy="28" rx="16" ry="5" fill="#C9A96E" />
      <ellipse cx="52" cy="30" rx="12" ry="3" fill="#B8954F" opacity="0.3" />

      {/* Upper wing — pivots at shoulder (48, 26) */}
      <g transform="translate(48, 26)">
        <g className="eagle-wing">
          <g transform="translate(-48, -26)">
            <path
              d="M48,26 L36,16 L24,6 L16,0 L22,8 L12,2 L20,12 L8,6 L18,18 L32,26 Z"
              fill="#C9A96E"
            />
            <path d="M32,26 L18,18 L24,22 Z" fill="#B8954F" opacity="0.5" />
          </g>
        </g>
      </g>

      {/* Far wing — peeks below body, pivots at (52, 30) */}
      <g transform="translate(52, 30)">
        <g className="eagle-wing-far">
          <g transform="translate(-52, -30)">
            <path
              d="M52,30 L42,36 L34,42 L30,46 L36,40 L28,44 L38,36 Z"
              fill="#B8954F"
              opacity="0.6"
            />
          </g>
        </g>
      </g>

      {/* Head */}
      <ellipse cx="72" cy="24" rx="6" ry="5" fill="#FAF6F0" />
      {/* Dark cap */}
      <path
        d="M67,22 Q68,17 72,15 Q76,17 77,22 Q75,19 72,19 Q69,19 67,22 Z"
        fill="#3A2519"
      />
      {/* Eye */}
      <circle cx="74" cy="23" r="1.2" fill="#2C1810" />
      <circle cx="74.3" cy="22.7" r="0.4" fill="#FAF6F0" />
      {/* Beak — hooked */}
      <path
        d="M77,24 L84,26 L82,28 L78,27 Q80,25 77,24 Z"
        fill="#D4A030"
      />
      <path d="M78,25 L82,26.5 L80,27.5 Z" fill="#B8860B" />
    </svg>
  );
}

/**
 * Sidebar eagle — same natural-color eagle on a subtle light background
 * so it pops on the dark brown sidebar.
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
        backgroundColor: "rgba(250, 246, 240, 0.15)",
      }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 64 64"
        width={size}
        height={size}
      >
        {/* Left wing */}
        <path
          d="M24,28 L16,20 L8,10 L4,6 L6,12 L1,10 L4,18 L1,16 L6,24 L14,28 Z"
          fill="#C9A96E"
        />
        {/* Right wing */}
        <path
          d="M40,28 L48,20 L56,10 L60,6 L58,12 L63,10 L60,18 L63,16 L58,24 L50,28 Z"
          fill="#C9A96E"
        />
        {/* Body */}
        <path
          d="M24,28 Q22,34 23,40 Q25,48 32,50 Q39,48 41,40 Q42,34 40,28 Z"
          fill="#C9A96E"
        />
        {/* Neck */}
        <path d="M28,20 Q28,24 24,28 L40,28 Q36,24 36,20 Z" fill="#C9A96E" />
        {/* Head */}
        <ellipse cx="32" cy="14" rx="6" ry="7" fill="#FAF6F0" />
        {/* Eyes */}
        <circle cx="29" cy="14" r="1.3" fill="#2C1810" />
        <circle cx="35" cy="14" r="1.3" fill="#2C1810" />
        {/* Beak */}
        <path d="M30,17 L32,22 L34,17 Z" fill="#D4A030" />
        {/* Talons */}
        <path d="M26,50 L24,56 L28,57 L29,54 L28,50 Z" fill="#D4A030" />
        <path d="M38,50 L40,56 L36,57 L35,54 L36,50 Z" fill="#D4A030" />
      </svg>
    </span>
  );
}
