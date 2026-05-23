"use client";

import { useSpring, useTrail, animated } from "@react-spring/web";
import { useState } from "react";

// ── Data ─────────────────────────────────────────────────────────────────────

const STARS = [
  { id: 1, x: 14.5, y: 17 },
  { id: 2, x: 28,   y: 7  },
  { id: 3, x: 64,   y: 13 },
  { id: 4, x: 79,   y: 22 },
  { id: 5, x: 88,   y: 9  },
  { id: 6, x: 48,   y: 62 },
  { id: 7, x: 92.5, y: 44 },
  { id: 8, x: 6,    y: 34 },
];

const NAV_LINKS = ["Apps", "Dao", "Technology", "Token", "Career"];

const THEMES = [
  {
    bg: "#000000",
    bodyFill: "#ffffff",
    ringStroke: "white",
    faceColor: "#000",
    dot1: "#ffffff",
    dotBorder: "#ffffff",
  },
  {
    bg: "linear-gradient(175deg,#3b0764 0%,#7c3aed 38%,#be5103 72%,#f97316 100%)",
    bodyFill: "#f97316",
    ringStroke: "#dc2626",
    faceColor: "#7c1d06",
    dot1: "#ec4899",
    dotBorder: "#ec4899",
  },
  {
    bg: "linear-gradient(175deg,#0f172a 0%,#1d4ed8 50%,#064e3b 100%)",
    bodyFill: "#38bdf8",
    ringStroke: "#7dd3fc",
    faceColor: "#0c4a6e",
    dot1: "#38bdf8",
    dotBorder: "#38bdf8",
  },
] as const;

// ── SVG Atoms ─────────────────────────────────────────────────────────────────

function SaturnSVG({ theme }: { theme: (typeof THEMES)[number] }) {
  return (
    <svg width="130" height="98" viewBox="0 0 130 98" fill="none">
      <ellipse cx="65" cy="62" rx="60" ry="15" stroke={theme.ringStroke} strokeWidth="2.5" fill="none" />
      <circle cx="65" cy="50" r="34" fill={theme.bodyFill} />
      <circle cx="56" cy="47" r="3.5" fill={theme.faceColor} />
      <circle cx="74" cy="47" r="3.5" fill={theme.faceColor} />
      <path d="M57 57Q65 63 73 57" stroke={theme.faceColor} strokeWidth="2" strokeLinecap="round" fill="none" />
      <path d="M5 62Q65 79 125 62" stroke={theme.ringStroke} strokeWidth="2.5" strokeLinecap="round" fill="none" />
    </svg>
  );
}

function StarPlus() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      <path d="M7 1v12M1 7h12" stroke="white" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}

function CatAvatar() {
  return (
    <svg viewBox="0 0 44 44" width="44" height="44" fill="none">
      <path d="M10 18L7 9L17 14Z" fill="white" />
      <path d="M34 18L37 9L27 14Z" fill="white" />
      <circle cx="22" cy="26" r="13" fill="white" />
      <circle cx="17.5" cy="25" r="2.8" fill="#111" />
      <circle cx="26.5" cy="25" r="2.8" fill="#111" />
      <circle cx="18.3" cy="24.2" r="0.9" fill="white" />
      <circle cx="27.3" cy="24.2" r="0.9" fill="white" />
      <path d="M19.5 29Q22 31.5 24.5 29" stroke="#888" strokeWidth="1" strokeLinecap="round" fill="none" />
    </svg>
  );
}

function RingedPlanetIcon({ color }: { color: string }) {
  return (
    <svg width="44" height="36" viewBox="0 0 44 36" fill="none">
      <ellipse cx="22" cy="22" rx="20" ry="5.5" stroke={color} strokeWidth="1.8" fill="none" />
      <circle cx="22" cy="18" r="12" stroke={color} strokeWidth="1.8" fill="none" />
      <path d="M2 22Q22 28 42 22" stroke={color} strokeWidth="1.8" strokeLinecap="round" fill="none" />
    </svg>
  );
}

