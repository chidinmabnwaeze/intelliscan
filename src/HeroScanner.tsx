import { useEffect, useRef, useState, type CSSProperties } from "react";
import device from "./assets/intelliscan-device.webp";
import "./HeroScanner.css";

/*
 * The hero is drawn in a fixed 1000×1000 "scene" that matches the device
 * render, then scaled to fit. All coordinates below are in that space.
 */

// Corners of the device's touchscreen, mapped from a flat 320×200 UI
// (top-left, top-right, bottom-right, bottom-left of the UI).
const SCREEN_MATRIX =
  "matrix3d(0.476009,0.189571,0,-0.00039547,-0.976509,0.0359469,0,-0.000474141,0,0,1,0,370,411,0,1)";
const SCREEN_POLY = "370,411 598,540 420,615 193,462";

// Power cable from the power pack to the scanner, traced from the render.
const CABLE_PATH =
  "M776 474 L800 480 L830 505 L858 550 L872 610 L866 670 L840 735 L790 800 L720 855 L630 905 L530 938 L450 950 L380 940 L320 905 L292 860 L298 825 L318 800 L332 785";

type Phase = "idle" | "capture" | "scan" | "result";

const TIMELINE: [Phase, number][] = [
  ["idle", 1500],
  ["capture", 700],
  ["scan", 2800],
  ["result", 3400],
];

const PRODUCE = [
  {
    key: "orange",
    name: "Orange",
    grade: "Grade A",
    label: "Premium",
    score: 96,
    note: "No visible defects",
  },
  {
    key: "yam",
    name: "Yam",
    grade: "Grade B",
    label: "Standard",
    score: 88,
    note: "Minor surface bruise",
  },
] as const;

function OrangeArt() {
  return (
    <svg viewBox="0 0 100 100" className="produce-art" aria-hidden="true">
      <defs>
        <radialGradient id="hs-orange" cx="38%" cy="34%" r="72%">
          <stop offset="0" stopColor="#ffd88a" />
          <stop offset=".42" stopColor="#f99a1c" />
          <stop offset="1" stopColor="#b14f08" />
        </radialGradient>
        <pattern id="hs-pores" width="3.2" height="3.2" patternUnits="userSpaceOnUse">
          <circle cx="1" cy="1" r=".42" fill="#8f3f05" opacity=".35" />
        </pattern>
      </defs>
      <ellipse cx="50" cy="90" rx="28" ry="4.5" fill="#000" opacity=".45" />
      <circle cx="50" cy="53" r="34" fill="url(#hs-orange)" />
      <circle cx="50" cy="53" r="34" fill="url(#hs-pores)" />
      <ellipse cx="39" cy="39" rx="9" ry="5.5" fill="#fff" opacity=".32" transform="rotate(-25 39 39)" />
      <path d="M51 20c3-8 13-11 20-7-5 6-13 9-20 7Z" fill="#3f9a3a" />
      <circle cx="50" cy="20.5" r="2.3" fill="#5c6f22" />
    </svg>
  );
}

function YamArt() {
  return (
    <svg viewBox="0 0 100 100" className="produce-art" aria-hidden="true">
      <defs>
        <radialGradient id="hs-yam" cx="40%" cy="34%" r="78%">
          <stop offset="0" stopColor="#c09068" />
          <stop offset=".55" stopColor="#7d5233" />
          <stop offset="1" stopColor="#47291a" />
        </radialGradient>
        <filter id="hs-soft">
          <feGaussianBlur stdDeviation="1.4" />
        </filter>
      </defs>
      <ellipse cx="52" cy="82" rx="38" ry="4.5" fill="#000" opacity=".45" />
      <path
        d="M12 58C8 44 23 34 40 33c18-2 35-3 47 7 8 7 6 20-4 26-14 8-34 6-50 6-11 0-19-6-21-14Z"
        fill="url(#hs-yam)"
      />
      <g stroke="#2e1a0e" strokeWidth=".8" strokeLinecap="round" opacity=".55">
        <path d="M24 46l3 2M36 40l2 3M52 39l3 2M70 42l2 3M80 52l3 1M30 62l3 1M48 64l2 2M64 60l3 1" />
      </g>
      <ellipse cx="62" cy="56" rx="6.5" ry="4.2" fill="#24130a" opacity=".75" filter="url(#hs-soft)" />
    </svg>
  );
}

