"use client";

import { useEffect, useState } from "react";

const navLinks = [
  { label: "Features", href: "#features" },
  { label: "How it works", href: "#how-it-works" },
  { label: "Integrations", href: "#integrations" },
  { label: "Pricing", href: "#pricing" },
];

export function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <style>{`
        @keyframes navFadeDown {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes navMenuIn {
          from { opacity: 0; transform: translateY(-8px) scale(0.98); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        .nav-fade {
          animation: navFadeDown 0.6s cubic-bezier(0.16, 1, 0.3, 1) both;
        }
        .nav-menu-in {
          animation: navMenuIn 0.28s cubic-bezier(0.16, 1, 0.3, 1) both;
        }
        .nav-link {
          position: relative;
        }
        .nav-link::after {
          content: "";
          position: absolute;
          left: 0;
          right: 100%;
          bottom: -4px;
          height: 1px;
          background: linear-gradient(90deg, #E8C766, #B8860B);
          transition: right 0.35s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .nav-link:hover::after {
          right: 0;
        }
        .nav-cta {
          position: relative;
          overflow: hidden;
        }
        .nav-cta::before {
          content: "";
          position: absolute;
          inset: 0;
          background: linear-gradient(120deg, transparent 20%, rgba(255, 255, 255, 0.55) 45%, transparent 70%);
          transform: translateX(-140%);
          transition: transform 0.7s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .nav-cta:hover::before {
          transform: translateX(140%);
        }
      `}</style>

      <header
        className={
          scrolled
            ? "nav-fade sticky top-0 z-50 border-b border-[#C9A227]/[0.14] bg-[#0B0C0E]/80 shadow-[0_20px_60px_-30px_rgba(0,0,0,0.9)] backdrop-blur-xl transition-all duration-500"
            : "nav-fade sticky top-0 z-50 border-b border-transparent bg-[#0B0C0E]/40 backdrop-blur-md transition-all duration-500"
        }
      >
        <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <a
            href="#"
            className="group flex items-center gap-2.5"
          >
            <span className="relative flex h-8 w-8 items-center justify-center overflow-hidden rounded-[8px] bg-gradient-to-br from-[#E8C766] via-[#D4AF37] to-[#8A701E] shadow-[inset_0_1px_0_rgba(255,255,255,0.5),0_6px_16px_-6px_rgba(201,162,39,0.6)] transition-transform duration-300 group-hover:scale-105">
              <span className="pointer-events-none absolute inset-x-0 top-0 h-1/2 bg-white/30"></span>
              <span className="relative font-serif text-[14px] font-bold text-[#0B0C0E]">
                S
              </span>
            </span>
            <span className="font-serif text-[17px] tracking-tight text-[#F3F1EA]">
              ShopPilot <span className="italic text-[#9C968C]">AI</span>
            </span>
          </a>

          <div className="hidden items-center gap-10 md:flex">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="nav-link text-[13.5px] font-medium text-[#9C968C] transition-colors duration-300 hover:text-[#F3F1EA]"
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="hidden items-center gap-5 md:flex">
            <a
              href="/login"
              className="text-[13.5px] font-medium text-[#9C968C] transition-colors duration-300 hover:text-[#F3F1EA]"
            >
              Sign in
            </a>
            <a
              href="#pricing"
              className="nav-cta rounded-full bg-gradient-to-r from-[#E8C766] via-[#D4AF37] to-[#B8860B] px-5 py-2.5 text-[13px] font-semibold text-[#0B0C0E] shadow-[inset_0_1px_0_rgba(255,255,255,0.5),0_10px_24px_-10px_rgba(201,162,39,0.55)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.6),0_14px_30px_-10px_rgba(201,162,39,0.7)]"
            >
              Add to Shopify
            </a>
          </div>

          <button
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
            className="relative flex h-9 w-9 items-center justify-center rounded-full text-[#F3F1EA] transition-colors duration-300 hover:bg-[#F3F1EA]/[0.06] md:hidden"
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 18 18"
              fill="none"
            >
              <path
                d="M2 5H16"
                stroke="currentColor"
                strokeWidth="1.4"
                strokeLinecap="round"
                className="transition-all duration-300"
                style={
                  menuOpen
                    ? { transform: "translateY(4px) rotate(45deg)", transformOrigin: "center" }
                    : undefined
                }
              />
              <path
                d="M2 9H16"
                stroke="currentColor"
                strokeWidth="1.4"
                strokeLinecap="round"
                className="transition-opacity duration-200"
                style={menuOpen ? { opacity: 0 } : undefined}
              />
              <path
                d="M2 13H16"
                stroke="currentColor"
                strokeWidth="1.4"
                strokeLinecap="round"
                className="transition-all duration-300"
                style={
                  menuOpen
                    ? { transform: "translateY(-4px) rotate(-45deg)", transformOrigin: "center" }
                    : undefined
                }
              />
            </svg>
          </button>
        </nav>

        {menuOpen && (
          <div className="nav-menu-in border-t border-[#C9A227]/[0.12] bg-[#0B0C0E]/95 px-6 py-6 backdrop-blur-xl md:hidden">
            <div className="flex flex-col gap-1">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="rounded-lg px-3 py-3 text-[15px] font-medium text-[#F3F1EA] transition-colors duration-200 hover:bg-[#F3F1EA]/[0.05]"
                >
                  {link.label}
                </a>
              ))}
            </div>

            <div className="mt-4 flex flex-col gap-3 border-t border-[#F3F1EA]/[0.06] pt-5">
              <a
                href="/login"
                onClick={() => setMenuOpen(false)}
                className="rounded-full border border-[#F3F1EA]/[0.12] px-5 py-3 text-center text-[14px] font-medium text-[#F3F1EA] transition-colors duration-300 hover:bg-[#F3F1EA]/[0.05]"
              >
                Sign in
              </a>
              <a
                href="#pricing"
                onClick={() => setMenuOpen(false)}
                className="nav-cta rounded-full bg-gradient-to-r from-[#E8C766] via-[#D4AF37] to-[#B8860B] px-5 py-3 text-center text-[14px] font-semibold text-[#0B0C0E] shadow-[inset_0_1px_0_rgba(255,255,255,0.5),0_10px_24px_-10px_rgba(201,162,39,0.55)] transition-all duration-300"
              >
                Add to Shopify
              </a>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