function InstagramIcon({ color }: { color: string }) {
  return (
    <svg width="34" height="34" viewBox="0 0 34 34" fill="none">
      <rect x="1" y="1" width="32" height="32" rx="9" stroke={color} strokeWidth="1.8" />
      <circle cx="17" cy="17" r="6.5" stroke={color} strokeWidth="1.8" />
      <circle cx="24.5" cy="9.5" r="1.5" fill={color} />
    </svg>
  );
}

function DiscordIcon({ color }: { color: string }) {
  return (
    <svg width="34" height="34" viewBox="0 0 34 34" fill="none">
      <rect x="1" y="1" width="32" height="32" rx="9" stroke={color} strokeWidth="1.8" />
      <path
        d="M22.8 12C21.6 11.4 20.3 11 18.9 10.8L18.7 11.2C17.2 11 15.8 11 14.3 11.2L14.1 10.8C12.7 11 11.4 11.4 10.2 12C7.7 15.8 7 19.5 7.4 23.1C9 24.3 10.6 25 12.1 25.5C12.5 24.9 12.8 24.3 13.1 23.7C12.5 23.5 11.9 23.2 11.4 22.9L11.6 22.7C14.8 24.2 18.2 24.2 21.4 22.7L21.6 22.9C21.1 23.2 20.5 23.5 19.9 23.7C20.2 24.3 20.5 24.9 20.9 25.5C22.4 25 24 24.3 25.6 23.1C26.1 19 24.9 15.3 22.8 12ZM14.1 20.9C13.2 20.9 12.4 20.1 12.4 19.1C12.4 18.1 13.2 17.3 14.1 17.3C15 17.3 15.8 18.1 15.8 19.1C15.8 20.1 15 20.9 14.1 20.9ZM20.9 20.9C20 20.9 19.2 20.1 19.2 19.1C19.2 18.1 20 17.3 20.9 17.3C21.8 17.3 22.6 18.1 22.6 19.1C22.6 20.1 21.8 20.9 20.9 20.9Z"
        fill={color}
      />
    </svg>
  );
}

// ── Background Overlays ────────────────────────────────────────────────────────

