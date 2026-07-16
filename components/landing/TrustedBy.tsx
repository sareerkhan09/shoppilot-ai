"use client";

import { useRef, useState, useCallback, useEffect, type MouseEvent } from "react";

const GOLD = {
  base: "#C9A227",
  mid: "#B68D2C",
  deep: "#A77A1C",
} as const;

const TIMING = {
  sheen: 3.2,
  reflection: 8,
  drift: [12, 16, 20] as const,
  particle: [7, 9, 11] as const,
};

const TILT_MAX_DEG = 6;
const LIFT_PX = -6;
const HOVER_SCALE = 1.018;

const COMPANIES = ["NORDIC", "VELOR", "FERRO", "ATELIER", "HALCYON", "MARLOWE"];

function useInView<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { rootMargin: "-80px", threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return { ref, inView };
}

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mql = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mql.matches);
    const listener = (e: MediaQueryListEvent) => setReduced(e.matches);
    mql.addEventListener("change", listener);
    return () => mql.removeEventListener("change", listener);
  }, []);
  return reduced;
}

interface LogoCardProps {
  name: string;
  index: number;
  reduceMotion: boolean;
  visible: boolean;
}

function LogoCard({ name, index, reduceMotion, visible }: LogoCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [glow, setGlow] = useState({ x: 50, y: 50 });
  const [hovered, setHovered] = useState(false);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [lift, setLift] = useState(0);
  const [scale, setScale] = useState(1);

  const handleMouseMove = useCallback(
    (e: MouseEvent<HTMLDivElement>) => {
      const el = cardRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const px = (e.clientX - rect.left) / rect.width;
      const py = (e.clientY - rect.top) / rect.height;

      if (!reduceMotion) {
        setTilt({
          x: (0.5 - py) * TILT_MAX_DEG,
          y: (px - 0.5) * TILT_MAX_DEG,
        });
      }
      setGlow({ x: px * 100, y: py * 100 });
    },
    [reduceMotion]
  );

  const handleEnter = useCallback(() => {
    setHovered(true);
    if (!reduceMotion) {
      setLift(LIFT_PX);
      setScale(HOVER_SCALE);
    }
  }, [reduceMotion]);

  const handleLeave = useCallback(() => {
    setHovered(false);
    setTilt({ x: 0, y: 0 });
    setLift(0);
    setScale(1);
  }, []);

  return (
    <div
      className="group relative"
      style={{
        perspective: 1000,
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0) scale(1)" : "translateY(28px) scale(0.975)",
        filter: visible ? "blur(0px)" : "blur(6px)",
        transition: "opacity 0.8s cubic-bezier(0.16,1,0.3,1), transform 0.8s cubic-bezier(0.16,1,0.3,1), filter 0.8s cubic-bezier(0.16,1,0.3,1)",
        transitionDelay: visible ? `${0.12 + index * 0.09}s` : "0s",
      }}
    >
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleEnter}
        onMouseLeave={handleLeave}
        style={{
          transform: reduceMotion
            ? "none"
            : `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) translateY(${lift}px) scale(${scale})`,
          transformStyle: "preserve-3d",
          transition: "transform 0.55s cubic-bezier(0.16,1,0.3,1)",
          willChange: "transform",
        }}
        className="relative flex h-[140px] flex-col items-center justify-center overflow-hidden rounded-2xl"
      >
        <div
          aria-hidden
          className="absolute inset-0 rounded-2xl"
          style={{
            background: "linear-gradient(180deg, #16171B 0%, #121316 55%, #0E0F12 100%)",
            border: "1px solid rgba(255,255,255,0.055)",
          }}
        />

        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-2xl transition-[box-shadow] duration-500 ease-out"
          style={{
            boxShadow: hovered
              ? [
                  "0 36px 60px -24px rgba(0,0,0,0.62)",
                  "0 12px 24px -12px rgba(0,0,0,0.45)",
                  "0 0 0 1px rgba(201,162,39,0.16) inset",
                  "0 1px 0 0 rgba(255,255,255,0.06) inset",
                  "0 -1px 0 0 rgba(0,0,0,0.5) inset",
                ].join(", ")
              : [
                  "0 16px 34px -20px rgba(0,0,0,0.55)",
                  "0 4px 10px -6px rgba(0,0,0,0.4)",
                  "0 1px 0 0 rgba(255,255,255,0.035) inset",
                  "0 -1px 0 0 rgba(0,0,0,0.4) inset",
                ].join(", "),
          }}
        />

        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-4 top-0 h-px bg-gradient-to-r from-transparent via-white/[0.16] to-transparent"
        />

        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-2xl opacity-60"
          style={{
            background: "radial-gradient(120% 90% at 50% -10%, rgba(201,162,39,0.05), transparent 60%)",
          }}
        />

        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-500 ease-out group-hover:opacity-100"
          style={{
            background: `radial-gradient(220px circle at ${glow.x}% ${glow.y}%, rgba(232,209,150,0.10), transparent 72%)`,
          }}
        />

        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-500 ease-out group-hover:opacity-100"
          style={{
            padding: 1,
            background:
              "linear-gradient(120deg, transparent 22%, rgba(167,122,28,0.45) 45%, rgba(201,162,39,0.65) 50%, rgba(167,122,28,0.45) 55%, transparent 78%)",
            backgroundSize: "260% 260%",
            WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
            WebkitMaskComposite: "xor",
            maskComposite: "exclude",
            animation: reduceMotion
              ? "none"
              : `trustedby-sheen ${TIMING.sheen}s linear infinite, trustedby-breathe 2.4s ease-in-out infinite`,
          }}
        />

        <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden rounded-2xl">
          <div
            className="absolute -inset-y-12 -left-1/2 w-1/4 opacity-[0.045]"
            style={{
              background: "linear-gradient(100deg, transparent, #F3F1EA, transparent)",
              animation: reduceMotion ? "none" : `trustedby-reflection ${TIMING.reflection}s ease-in-out infinite`,
              animationDelay: `${index * 0.7}s`,
            }}
          />
        </div>

        <div className="relative" style={{ transform: "translateZ(28px)" }}>
          <span className="select-none text-center text-[15px] font-light tracking-[0.34em] text-[#9C968C] transition-colors duration-500 ease-out group-hover:text-[#F3F1EA]">
            {name}
          </span>
        </div>

        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-6 bottom-0 h-px bg-gradient-to-r from-transparent via-black/40 to-transparent"
        />
      </div>
    </div>
  );
}

