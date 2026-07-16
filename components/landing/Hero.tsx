"use client";

import { useRef, useState } from "react";

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [cardHover, setCardHover] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ x: px, y: py });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
  };

  const layer = (depth: number) => ({
    transform: `translate3d(${tilt.x * depth}px, ${tilt.y * depth}px, 0)`,
    transition: "transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)",
  });

  // Liquid, physical tilt for the main dashboard card — subtle 3D rotation
  // that follows the cursor, plus a gentle lift + scale on hover.
  const cardTilt = {
    transform: `perspective(1400px) rotateX(${-tilt.y * 3.5}deg) rotateY(${
      tilt.x * 3.5
    }deg) translate3d(${tilt.x * 18}px, ${tilt.y * 18}px, 0) translateY(${
      cardHover ? -8 : 0
    }px) scale(${cardHover ? 1.012 : 1})`,
    transition: "transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)",
    transformStyle: "preserve-3d" as const,
  };

  return (
  <>
    <style>{`
      @keyframes heroFadeUp {
        from { opacity: 0; transform: translateY(18px); }
        to { opacity: 1; transform: translateY(0); }
      }

      @keyframes heroFloat {
        0%, 100% { transform: translateY(0px); }
        50% { transform: translateY(-10px); }
      }

      @keyframes heroFloatSlow {
        0%, 100% { transform: translateY(0px); }
        50% { transform: translateY(-14px); }
      }

      @keyframes heroDash {
        to { stroke-dashoffset: -400; }
      }

      @keyframes heroPulse {
        0%, 100% { opacity: 0.5; }
        50% { opacity: 1; }
      }

      @keyframes heroGlow {
        0%, 100% { opacity: 0.3; }
        50% { opacity: 0.6; }
      }

      @keyframes heroBorder {
        0% { background-position: 0% 50%; }
        100% { background-position: 200% 50%; }
      }

      .hero-fade-1 { animation: heroFadeUp 0.7s ease-out both; }
      .hero-fade-2 { animation: heroFadeUp 0.8s ease-out 0.12s both; }
      .hero-fade-3 { animation: heroFadeUp 0.9s ease-out 0.24s both; }
      .hero-fade-4 { animation: heroFadeUp 1s ease-out 0.36s both; }

      .hero-float-a { animation: heroFloat 5.5s ease-in-out infinite; }
      .hero-float-b { animation: heroFloat 6.5s ease-in-out 0.8s infinite; }
      .hero-float-c { animation: heroFloat 7.2s ease-in-out 1.4s infinite; }
      .hero-float-d { animation: heroFloatSlow 8s ease-in-out 0.4s infinite; }
      .hero-float-e { animation: heroFloatSlow 9s ease-in-out 1.1s infinite; }
      .hero-float-f { animation: heroFloat 6s ease-in-out 0.6s infinite; }
      .hero-float-g { animation: heroFloatSlow 7.6s ease-in-out 1.8s infinite; }
      .hero-float-h { animation: heroFloat 6.8s ease-in-out 0.2s infinite; }

      .hero-graph-line {
        stroke-dasharray: 6 10;
        animation: heroDash 14s linear infinite;
      }

      .hero-pulse-dot {
        animation: heroPulse 2.4s ease-in-out infinite;
      }

      .hero-glow {
        animation: heroGlow 5s ease-in-out infinite;
      }

      .hero-glass {
        backdrop-filter: blur(16px);
        -webkit-backdrop-filter: blur(16px);
      }

      .hero-card-border {
        position: relative;
      }

      .hero-card-border::before {
        content: "";
        position: absolute;
        inset: -1px;
        border-radius: inherit;
        padding: 1px;
        background: linear-gradient(
          120deg,
          transparent 0%,
          rgba(201,162,39,.55) 45%,
          transparent 70%
        );
        background-size: 220% 220%;
        -webkit-mask: linear-gradient(#000 0 0) content-box,
                      linear-gradient(#000 0 0);
        -webkit-mask-composite: xor;
        mask-composite: exclude;
        opacity: 0;
        transition: opacity .4s ease;
        pointer-events: none;
      }

      .hero-card-border:hover::before {
        opacity: 1;
        animation: heroBorder 3.5s linear infinite;
      }
    `}</style>
    <section className="relative overflow-hidden px-6 pb-28 pt-24 sm:pt-32">
  <div
    className="pointer-events-none absolute inset-0 opacity-[0.035]"
    style={{
      backgroundImage:
        "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
    }}
  />

  <div
    ref={containerRef}
    onMouseMove={handleMouseMove}
    onMouseLeave={handleMouseLeave}
    className="relative mx-auto max-w-7xl"
  >

    <div className="hero-glow pointer-events-none absolute left-1/2 top-0 h-[600px] w-[900px] -translate-x-1/2 rounded-full blur-[130px]"
      style={{ background: "radial-gradient(circle, #C9A227 0%, transparent 70%)" }}
    />

    <div className="pointer-events-none absolute left-1/3 top-36 h-[380px] w-[560px] -translate-x-1/2 rounded-full opacity-[0.07] blur-[110px]"
      style={{ background: "radial-gradient(circle, #E8C766 0%, transparent 70%)" }}
    />

    <div className="pointer-events-none absolute right-1/4 top-72 h-[300px] w-[420px] rounded-full opacity-[0.05] blur-[100px]"
      style={{ background: "radial-gradient(circle, #B8860B 0%, transparent 70%)" }}
    />

    <div className="hero-fade-3 mx-auto mt-10 flex w-full max-w-md flex-col items-center justify-center gap-4 sm:max-w-none sm:flex-row">
      <a
        href="#pricing"
        className="group relative inline-flex w-full items-center justify-center overflow-hidden rounded-full bg-gradient-to-r from-[#E8C766] via-[#C9A227] to-[#B8860B] px-7 py-3.5 text-[14px] font-medium text-black sm:w-auto"
      >
        <span className="relative">Add ShopPilot to your store</span>
      </a>

      <a
        href="#how-it-works"
        className="w-full rounded-full border border-[#F3F1EA]/[0.14] px-7 py-3.5 text-center text-[14px] text-[#F3F1EA] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#F3F1EA]/[0.04] sm:w-auto"
      >
        See how it works
      </a>
    </div>

    <p className="hero-fade-3 mx-auto mt-5 max-w-md text-center text-[12px] text-[#6E6A63] sm:max-w-none">
      No credit card required · Free tier available · Two-minute setup
    </p>

          <div
            style={layer(14)}
            className="hero-float-c hero-card-border hero-glass pointer-events-none absolute -right-6 bottom-6 z-20 hidden w-[168px] rounded-[16px] border border-[#C9A227]/20 bg-[#101114]/75 p-4 shadow-[0_40px_100px_-40px_rgba(0,0,0,0.95)] sm:block">
            <p className="text-[10px] uppercase tracking-wider text-[#6E6A63]">Live orders</p>
            <p className="mt-2 font-serif text-[20px] text-[#F3F1EA]">7 new</p>
            <p className="mt-1 text-[11px] text-[#9C968C]">Last one 2 min ago</p>
          </div>

          <div
            style={layer(6)}
            className="hero-float-g hero-glass pointer-events-none absolute -bottom-12 left-1/2 hidden w-[210px] -translate-x-1/2 rounded-[16px] border border-[#F3F1EA]/[0.08] bg-[#0F1013]/65 p-4 opacity-80 shadow-[0_40px_90px_-40px_rgba(0,0,0,0.9)] lg:block"
          >
            <div className="flex items-center justify-between">
              <p className="text-[9.5px] uppercase tracking-wider text-[#6E6A63]">Growth this month</p>
              <span className="text-[10.5px] text-[#C9A227]">+18.6%</span>
            </div>
            <svg className="mt-2 h-8 w-full" viewBox="0 0 200 40" fill="none" preserveAspectRatio="none">
              <path
                className="hero-graph-line"
                d="M0 32 C 30 26, 50 34, 70 24 S 110 10, 140 16 S 180 4, 200 8"
                stroke="#E8C766"
                strokeWidth="1.4"
              />
            </svg>
          </div>

          <div
            style={layer(-6)}
            className="hero-float-h hero-glass pointer-events-none absolute -bottom-10 -left-10 hidden w-[150px] rounded-[14px] border border-[#F3F1EA]/[0.06] bg-[#0F1013]/50 p-3.5 opacity-55 blur-[1px] shadow-[0_30px_70px_-35px_rgba(0,0,0,0.9)] xl:block"
          >
            <p className="text-[9.5px] uppercase tracking-wider text-[#6E6A63]">Returning customers</p>
            <p className="mt-1.5 font-serif text-[17px] text-[#F3F1EA]">42%</p>
          </div>

          <div
            style={layer(8)}
            className="hero-float-a hero-glass pointer-events-none absolute -bottom-8 -right-12 hidden w-[150px] rounded-[14px] border border-[#F3F1EA]/[0.07] bg-[#0F1013]/55 p-3.5 opacity-70 shadow-[0_30px_70px_-35px_rgba(0,0,0,0.9)] xl:block"
          >
            <p className="text-[9.5px] uppercase tracking-wider text-[#6E6A63]">Customer happiness</p>
            <p className="mt-1.5 font-serif text-[17px] text-[#F3F1EA]">96 / 100</p>
          </div>

          <div
            style={layer(16)}
            className="hero-float-b pointer-events-none absolute -left-4 -top-4 z-20 hidden rounded-full border border-[#C9A227]/25 bg-[#0F1013] px-3 py-1.5 text-[10.5px] text-[#C9A227] shadow-[0_20px_40px_-20px_rgba(0,0,0,0.8)] sm:block">
            Synced 2 min ago
          </div>
          <div
            style={layer(18)}
            className="hero-float-c pointer-events-none absolute -right-8 top-24 z-20 hidden rounded-full border border-[#F3F1EA]/[0.1] bg-[#0F1013] px-3 py-1.5 text-[10.5px] text-[#9C968C] shadow-[0_20px_40px_-20px_rgba(0,0,0,0.8)] sm:block">
            + $1,842 today
          </div>
          <div
            style={layer(20)}
            className="hero-float-a pointer-events-none absolute -right-4 bottom-10 z-20 hidden rounded-full border border-[#C9A227]/25 bg-[#0F1013] px-3 py-1.5 text-[10.5px] text-[#C9A227] shadow-[0_20px_40px_-20px_rgba(0,0,0,0.8)] sm:block">
            3 entries ready
          </div>

          <div
            style={cardTilt}
            onMouseEnter={() => setCardHover(true)}
            onMouseLeave={() => setCardHover(false)}
            className="group relative z-30 mx-auto max-w-xl rounded-[18px] border border-[#C9A227]/20 bg-gradient-to-b from-[#15161A] to-[#0F1013] p-1.5 shadow-[0_50px_120px_-45px_rgba(0,0,0,0.95),0_0_0_1px_rgba(201,162,39,0.05)] transition-shadow duration-500 hover:shadow-[0_70px_150px_-45px_rgba(0,0,0,1),0_0_0_1px_rgba(201,162,39,0.12)]"
          >
            <div className="rounded-[13px] border border-[#F3F1EA]/[0.05] bg-[#0F1013] px-6 py-6 sm:px-8 sm:py-7">
              <div className="mb-5 flex items-center justify-between border-b border-[#C9A227]/[0.15] pb-4">
                <div>
                  <p className="font-serif text-[14px] text-[#F3F1EA]">
                    The Ledger — Thursday
                  </p>
                  <p className="mt-0.5 text-[11px] text-[#6E6A63]">
                    Prepared at 7:00 AM · Aria &amp; Co.
                  </p>
                </div>
                <span className="rounded-full border border-[#C9A227]/25 px-2 py-1 text-[10px] uppercase tracking-wider text-[#C9A227]">
                  3 entries
                </span>
              </div>

              <div className="flex flex-col divide-y divide-[#F3F1EA]/[0.06]">
                <div className="flex items-start justify-between gap-6 py-3">
                  <div>
                    <p className="text-[13px] text-[#F3F1EA]">
                      Sales are 18% below your Tuesday average
                    </p>
                    <p className="mt-1 text-[11.5px] text-[#6E6A63]">
                      Lowest in six weeks — likely tied to a paused ad set
                    </p>
                  </div>
                  <span className="shrink-0 font-serif italic text-[12.5px] text-[#C9A227]">
                    Attend
                  </span>
                </div>

                <div className="flex items-start justify-between gap-6 py-3">
                  <div>
                    <p className="text-[13px] text-[#F3F1EA]">
                      &ldquo;Aria Tote&rdquo; sells out in roughly three days
                    </p>
                    <p className="mt-1 text-[11.5px] text-[#6E6A63]">
                      Current velocity outpaces remaining stock
                    </p>
                  </div>
                  <span className="shrink-0 font-serif italic text-[12.5px] text-[#9C968C]">
                    Reorder
                  </span>
                </div>

                <div className="flex items-start justify-between gap-6 py-3">
                  <div>
                    <p className="text-[13px] text-[#F3F1EA]">
                      &ldquo;Linen Wrap&rdquo; is trending 63% above last week
                    </p>
                    <p className="mt-1 text-[11.5px] text-[#6E6A63]">
                      Fastest-moving item in your catalog this week
                    </p>
                  </div>
                  <span className="shrink-0 font-serif italic text-[12.5px] text-[#9C968C]">
                    Noted
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}