export default function HeroScanner() {
  const stageRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(0); // stage width in px
  const [reducedMotion] = useState(() =>
    window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  );
  const [step, setStep] = useState(() => (reducedMotion ? 3 : 0));
  const [produceIndex, setProduceIndex] = useState(0);

  const phase = TIMELINE[step][0];
  const produce = PRODUCE[produceIndex];
  const phaseIndex = step; // 0 idle → 3 result

  // Fit the 1000×1000 scene to the stage.
  useEffect(() => {
    const el = stageRef.current;
    if (!el) return;
    const ro = new ResizeObserver(([entry]) =>
      setScale(entry.contentRect.width),
    );
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  // Drive the inspection loop: idle → capture → scan → result → next produce.
  useEffect(() => {
    if (reducedMotion) return;
    const t = window.setTimeout(() => {
      if (step === TIMELINE.length - 1) {
        setProduceIndex((i) => (i + 1) % PRODUCE.length);
        setStep(0);
      } else {
        setStep(step + 1);
      }
    }, TIMELINE[step][1]);
    return () => window.clearTimeout(t);
  }, [step, reducedMotion]);

  // Gentle parallax tilt toward the pointer.
  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== "mouse") return;
    const r = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    e.currentTarget.style.setProperty("--ry", `${x * 6}deg`);
    e.currentTarget.style.setProperty("--rx", `${-y * 6}deg`);
  };
  const onPointerLeave = (e: React.PointerEvent<HTMLDivElement>) => {
    e.currentTarget.style.setProperty("--ry", "0deg");
    e.currentTarget.style.setProperty("--rx", "0deg");
  };

  const steps = ["Capture", "Analyse", "Classify"];
  const stepState = (i: number) =>
    phaseIndex > i + 1 || (phase === "result" && i === 2)
      ? "done"
      : phaseIndex === i + 1
        ? "active"
        : "pending";

  const statusText =
    phase === "idle"
      ? "Ready for produce"
      : phase === "capture"
        ? `Capturing ${produce.name.toLowerCase()}…`
        : phase === "scan"
          ? "Detecting visible defects…"
          : `${produce.name} · ${produce.grade}`;

  return (
    <div
      className="hero-scanner"
      data-phase={phase}
      data-produce={produce.key}
      style={{ "--score": phase === "result" ? produce.score : 0 } as CSSProperties}
    >
      <div
        ref={stageRef}
        className="scanner-stage"
        onPointerMove={onPointerMove}
        onPointerLeave={onPointerLeave}
      >
        <div
          className="scanner-scene"
          style={{
            // fit the scene at 92% so the cable clears the status card
            transform: `translate(${scale * 0.04}px, 0) scale(${(scale * 0.92) / 1000})`,
            opacity: scale ? 1 : 0,
          }}
        >
          <div className="scene-tilt">
            <img
              src={device}
              alt="Intelliscan scanner with its touchscreen and portable power pack"
              className="scene-device"
              width={1000}
              height={1000}
            />

            {/* light spilling off the screen + power flowing down the cable */}
            <svg className="scene-fx" viewBox="0 0 1000 1000" aria-hidden="true">
              <defs>
                <filter id="hs-glow" x="-50%" y="-50%" width="200%" height="200%">
                  <feGaussianBlur stdDeviation="22" />
                </filter>
                <filter id="hs-cable-glow" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="5" />
                </filter>
              </defs>
              <polygon className="screen-glow" points={SCREEN_POLY} filter="url(#hs-glow)" />
              <path className="cable-pulse cable-pulse--blur" d={CABLE_PATH} pathLength={100} filter="url(#hs-cable-glow)" />
              <path className="cable-pulse" d={CABLE_PATH} pathLength={100} />
              <circle className="led led--pack" cx="806" cy="463" r="9" />
              <circle className="led led--base" cx="340" cy="838" r="10" />
            </svg>

            {/* the device's own touchscreen, running the inspection */}
            <div className="device-screen" style={{ transform: SCREEN_MATRIX }}>
              <div className="ds-top">
                <span className="ds-brand">
                  <i /> intelliScan
                </span>
                <span className="ds-chip">EDGE AI · OFFLINE</span>
              </div>

              <div className="ds-feed">
                <div className="ds-feed-grid" />
                <div className="ds-place">
                  <span />
                  Place produce
                </div>
                <div className="ds-produce" key={produce.key}>
                  {produce.key === "orange" ? <OrangeArt /> : <YamArt />}
                </div>
                <div className="ds-points">
                  <i style={{ left: "38%", top: "40%" }} />
                  <i style={{ left: "62%", top: "46%" }} />
                  <i style={{ left: "47%", top: "64%" }} />
                  <i style={{ left: "70%", top: "60%" }} />
                </div>
                <div className="ds-scanline" />
                <div className={`ds-box ds-box--${produce.key}`}>
                  <b>
                    {produce.name.toUpperCase()} · {produce.score}%
                  </b>
                </div>
                {produce.key === "yam" ? (
                  <div className="ds-defect">
                    <b>BRUISE</b>
                  </div>
                ) : (
                  <div className="ds-clear">
                    <b>SURFACE CLEAR</b>
                  </div>
                )}
                <div className="ds-flash" />
                <span className="ds-rec">
                  <i /> CAM 01
                </span>
              </div>

              <div className="ds-side">
                <p className="ds-kicker">Inspection</p>
                <ul className="ds-steps">
                  {steps.map((s, i) => (
                    <li key={s} data-state={stepState(i)}>
                      <i />
                      {s}
                    </li>
                  ))}
                </ul>
                <div className="ds-ring">
                  <svg viewBox="0 0 40 40" aria-hidden="true">
                    <circle cx="20" cy="20" r="16" className="ds-ring-track" />
                    <circle cx="20" cy="20" r="16" className="ds-ring-fill" pathLength={100} />
                  </svg>
                  <span className="score-count" />
                </div>
                <p className="ds-grade">{produce.grade}</p>
                <p className="ds-note">{produce.note}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="scanner-chip">
          <span className="live-dot" /> Live inspection
        </div>
      </div>

      <div className="scanner-hud" aria-live="polite">
        <span className={`hud-icon hud-icon--${produce.key}`} />
        <div className="min-w-0 flex-1">
          <p className="hud-kicker">
            {phase === "result" ? "Result" : "Status"}
          </p>
          <p className="hud-status" key={statusText}>
            {statusText}
          </p>
          <div className="hud-steps">
            {[1, 2, 3].map((i) => (
              <span key={i} data-on={phaseIndex >= i || undefined} />
            ))}
          </div>
        </div>
        <div className="hud-score">
          <span className="score-count" />
          <small>%</small>
        </div>
      </div>
    </div>
  );
}
