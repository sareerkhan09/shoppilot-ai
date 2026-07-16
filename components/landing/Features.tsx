import { features } from "@/lib/landing/data";

export function Features() {
  return (
    <section id="features" className="relative overflow-hidden px-6 py-28">
      {/* Ambient background depth — soft, low-opacity, never distracting */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-0 h-[440px] w-[720px] -translate-x-1/2 rounded-full opacity-[0.05] blur-[130px]"
        style={{ background: "radial-gradient(circle, #C9A227 0%, transparent 70%)" }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-0 right-[8%] h-[300px] w-[420px] rounded-full opacity-[0.04] blur-[110px]"
        style={{ background: "radial-gradient(circle, #E8C766 0%, transparent 70%)" }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(243,241,234,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(243,241,234,0.5) 1px, transparent 1px)",
          backgroundSize: "44px 44px",
          maskImage:
            "radial-gradient(ellipse 70% 55% at 50% 30%, black 30%, transparent 100%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 70% 55% at 50% 30%, black 30%, transparent 100%)",
        }}
      />

      <div className="relative mx-auto max-w-6xl">
        <div className="mx-auto max-w-xl text-center">
          <p className="text-[11.5px] uppercase tracking-[0.16em] text-[#C9A227]">
            Why it's different
          </p>
          <h2 className="mt-4 font-serif text-[32px] leading-[1.15] tracking-[-0.015em] text-[#F3F1EA] sm:text-[40px]">
            Not a dashboard. An account of your business.
          </h2>
          <p className="mt-4 text-[15px] leading-relaxed tracking-[-0.005em] text-[#9C968C]">
            Every entry below is written from your own store's numbers, not a
            generic template applied to every merchant.
          </p>
        </div>

        <div className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => (
            <div key={feature.title} className="group relative">
              {/* Premium gradient border — only catches light on hover */}
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
                className="relative overflow-hidden rounded-2xl border border-[#F3F1EA]/[0.07] bg-gradient-to-b from-[#131418] to-[#0F1013] p-7 transition-all ease-out group-hover:-translate-y-1"
                style={{
                  transitionDuration: "550ms",
                  transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
                  boxShadow:
                    "0 18px 40px -24px rgba(0,0,0,0.55), 0 1px 0 0 rgba(255,255,255,0.03) inset",
                }}
              >
                {/* Soft top highlight — the glass edge */}
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-white/[0.09] to-transparent"
                />

                {/* Group-hover deepened shadow layer */}
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-500 ease-out group-hover:opacity-100"
                  style={{
                    boxShadow:
                      "0 30px 60px -28px rgba(0,0,0,0.6), 0 0 0 1px rgba(201,162,39,0.08) inset",
                  }}
                />

                <span className="relative text-[11px] font-medium uppercase tracking-[0.12em] text-[#C9A227]">
                  {feature.label}
                </span>
                <h3 className="relative mt-3 font-serif text-[16.5px] leading-snug tracking-[-0.005em] text-[#F3F1EA]">
                  {feature.title}
                </h3>
                <p className="relative mt-2.5 text-[13.5px] leading-relaxed tracking-[-0.003em] text-[#9C968C]">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}