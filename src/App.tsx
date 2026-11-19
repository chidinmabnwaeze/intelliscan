import { useEffect, useState } from "react";
import logoLight from "./assets/1_page-0001.jpg";
import logoDark from "./assets/2_page-0001.jpg";
import intelliscanDevice from "./assets/intelliscan-device.webp";
import HeroScanner from "./HeroScanner";
import orangeProduce from "./assets/orange.jpg";
import "./App.css";

const navItems = [
  ["Home", "home"],
  ["Technology", "technology"],
  ["How it works", "how-it-works"],
  ["Applications", "applications"],
  ["About", "about"],
];

function ArrowIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M5 12h14M13 6l6 6-6 6"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function LeafIcon() {
  return (
    <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M19.5 4.5C12 4.8 5.4 8 5.1 13.6c-.2 3.5 2.5 5.9 5.7 5.7 5.8-.4 8.4-7.5 8.7-14.8Z"
        fill="currentColor"
        opacity=".95"
      />
      <path
        d="M5 20c2.7-5.2 6.4-8.4 11.6-11"
        stroke="white"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

function ScanIcon() {
  return (
    <svg className="h-7 w-7" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M8 3H5a2 2 0 0 0-2 2v3M16 3h3a2 2 0 0 1 2 2v3M8 21H5a2 2 0 0 1-2-2v-3M16 21h3a2 2 0 0 0 2-2v-3"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
      <circle cx="12" cy="12" r="3.2" stroke="currentColor" strokeWidth="1.7" />
    </svg>
  );
}

function ChipIcon() {
  return (
    <svg className="h-7 w-7" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect
        x="6"
        y="6"
        width="12"
        height="12"
        rx="2"
        stroke="currentColor"
        strokeWidth="1.7"
      />
      <rect x="9.5" y="9.5" width="5" height="5" rx="1" fill="currentColor" />
      <path
        d="M9 3v3M15 3v3M9 18v3M15 18v3M3 9h3M3 15h3M18 9h3M18 15h3"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

function OfflineIcon() {
  return (
    <svg className="h-7 w-7" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M4.5 9.5a11 11 0 0 1 15 0M7.5 12.5a7 7 0 0 1 9 0M10.5 15.5a2.7 2.7 0 0 1 3 0"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
      <path
        d="M12 19h.01"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <path
        d="m4 4 16 16"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  return (
    <main className="overflow-hidden bg-[#f7f8f3] text-[#102018]">
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${scrolled ? "border-b border-[#102018]/8 bg-[#f7f8f3]/95 shadow-sm backdrop-blur-xl" : "bg-transparent"}`}
      >
        <nav
          className="mx-auto flex h-20 max-w-[1180px] items-center justify-between px-5 lg:px-8"
          aria-label="Main navigation"
        >
          <button
            onClick={() => scrollTo("home")}
            className="flex items-center gap-3"
            aria-label="Go to home"
          >
            <img
              src={logoLight}
              alt="Intelliscan"
              className="h-11 w-11 rounded-full object-cover"
            />
            <span className="text-[17px] font-bold tracking-[0.18em] text-[#0d255f]">
              INTELLISCAN
            </span>
          </button>

          <div className="hidden items-center gap-8 lg:flex">
            {navItems.map(([label, id]) => (
              <button
                key={id}
                onClick={() => scrollTo(id)}
                className="text-sm font-semibold text-[#21352a] transition hover:text-[#0d7a38]"
              >
                {label}
              </button>
            ))}
          </div>

          <button
            onClick={() => scrollTo("contact")}
            className="hidden items-center gap-2 rounded-full bg-[#0d255f] px-5 py-3 text-sm font-bold text-white shadow-lg shadow-[#0d255f]/10 transition hover:-translate-y-0.5 hover:bg-[#12348a] lg:flex"
          >
            Request a demo <ArrowIcon className="h-4 w-4" />
          </button>

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="grid h-11 w-11 place-items-center rounded-full border border-[#102018]/10 lg:hidden"
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
          >
            <span className="relative h-4 w-5">
              <span
                className={`absolute left-0 top-1 h-0.5 w-5 bg-[#102018] transition ${menuOpen ? "translate-y-[3px] rotate-45" : ""}`}
              />
              <span
                className={`absolute left-0 top-[10px] h-0.5 w-5 bg-[#102018] transition ${menuOpen ? "-translate-y-[3px] -rotate-45" : ""}`}
              />
            </span>
          </button>
        </nav>

        {menuOpen && (
          <div className="border-t border-[#102018]/8 bg-[#f7f8f3] px-5 py-5 shadow-xl lg:hidden">
            <div className="mx-auto flex max-w-[1180px] flex-col">
              {navItems.map(([label, id]) => (
                <button
                  key={id}
                  onClick={() => scrollTo(id)}
                  className="border-b border-[#102018]/8 py-4 text-left text-base font-semibold"
                >
                  {label}
                </button>
              ))}
              <button
                onClick={() => scrollTo("contact")}
                className="mt-5 flex items-center justify-center gap-2 rounded-full bg-[#0d255f] px-5 py-3.5 text-sm font-bold text-white"
              >
                Request a demo <ArrowIcon className="h-4 w-4" />
              </button>
            </div>
          </div>
        )}
      </header>

      <section id="home" className="relative min-h-[760px] scroll-mt-20 pt-20">
        <div className="hero-grid absolute inset-0 opacity-40" />
        <div className="absolute left-[-120px] top-24 h-72 w-72 rounded-full bg-[#86c83f]/15 blur-[70px]" />
        <div className="relative mx-auto grid max-w-[1180px] items-center gap-10 px-5 py-14 lg:min-h-[680px] lg:grid-cols-[1.05fr_.95fr] lg:px-8 lg:py-0">
          <div className="relative z-10 max-w-[650px]">
            <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-[#0d7a38]/15 bg-white/70 px-4 py-2 text-xs font-bold uppercase tracking-[0.16em] text-[#0d7a38] shadow-sm">
              <span className="h-2 w-2 rounded-full bg-[#86c83f]" /> Portable AI
              quality detection
            </div>
            <h1 className="max-w-[620px] text-[44px] font-bold leading-[1.03] tracking-[-0.055em] text-[#102018] sm:text-[58px] lg:text-[68px]">
              See quality.
              <br />
              <span className="text-[#0d7a38]">Sort with confidence.</span>
            </h1>
            <p className="mt-7 max-w-[570px] text-base leading-7 text-[#526156] sm:text-lg sm:leading-8">
              Intelliscan uses image recognition to identify visible defects and
              classify yam and orange produce; right where the produce is
              inspected.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <button
                onClick={() => scrollTo("technology")}
                className="flex items-center justify-center gap-3 rounded-full bg-[#0d7a38] px-7 py-4 text-sm font-bold text-white shadow-xl shadow-[#0d7a38]/15 transition hover:-translate-y-1"
              >
                Discover Intelliscan <ArrowIcon />
              </button>
              <button
                onClick={() => scrollTo("how-it-works")}
                className="flex items-center justify-center gap-3 rounded-full border border-[#102018]/15 bg-white px-7 py-4 text-sm font-bold text-[#102018] transition hover:border-[#0d7a38]/40 hover:text-[#0d7a38]"
              >
                See how it works
              </button>
            </div>
            <div className="mt-10 flex items-center gap-5 text-sm text-[#657267]">
              <div className="flex -space-x-2">
                <span className="avatar bg-[#0d255f]">Y</span>
                <span className="avatar bg-[#d6a545]">O</span>
                <span className="avatar bg-[#0d7a38]">AI</span>
              </div>
              <span>
                <strong className="text-[#102018]">Built for the field</strong>
                <br />
                Fast, portable and offline-ready
              </span>
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-[520px] lg:mx-0 lg:justify-self-end">
            <div className="absolute -left-12 top-12 h-36 w-36 rounded-full bg-[#86c83f]/20 blur-3xl" />
            <HeroScanner />
          </div>
        </div>
      </section>

      <section
        id="technology"
        className="scroll-mt-20 bg-[#102018] py-20 text-white sm:py-24 background"
      >
        <div className="mx-auto max-w-[1180px] px-5 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-[.75fr_1.25fr] lg:items-end">
            <div>
              <p className="section-kicker text-[#86c83f]">The technology</p>
              <h2 className="mt-5 text-4xl font-bold leading-tight tracking-[-0.04em] sm:text-5xl">
                Quality inspection,
                <br />
                intelligently simplified.
              </h2>
            </div>
            <p className="max-w-xl text-base leading-7 text-white/65 lg:justify-self-end">
              A complete edge-based inspection system that captures produce
              images, analyses visible defects, and presents clear
              classifications—without waiting on the internet.
            </p>
          </div>

          <div className="mt-14 grid gap-4 md:grid-cols-3">
            {[
              {
                icon: <ScanIcon />,
                num: "01",
                title: "Intelligent capture",
                text: "Purpose-built imaging makes every inspection consistent, focused and easy to repeat.",
              },
              {
                icon: <ChipIcon />,
                num: "02",
                title: "AI at the edge",
                text: "An embedded AI model processes produce locally for fast and dependable results.",
              },
              {
                icon: <OfflineIcon />,
                num: "03",
                title: "Works offline",
                text: "No continuous internet required—ideal for farms, markets, warehouses and field operations.",
              },
            ].map((item) => (
              <article
                key={item.num}
                className="group rounded-[24px] border border-white/10 bg-white/[0.045] p-7 transition duration-300 hover:-translate-y-2 hover:bg-white/[0.07]"
              >
                <div className="mb-12 flex items-start justify-between">
                  <span className="grid h-12 w-12 place-items-center rounded-full border border-[#86c83f]/30 text-[#86c83f]">
                    {item.icon}
                  </span>
                  <span className="text-sm font-bold text-white/25">
                    {item.num}
                  </span>
                </div>
                <h3 className="text-xl font-bold">{item.title}</h3>
                <p className="mt-3 leading-7 text-white/55">{item.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="how-it-works" className="scroll-mt-20 py-20 sm:py-24">
        <div className="mx-auto max-w-[1180px] px-5 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <p className="section-kicker">Simple by design</p>
            <h2 className="mt-5 text-4xl font-bold tracking-[-0.04em] sm:text-5xl">
              From produce to result in seconds.
            </h2>
          </div>
          <div className="relative mt-14 grid gap-5 md:grid-cols-3">
            <div className="step-line hidden md:block" />
            {[
              [
                "01",
                "Place",
                "Position the yam or orange inside the device scanning area.",
              ],
              [
                "02",
                "Analyse",
                "Intelliscan captures and examines the produce using AI.",
              ],
              [
                "03",
                "Classify",
                "View the quality result and support faster sorting decisions.",
              ],
            ].map(([num, title, text], index) => (
              <article
                key={num}
                className="relative z-10 rounded-[24px] bg-white p-7 shadow-[0_15px_50px_-25px_rgba(16,32,24,.22)]"
              >
                <span className="grid h-12 w-12 place-items-center rounded-full bg-[#eaf3e5] text-sm font-bold text-[#0d7a38]">
                  {num}
                </span>
                <h3 className="mt-8 text-2xl font-bold">{title}</h3>
                <p className="mt-3 leading-7 text-[#68756c]">{text}</p>
                {index === 0 ? (
                  <img
                    src={orangeProduce}
                    alt="Fresh oranges ready for Intelliscan quality inspection"
                    className="mt-7 h-28 w-full rounded-2xl object-cover"
                  />
                ) : (
                  <div
                    className={`mt-7 h-28 rounded-2xl ${index === 1 ? "step-analyse" : "step-result"}`}
                  />
                )}
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="applications" className="scroll-mt-20 pb-20 sm:pb-24">
        <div className="mx-auto max-w-[1180px] px-5 lg:px-8">
          <div className="overflow-hidden rounded-[32px] bg-[#dfeecf]">
            <div className="grid lg:grid-cols-[1fr_.95fr]">
              <div className="px-7 py-12 sm:px-12 sm:py-14 lg:px-16">
                <p className="section-kicker">Made for real environments</p>
                <h2 className="mt-5 max-w-[520px] text-4xl font-bold leading-tight tracking-[-0.04em] sm:text-5xl">
                  Where better grading makes a difference.
                </h2>
                <div className="mt-9 grid gap-3 sm:grid-cols-2">
                  {[
                    "Agricultural markets",
                    "Processing facilities",
                    "Farms & warehouses",
                    "Aggregation centres",
                    "Produce trading",
                    "Quality assurance",
                  ].map((text) => (
                    <div
                      key={text}
                      className="flex items-center gap-3 rounded-xl bg-white/65 px-4 py-3 text-sm font-semibold"
                    >
                      <span className="grid h-7 w-7 place-items-center rounded-full bg-[#0d7a38] text-white">
                        <LeafIcon />
                      </span>
                      {text}
                    </div>
                  ))}
                </div>
              </div>
              <div className="applications-visual relative min-h-[390px] overflow-hidden">
                <div className="absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/30" />
                <div className="absolute left-1/2 top-1/2 h-56 w-56 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/20" />
                <img
                  src={intelliscanDevice}
                  alt="Intelliscan device"
                  className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full object-cover shadow-2xl ring-8 ring-white/10"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        id="about"
        className="scroll-mt-20 border-y border-[#102018]/8 bg-white py-20 sm:py-24"
      >
        <div className="mx-auto grid max-w-[1180px] gap-10 px-5 lg:grid-cols-2 lg:items-center lg:px-8">
          <div>
            <p className="section-kicker">Built for agriculture</p>
            <h2 className="mt-5 text-4xl font-bold leading-tight tracking-[-0.04em] sm:text-5xl">
              Helping produce professionals make the call.
            </h2>
          </div>
          <div className="lg:pl-10">
            <p className="text-lg leading-8 text-[#526156]">
              Intelliscan combines a camera, embedded microprocessor, AI model
              and display into one portable inspection tool. It is designed to
              support visible-defect detection and consistent grading decisions
              for people responsible for produce quality.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              {["Portable", "AI-powered", "Edge processing", "Easy to use"].map(
                (tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-[#102018]/10 px-4 py-2 text-sm font-semibold"
                  >
                    {tag}
                  </span>
                ),
              )}
            </div>
          </div>
        </div>
      </section>

      <section
        id="contact"
        className="scroll-mt-20 px-5 py-16 sm:py-20 lg:px-8"
      >
        <div className="mx-auto max-w-[1180px] rounded-[32px] bg-[#0d255f] px-7 py-12 text-white sm:px-12 lg:flex lg:items-center lg:justify-between lg:px-16">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#86c83f]">
              See Intelliscan in action
            </p>
            <h2 className="mt-4 text-3xl font-bold tracking-[-0.035em] sm:text-4xl">
              Bring consistent quality control to every batch.
            </h2>
          </div>
          <a
            href="mailto:hello@intelliscan.africa"
            className="mt-8 flex shrink-0 items-center justify-center gap-3 rounded-full bg-white px-7 py-4 text-sm font-bold text-[#0d255f] transition hover:-translate-y-1 lg:mt-0"
          >
            Request a demo <ArrowIcon />
          </a>
        </div>
      </section>

      <footer className="bg-[#102018] text-white">
        <div className="mx-auto flex max-w-[1180px] flex-col gap-6 px-5 py-8 sm:flex-row sm:items-center sm:justify-between lg:px-8">
          <div className="flex items-center gap-3">
            <img
              src={logoDark}
              alt=""
              className="h-9 w-9 rounded-full object-cover ring-1 ring-white/20"
            />
            <span className="text-sm font-bold tracking-[0.16em]">
              INTELLISCAN
            </span>
          </div>
          <p className="text-xs text-white/45">
            © 2026 Intelliscan. Intelligent quality detection.
          </p>
        </div>
      </footer>
    </main>
  );
}

export default App;