interface AmbientGlowProps {
  size: number;
  top: string;
  left: string;
  color: string;
  duration: number;
  delay: number;
  opacity: number;
  reduceMotion: boolean;
}

function AmbientGlow({ size, top, left, color, duration, delay, opacity, reduceMotion }: AmbientGlowProps) {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute rounded-full"
      style={{
        width: size,
        height: size,
        top,
        left,
        background: `radial-gradient(circle, ${color} 0%, transparent 70%)`,
        opacity,
        filter: `blur(${size / 3}px)`,
        animation: reduceMotion ? "none" : `trustedby-drift ${duration}s ease-in-out infinite`,
        animationDelay: `${delay}s`,
      }}
    />
  );
}

interface DustParticle {
  id: number;
  top: number;
  left: number;
  size: number;
  duration: number;
  delay: number;
}

function GoldDust({ reduceMotion }: { reduceMotion: boolean }) {
  const [particles, setParticles] = useState<DustParticle[]>([]);

  useEffect(() => {
    setParticles(
      Array.from({ length: 16 }, (_, i) => ({
        id: i,
        top: Math.round((Math.random() * 90 + 5) * 100) / 100,
        left: Math.round((Math.random() * 96 + 2) * 100) / 100,
        size: Math.round((Math.random() * 1.4 + 0.6) * 10) / 10,
        duration: TIMING.particle[i % TIMING.particle.length] + Math.round(Math.random() * 20) / 10,
        delay: Math.round(Math.random() * 6 * 10) / 10,
      }))
    );
  }, []);

  if (reduceMotion || particles.length === 0) return null;

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      {particles.map((p: DustParticle) => (
        <span
          key={p.id}
          className="absolute rounded-full"
          style={{
            top: `${p.top}%`,
            left: `${p.left}%`,
            width: p.size,
            height: p.size,
            background: GOLD.base,
            opacity: 0.14,
            animation: `trustedby-particle ${p.duration}s ease-in-out infinite`,
            animationDelay: `${p.delay}s`,
          }}
        />
      ))}
    </div>
  );
}

