const testimonials = [
  {
    name: "Priya Nandan",
    role: "Owner",
    company: "Aria & Co.",
    initials: "PN",
    quote:
      "The morning ledger changed how I start my day. I used to piece together three spreadsheets before I knew what mattered — now it's just there, already ranked.",
    kpi: "Saved 6 hrs/week",
  },
  {
    name: "Marcus Ell",
    role: "Operations Manager",
    company: "Halcyon Home",
    initials: "ME",
    quote:
      "We caught a stockout on our best-seller almost a week early. That single alert paid for the subscription for the rest of the year.",
    kpi: "+18% revenue",
  },
  {
    name: "Sofia Ferro",
    role: "Founder",
    company: "Ferro & Vine",
    initials: "SF",
    quote:
      "It doesn't try to impress you with charts. It just tells you what changed and why it matters, which is exactly what I open it for every morning.",
    kpi: "Fewer stockouts",
  },
];

function Star() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M12 2.5l2.7 6.4 6.9.6-5.2 4.6 1.6 6.8-6-3.6-6 3.6 1.6-6.8-5.2-4.6 6.9-.6L12 2.5Z"
        fill="#C9A227"
        opacity="0.85"
      />
    </svg>
  );
}

export function Testimonials() {
  return (
    <section
      aria-labelledby="testimonials-heading"
      className="relative overflow-hidden border-t border-[#F3F1EA]/[0.06] px-6 py-28"
    >
      <style>{`
        @keyframes testimonialFadeUp {
          from { opacity: 0; transform: translateY(16px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes testimonialFloat {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-6px); }
        }
        .testimonial-fade-1 { animation: testimonialFadeUp 0.7s cubic-bezier(0.16, 1, 0.3, 1) both; }
        .testimonial-fade-2 { animation: testimonialFadeUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.1s both; }
        .testimonial-card-1 { animation: testimonialFadeUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.15s both, testimonialFloat 7.5s ease-in-out 1s infinite; }
        .testimonial-card-2 { animation: testimonialFadeUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.28s both, testimonialFloat 8.5s ease-in-out 1.4s infinite; }
        .testimonial-card-3 { animation: testimonialFadeUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.41s both, testimonialFloat 7.9s ease-in-out 1.8s infinite; }
        @media (prefers-reduced-motion: reduce) {
          .testimonial-fade-1, .testimonial-fade-2, .testimonial-card-1, .testimonial-card-2, .testimonial-card-3 {
            animation: none !important;
          }
        }
      `}</style>

      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#C9A227]/25 to-transparent"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-0 h-[380px] w-[680px] -translate-x-1/2 rounded-full opacity-[0.05] blur-[130px]"
        style={{ background: "radial-gradient(circle, #C9A227 0%, transparent 70%)" }}
      />

      <div className="relative mx-auto max-w-6xl">
        <div className="testimonial-fade-1 mx-auto max-w-xl text-center">
          <p className="text-[11.5px] uppercase tracking-[0.16em] text-[#C9A227]">
            Trusted by merchants
          </p>
          <h2
            id="testimonials-heading"
            className="mt-4 font-serif text-[32px] leading-[1.15] tracking-[-0.015em] text-[#F3F1EA] sm:text-[40px]"
          >
            Real stores. Real mornings.
          </h2>
          <p className="testimonial-fade-2 mt-4 text-[15px] leading-relaxed tracking-[-0.005em] text-[#9C968C]">
            Independent Shopify merchants use ShopPilot to start the day with
            answers instead of spreadsheets.
          </p>
        </div>

        <div className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((t, i) => (
            <article
              key={t.name}
              className={`group relative ${
                i === 0
                  ? "testimonial-card-1"
                  : i === 1
                    ? "testimonial-card-2"
                    : "testimonial-card-3"
              }`}
            >
              {/* Premium gradient border — catches light on hover */}
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-700 ease-out group-hover:opacity-100"
                style={{
                  padding: 1,
                  background:
                    "linear-gradient(150deg, transparent 20%, rgba(201,162,39,0.5) 45%, rgba(232,199,102,0.7) 50%, rgba(201,162,39,0.5) 55%, transparent 80%)",
                  backgroundSize: "220% 220%",
                  WebkitMask:
                    "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                  WebkitMaskComposite: "xor",
                  maskComposite: "exclude",
                }}
              />

              <div
                className="relative flex h-full flex-col overflow-hidden rounded-2xl border border-[#F3F1EA]/[0.07] bg-gradient-to-b from-[#131418] to-[#0F1013] p-7 transition-all ease-out group-hover:-translate-y-1"
                style={{
                  transitionDuration: "550ms",
                  transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
                  boxShadow:
                    "0 18px 40px -24px rgba(0,0,0,0.55), 0 1px 0 0 rgba(255,255,255,0.03) inset",
                }}
              >
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-white/[0.09] to-transparent"
                />
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-500 ease-out group-hover:opacity-100"
                  style={{
                    boxShadow:
                      "0 30px 60px -28px rgba(0,0,0,0.6), 0 0 0 1px rgba(201,162,39,0.08) inset",
                  }}
                />

                <div className="relative flex items-center gap-3.5">
                  <div
                    className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-[#C9A227]/25 bg-[#101114] font-serif text-[13px] text-[#C9A227]"
                    aria-hidden="true"
                  >
                    {t.initials}
                  </div>
                  <div>
                    <p className="text-[13.5px] font-medium text-[#F3F1EA]">{t.name}</p>
                    <p className="text-[12px] text-[#6E6A63]">
                      {t.role} · {t.company}
                    </p>
                  </div>
                </div>

                <div className="relative mt-4 flex gap-1" role="img" aria-label="5 out of 5 stars">
                  {Array.from({ length: 5 }).map((_, idx) => (
                    <Star key={idx} />
                  ))}
                </div>

                <p className="relative mt-4 flex-1 text-[13.5px] leading-relaxed tracking-[-0.003em] text-[#9C968C]">
                  &ldquo;{t.quote}&rdquo;
                </p>

                <div className="relative mt-6 border-t border-[#F3F1EA]/[0.06] pt-4">
                  <span className="rounded-full border border-[#C9A227]/25 bg-[#C9A227]/[0.04] px-3 py-1 text-[11px] tracking-[0.01em] text-[#C9A227]">
                    {t.kpi}
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}