function ColorfulScene() {
  return (
    <svg className="absolute inset-0 w-full h-full" viewBox="0 0 1100 600"
      preserveAspectRatio="xMidYMid slice">
      <defs>
        <radialGradient id="sg" cx="18%" cy="56%" r="20%">
          <stop offset="0%" stopColor="#fde68a" stopOpacity="0.7" />
          <stop offset="100%" stopColor="#f59e0b" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="gg" cx="50%" cy="100%" r="55%">
          <stop offset="0%" stopColor="#f97316" stopOpacity="0.45" />
          <stop offset="100%" stopColor="#7c3aed" stopOpacity="0" />
        </radialGradient>
      </defs>
      {/* Sun glow */}
      <circle cx="190" cy="335" r="160" fill="url(#sg)" />
      <circle cx="190" cy="335" r="80" fill="#fde68a" opacity="0.45" />
      <ellipse cx="550" cy="600" rx="700" ry="180" fill="url(#gg)" />
      {/* Back mountains */}
      <path d="M0 490 L130 270 L260 430 L420 210 L560 400 L710 175 L840 370 L1020 245 L1100 305 L1100 600 L0 600Z"
        fill="#b91c1c" opacity="0.65" />
      {/* Front mountains */}
      <path d="M0 560 L190 370 L340 490 L510 340 L650 460 L820 305 L960 440 L1100 390 L1100 600 L0 600Z"
        fill="#7f1d1d" opacity="0.9" />
      <rect x="0" y="555" width="1100" height="45" fill="#3f0a0a" />
      {/* Left mushroom trees */}
      <rect x="35" y="310" width="24" height="130" fill="#1e0738" />
      <ellipse cx="47" cy="310" rx="70" ry="42" fill="#3b0764" />
      <rect x="148" y="358" width="18" height="90" fill="#2e1065" />
      <ellipse cx="157" cy="358" rx="50" ry="30" fill="#4c1d95" />
      {/* Right mushroom trees */}
      <rect x="1042" y="264" width="22" height="140" fill="#1e0738" />
      <ellipse cx="1053" cy="264" rx="68" ry="42" fill="#3b0764" />
      <rect x="928" y="308" width="20" height="100" fill="#2e1065" />
      <ellipse cx="938" cy="308" rx="52" ry="30" fill="#4c1d95" />
      {/* Tent */}
      <path d="M390 545 L470 398 L550 545Z" fill="#f59e0b" opacity="0.92" />
      <path d="M448 545 L470 480 L492 545Z" fill="#78350f" />
      {/* Campfire */}
      <ellipse cx="680" cy="548" rx="20" ry="6" fill="#7f1d1d" />
      <path d="M670 548Q676 518 680 508Q684 518 690 548Z" fill="#f97316" opacity="0.9" />
      <path d="M673 545Q678 528 680 520Q682 528 687 545Z" fill="#fbbf24" opacity="0.85" />
      {/* Characters */}
      <path d="M418 482L412 472L423 478Z" fill="#f9a8d4" />
      <path d="M443 482L449 472L438 478Z" fill="#f9a8d4" />
      <circle cx="430" cy="498" r="22" fill="#f9a8d4" />
      <circle cx="422" cy="495" r="3" fill="#1e1b4b" />
      <circle cx="437" cy="495" r="3" fill="#1e1b4b" />
      <path d="M424 503Q430 507 436 503" stroke="#be185d" strokeWidth="1.5" strokeLinecap="round" fill="none" />
      <path d="M479 470L473 459L483 466Z" fill="#60a5fa" />
      <path d="M503 470L509 459L499 466Z" fill="#60a5fa" />
      <circle cx="491" cy="488" r="24" fill="#60a5fa" />
      <circle cx="483" cy="485" r="3.2" fill="#1e1b4b" />
      <circle cx="498" cy="485" r="3.2" fill="#1e1b4b" />
      <circle cx="643" cy="510" r="20" fill="#a78bfa" />
      <circle cx="635" cy="506" r="2.8" fill="#1e1b4b" />
      <circle cx="651" cy="506" r="2.8" fill="#1e1b4b" />
      <path d="M726 475L720 464L731 470Z" fill="#f87171" />
      <path d="M752 475L758 464L747 470Z" fill="#f87171" />
      <circle cx="739" cy="496" r="26" fill="#f87171" />
      <circle cx="731" cy="492" r="3.5" fill="#1e1b4b" />
      <circle cx="747" cy="492" r="3.5" fill="#1e1b4b" />
      <rect x="755" y="478" width="28" height="20" rx="3" fill="white" opacity="0.85" />
      <ellipse cx="305" cy="558" rx="14" ry="8" fill="#166534" opacity="0.6" />
      <ellipse cx="855" cy="558" rx="12" ry="7" fill="#166534" opacity="0.6" />
    </svg>
  );
}