export function TrustedBy() {
  const reduceMotion = usePrefersReducedMotion();
  const { ref: sectionRef, inView } = useInView<HTMLDivElement>();

  return (
    <section
      className="relative w-full overflow-hidden bg-[#0B0C0E] py-24 sm:py-28"
      aria-labelledby="trusted-by-heading"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-black/50 via-black/10 to-transparent"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/[0.08] to-transparent"
      />

      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background: "radial-gradient(ellipse 80% 65% at 50% 35%, transparent 40%, rgba(0,0,0,0.35) 100%)",
        }}
      />

      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(243,241,234,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(243,241,234,0.5) 1px, transparent 1px)",
          backgroundSize: "42px 42px",
          maskImage: "radial-gradient(ellipse 70% 60% at 50% 40%, black 40%, transparent 100%)",
          WebkitMaskImage: "radial-gradient(ellipse 70% 60% at 50% 40%, black 40%, transparent 100%)",
        }}
      />

      <svg aria-hidden className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.02]">
        <filter id="trustedbyGrain">
          <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" stitchTiles="stitch" />
        </filter>
        <rect width="100%" height="100%" filter="url(#trustedbyGrain)" />
      </svg>

      <AmbientGlow size={520} top="-14%" left="6%" color={GOLD.base} duration={TIMING.drift[0]} delay={0} opacity={0.06} reduceMotion={reduceMotion} />
      <AmbientGlow size={380} top="8%" left="70%" color={GOLD.deep} duration={TIMING.drift[1]} delay={1.4} opacity={0.055} reduceMotion={reduceMotion} />
      <AmbientGlow size={320} top="58%" left="38%" color={GOLD.mid} duration={TIMING.drift[2]} delay={2.6} opacity={0.05} reduceMotion={reduceMotion} />

      <GoldDust reduceMotion={reduceMotion} />

      <div ref={sectionRef} className="relative mx-auto flex max-w-5xl flex-col items-center px-6">
        <p
          className="text-[11px] font-semibold uppercase tracking-[0.32em] text-[#A77A1C]"
          style={{
            opacity: inView ? 1 : 0,
            transform: inView ? "translateY(0)" : "translateY(28px)",
            filter: inView ? "blur(0px)" : "blur(6px)",
            transition: "opacity 0.8s cubic-bezier(0.16,1,0.3,1), transform 0.8s cubic-bezier(0.16,1,0.3,1), filter 0.8s cubic-bezier(0.16,1,0.3,1)",
          }}
        >
          Trusted by
        </p>

        <h2
          id="trusted-by-heading"
          className="mt-5 max-w-xl text-balance text-center text-[26px] font-medium leading-snug tracking-[-0.01em] text-[#F3F1EA] sm:text-3xl"
          style={{
            opacity: inView ? 1 : 0,
            transform: inView ? "translateY(0)" : "translateY(28px)",
            filter: inView ? "blur(0px)" : "blur(6px)",
            transition: "opacity 0.8s cubic-bezier(0.16,1,0.3,1) 0.08s, transform 0.8s cubic-bezier(0.16,1,0.3,1) 0.08s, filter 0.8s cubic-bezier(0.16,1,0.3,1) 0.08s",
          }}
        >
          Powering commerce for brands that care about craft
        </h2>

        <div className="mt-16 grid w-full grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-5 lg:grid-cols-6 lg:gap-6">
          {COMPANIES.map((name, index) => (
            <LogoCard key={name} name={name} index={index} reduceMotion={reduceMotion} visible={inView} />
          ))}
        </div>
      </div>

      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black/40 via-transparent to-transparent"
      />

      <style>{`
        @keyframes trustedby-sheen {
          0% { background-position: 0% 50%; }
          100% { background-position: 260% 50%; }
        }
        @keyframes trustedby-breathe {
          0%, 100% { opacity: 0.75; }
          50% { opacity: 1; }
        }
        @keyframes trustedby-drift {
          0%, 100% { transform: translate(0px, 0px); }
          50% { transform: translate(26px, 20px); }
        }
        @keyframes trustedby-reflection {
          0% { transform: translateX(-40%) skewX(-12deg); }
          50% { transform: translateX(260%) skewX(-12deg); }
          100% { transform: translateX(260%) skewX(-12deg); }
        }
        @keyframes trustedby-particle {
          0%, 100% { transform: translateY(0px); opacity: 0.05; }
          50% { transform: translateY(-16px); opacity: 0.2; }
        }
        @media (prefers-reduced-motion: reduce) {
          * { animation-duration: 0.01ms !important; animation-iteration-count: 1 !important; }
        }
      `}</style>
    </section>
  );
}