import { ImageResponse } from "next/og";

export const alt = "claudje — Competitor Intelligence for SMBs";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  const dmSerifData = await fetch(
    "https://fonts.googleapis.com/css2?family=DM+Serif+Display&display=swap"
  )
    .then((res) => res.text())
    .then((css) => {
      const match = css.match(/src: url\(([^)]+)\)/);
      return match ? fetch(match[1]).then((res) => res.arrayBuffer()) : null;
    });

  const jakartaData = await fetch(
    "https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@500&display=swap"
  )
    .then((res) => res.text())
    .then((css) => {
      const match = css.match(/src: url\(([^)]+)\)/);
      return match ? fetch(match[1]).then((res) => res.arrayBuffer()) : null;
    });

  const fonts: { name: string; data: ArrayBuffer; style: "normal"; weight: 400 | 500 }[] =
    [];
  if (dmSerifData) {
    fonts.push({ name: "DM Serif Display", data: dmSerifData, style: "normal", weight: 400 });
  }
  if (jakartaData) {
    fonts.push({ name: "Plus Jakarta Sans", data: jakartaData, style: "normal", weight: 500 });
  }

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "#2C1810",
          position: "relative",
        }}
      >
        {/* Hawk mascot */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 64 64"
          width="80"
          height="80"
          style={{ marginBottom: 16 }}
        >
          <path
            d="M24,28 L18,20 L12,10 L8,16 L6,12 L3,20 L2,16 L2,24 L10,28 L18,30 Z"
            fill="#3A2519"
          />
          <path d="M18,30 L10,28 L14,28 L20,30 Z" fill="#2C1810" />
          <path
            d="M40,28 L46,20 L52,10 L56,16 L58,12 L61,20 L62,16 L62,24 L54,28 L46,30 Z"
            fill="#3A2519"
          />
          <path d="M46,30 L54,28 L50,28 L44,30 Z" fill="#2C1810" />
          <path
            d="M24,28 Q22,34 23,40 Q25,48 32,50 Q39,48 41,40 Q42,34 40,28 Z"
            fill="#3A2519"
          />
          <path
            d="M28,20 Q28,24 24,28 L40,28 Q36,24 36,20 Z"
            fill="#3A2519"
          />
          <ellipse cx="32" cy="14" rx="6" ry="7" fill="#FAF6F0" />
          <circle cx="29" cy="14" r="1.3" fill="#2C1810" />
          <circle cx="35" cy="14" r="1.3" fill="#2C1810" />
          <path d="M30,17 L32,22 L34,17 Q32,19 30,17 Z" fill="#D4A030" />
          <path
            d="M26,50 L24,56 L26,55 L28,57 L29,54 L28,50 Z"
            fill="#D4A030"
          />
          <path
            d="M38,50 L40,56 L38,55 L36,57 L35,54 L36,50 Z"
            fill="#D4A030"
          />
        </svg>

        {/* Brand name */}
        <div
          style={{
            fontFamily: "DM Serif Display",
            fontSize: 72,
            color: "#FAF6F0",
            letterSpacing: "-0.02em",
          }}
        >
          Claudje
        </div>

        {/* Tagline */}
        <div
          style={{
            fontFamily: "Plus Jakarta Sans",
            fontSize: 28,
            color: "#C9A96E",
            marginTop: 8,
          }}
        >
          Competitor Intelligence, Delivered
        </div>

        {/* Three gold dots */}
        <div style={{ display: "flex", gap: 10, marginTop: 24 }}>
          <div
            style={{
              width: 8,
              height: 8,
              borderRadius: 4,
              background: "#C9A96E",
            }}
          />
          <div
            style={{
              width: 8,
              height: 8,
              borderRadius: 4,
              background: "#C9A96E",
            }}
          />
          <div
            style={{
              width: 8,
              height: 8,
              borderRadius: 4,
              background: "#C9A96E",
            }}
          />
        </div>

        {/* Gold accent line at bottom */}
        <div
          style={{
            position: "absolute",
            bottom: 40,
            left: 80,
            right: 80,
            height: 2,
            background: "linear-gradient(90deg, transparent, #C9A96E, transparent)",
          }}
        />

        {/* URL */}
        <div
          style={{
            position: "absolute",
            bottom: 52,
            fontFamily: "Plus Jakarta Sans",
            fontSize: 18,
            color: "#7A6B5E",
          }}
        >
          claudje.com
        </div>
      </div>
    ),
    {
      ...size,
      fonts,
    }
  );
}