function SpaceScene() {
  return (
    <svg className="absolute inset-0 w-full h-full" viewBox="0 0 1100 600"
      preserveAspectRatio="xMidYMid slice">
      <defs>
        <radialGradient id="nb" cx="68%" cy="38%" r="50%">
          <stop offset="0%" stopColor="#1d4ed8" stopOpacity="0.55" />
          <stop offset="100%" stopColor="#0f172a" stopOpacity="0" />
        </radialGradient>
      </defs>
      <ellipse cx="750" cy="230" rx="420" ry="280" fill="url(#nb)" />
      <circle cx="880" cy="145" r="50" fill="#0ea5e9" opacity="0.35" />
      <circle cx="880" cy="145" r="38" fill="#38bdf8" opacity="0.25" />
      <circle cx="185" cy="400" r="75" fill="#065f46" opacity="0.3" />
      <ellipse cx="185" cy="400" rx="95" ry="16" stroke="#34d399" strokeWidth="2" fill="none" opacity="0.35" />
      {Array.from({ length: 28 }).map((_, i) => (
        <circle key={i}
          cx={(i * 41 + 15) % 1100}
          cy={(i * 59 + 20) % 520}
          r={i % 4 === 0 ? 1.6 : 1}
          fill="white"
          opacity={0.3 + (i % 6) * 0.1}
        />
      ))}
    </svg>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default function Home() {
  const [activePlanet, setActivePlanet] = useState(0);
  const [hoveredPlay, setHoveredPlay] = useState(false);
  const theme = THEMES[activePlanet];

  const planetAnim = useSpring({
    from: { opacity: 0, transform: "translateY(-60px)" },
    to:   { opacity: 1, transform: "translateY(0px)" },
    delay: 120,
    config: { tension: 155, friction: 18 },
  });

  const frameAnim = useSpring({
    from: { opacity: 0, transform: "scale(0.97)" },
    to:   { opacity: 1, transform: "scale(1)" },
    delay: 60,
    config: { tension: 200, friction: 24 },
  });

  const navAnim = useSpring({
    from: { opacity: 0, transform: "translateY(-22px)" },
    to:   { opacity: 1, transform: "translateY(0px)" },
    delay: 360,
    config: { tension: 200, friction: 22 },
  });

  const line1Anim = useSpring({
    from: { opacity: 0, transform: "translateY(56px)" },
    to:   { opacity: 1, transform: "translateY(0px)" },
    delay: 560,
    config: { tension: 180, friction: 20 },
  });

  const line2Anim = useSpring({
    from: { opacity: 0, transform: "translateY(56px)" },
    to:   { opacity: 1, transform: "translateY(0px)" },
    delay: 710,
    config: { tension: 180, friction: 20 },
  });

  const btnAnim = useSpring({
    from: { opacity: 0, transform: "scale(0.8)" },
    to:   { opacity: 1, transform: "scale(1)" },
    delay: 900,
    config: { tension: 220, friction: 18 },
  });

  const bottomAnim = useSpring({
    from: { opacity: 0, transform: "translateY(24px)" },
    to:   { opacity: 1, transform: "translateY(0px)" },
    delay: 1060,
    config: { tension: 190, friction: 22 },
  });

  const [starTrail] = useTrail(STARS.length, () => ({
    from: { opacity: 0, transform: "scale(0)" },
    to:   { opacity: 1, transform: "scale(1)" },
    delay: 280,
    config: { tension: 320, friction: 22 },
  }));

  const CARD_MIN_HEIGHT = "clamp(520px,62vh,660px)";

  return (
    <main
      className="min-h-screen bg-black flex items-center justify-center"
      style={{ padding: "clamp(14px,3vw,48px)" }}
    >
      <div className="w-full" style={{ maxWidth: 1100 }}>

        {/* Saturn floats above the frame */}
        <div className="flex justify-center" style={{ marginBottom: -54 }}>
          <animated.div style={{ zIndex: 20, position: "relative", ...planetAnim }}>
            <SaturnSVG theme={theme} />
          </animated.div>
        </div>

        {/* Main framed card */}
        <animated.div
          style={{
            position: "relative",
            borderRadius: 28,
            overflow: "hidden",
            border: "2px solid rgba(255,255,255,0.85)",
            minHeight: CARD_MIN_HEIGHT,
            ...frameAnim,
          }}
        >
          {/* Dynamic background */}
          <div
            className="absolute inset-0 transition-all duration-1000"
            style={{ background: theme.bg }}
          />

          {/* Scene overlays */}
          {activePlanet === 1 && (
            <div className="absolute inset-0 pointer-events-none">
              <ColorfulScene />
            </div>
          )}
          {activePlanet === 2 && (
            <div className="absolute inset-0 pointer-events-none">
              <SpaceScene />
            </div>
          )}

          {/* Star sparkles */}
          {STARS.map((s, i) => (
            <animated.div
              key={s.id}
              style={{
                ...starTrail[i],
                position: "absolute",
                left: `${s.x}%`,
                top:  `${s.y}%`,
                zIndex: 6,
                pointerEvents: "none",
              }}
            >
              <StarPlus />
            </animated.div>
          ))}

          {/* Content column */}
          <div
            style={{
              position: "relative",
              zIndex: 10,
              minHeight: CARD_MIN_HEIGHT,
              display: "flex",
              flexDirection: "column",
            }}
          >

            {/* ─── Navbar ─── */}
            <animated.nav
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "clamp(18px,3vw,30px) clamp(20px,4vw,40px)",
                ...navAnim,
              }}
            >
              <span
                className="text-white font-bold select-none"
                style={{
                  fontFamily: "var(--font-space)",
                  fontSize: "clamp(14px,1.5vw,20px)",
                  letterSpacing: "0.22em",
                }}
              >
                STARCO
              </span>

              <div className="flex items-center" style={{ gap: "clamp(14px,2.8vw,34px)" }}>
                {NAV_LINKS.map((link, i) => (
                  <button
                    key={link}
                    className="text-white font-medium hover:opacity-55 transition-opacity duration-200 flex items-center gap-1.5 whitespace-nowrap"
                    style={{
                      fontFamily: "var(--font-space)",
                      fontSize: "clamp(10px,1.1vw,14px)",
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                    }}
                  >
                    {link}
                    {i === 0 && (
                      <svg width="9" height="5" viewBox="0 0 9 5" fill="none">
                        <path d="M.75.75 4.5 4.25 8.25.75" stroke="white" strokeWidth="1.4"
                          strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    )}
                  </button>
                ))}
              </div>
            </animated.nav>

            {/* ─── Hero ─── */}
            <div
              style={{
                flex: 1,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                paddingBottom: "clamp(14px,3.5vh,40px)",
              }}
            >
              <div style={{ overflow: "hidden" }}>
                <animated.h1
                  style={{
                    fontFamily: "var(--font-sui-generis)",
                    fontSize: "clamp(64px,12.5vw,152px)",
                    letterSpacing: "0.02em",
                    lineHeight: 1,
                    color: "white",
                    textAlign: "center",
                    userSelect: "none",
                    ...line1Anim,
                  }}
                >
                  UFO
                </animated.h1>
              </div>

              <div style={{ overflow: "hidden", marginBottom: "clamp(26px,4.5vh,52px)" }}>
                <animated.h1
                  style={{
                    fontFamily: "var(--font-sui-generis)",
                    fontSize: "clamp(64px,12.5vw,152px)",
                    letterSpacing: "0.02em",
                    lineHeight: 1,
                    color: "white",
                    textAlign: "center",
                    userSelect: "none",
                    ...line2Anim,
                  }}
                >
                  SCHOOL
                </animated.h1>
              </div>

              <animated.button
                style={{
                  fontFamily: "var(--font-space)",
                  fontSize: "clamp(10px,1.1vw,13px)",
                  padding: "clamp(10px,1.4vh,14px) clamp(30px,4vw,52px)",
                  color: "white",
                  background: "transparent",
                  border: "2px solid white",
                  borderRadius: 999,
                  fontWeight: 500,
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  cursor: "pointer",
                  transition: "background 0.3s, color 0.3s",
                  ...btnAnim,
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.background = "white";
                  (e.currentTarget as HTMLButtonElement).style.color = "black";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.background = "transparent";
                  (e.currentTarget as HTMLButtonElement).style.color = "white";
                }}
              >
                Lets Start
              </animated.button>
            </div>

            {/* ─── Bottom Bar ─── */}
            <animated.div
              style={{
                borderTop: "1.5px solid rgba(255,255,255,0.65)",
                padding: "clamp(10px,1.8vh,18px) clamp(18px,3vw,36px)",
                ...bottomAnim,
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: 16,
                }}
              >

                {/* Avatar + copy */}
                <div style={{ display: "flex", alignItems: "center", gap: 14, flexShrink: 0 }}>
                  <div
                    style={{
                      width: 46,
                      height: 46,
                      borderRadius: "50%",
                      border: "2px solid white",
                      overflow: "hidden",
                      flexShrink: 0,
                    }}
                  >
                    <CatAvatar />
                  </div>
                  <div>
                    <p
                      style={{
                        fontFamily: "var(--font-space)",
                        fontSize: "clamp(10px,1.05vw,13px)",
                        color: "white",
                        fontWeight: 600,
                        lineHeight: 1.3,
                      }}
                    >
                      Explore all the planets of this system!
                    </p>
                    <p
                      style={{
                        fontFamily: "var(--font-space)",
                        fontSize: "clamp(9px,0.9vw,11px)",
                        color: "rgba(255,255,255,0.5)",
                        lineHeight: 1.3,
                        marginTop: 2,
                      }}
                    >
                      Inhabitant of planet 901
                    </p>
                  </div>
                </div>

                {/* Planet selectors + play */}
                <div style={{ display: "flex", alignItems: "center", gap: 18, flexShrink: 0 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    {THEMES.map((t, idx) => {
                      const size = idx === 0 ? 36 : idx === 1 ? 28 : 22;
                      const active = activePlanet === idx;
                      return (
                        <button
                          key={idx}
                          onClick={() => setActivePlanet(idx)}
                          title={`Planet ${idx + 1}`}
                          style={{
                            width: size,
                            height: size,
                            borderRadius: "50%",
                            background: active
                              ? t.dot1
                              : idx === 0 ? "transparent" : t.dot1 + "44",
                            border: `2.5px solid ${t.dotBorder}`,
                            boxShadow: active ? `0 0 14px ${t.dot1}88` : "none",
                            cursor: "pointer",
                            transition: "all 0.3s",
                            flexShrink: 0,
                          }}
                        />
                      );
                    })}
                  </div>

                  <button
                    onClick={() => setActivePlanet((activePlanet + 1) % THEMES.length)}
                    onMouseEnter={() => setHoveredPlay(true)}
                    onMouseLeave={() => setHoveredPlay(false)}
                    style={{
                      width: 40,
                      height: 40,
                      borderRadius: "50%",
                      border: "2px solid white",
                      background: hoveredPlay ? "white" : "transparent",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      cursor: "pointer",
                      transition: "background 0.3s",
                      flexShrink: 0,
                    }}
                  >
                    <svg width="12" height="14" viewBox="0 0 12 14" fill="none">
                      <path d="M1 1L11 7L1 13V1Z" fill={hoveredPlay ? "black" : "white"} />
                    </svg>
                  </button>
                </div>

                {/* Social icons */}
                <div style={{ display: "flex", alignItems: "center", gap: 12, flexShrink: 0 }}>
                  <RingedPlanetIcon color="white" />
                  <InstagramIcon color="white" />
                  <DiscordIcon color="white" />
                </div>

              </div>
            </animated.div>

          </div>
        </animated.div>

        {/* Progress pill */}
        <div style={{ display: "flex", justifyContent: "center", marginTop: 16 }}>
          <div
            style={{
              width: 80,
              height: 3,
              borderRadius: 999,
              background: "rgba(255,255,255,0.15)",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                width: `${((activePlanet + 1) / THEMES.length) * 100}%`,
                height: "100%",
                borderRadius: 999,
                background: "rgba(255,255,255,0.65)",
                transition: "width 0.5s ease",
              }}
            />
          </div>
        </div>

      </div>
    </main>
  );
}
