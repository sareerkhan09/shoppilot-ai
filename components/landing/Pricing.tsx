import { pricingTiers } from "@/lib/landing/data";

export function Pricing() {
  return (
    <section id="pricing" className="relative overflow-hidden border-t border-[#F3F1EA]/[0.06] px-6 py-28">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#C9A227]/25 to-transparent"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-10 h-[380px] w-[680px] -translate-x-1/2 rounded-full opacity-[0.05] blur-[130px]"
        style={{ background: "radial-gradient(circle, #C9A227 0%, transparent 70%)" }}
      />

      <div className="relative mx-auto max-w-5xl">
        <div className="mx-auto max-w-xl text-center">
          <p className="text-[11.5px] uppercase tracking-[0.16em] text-[#C9A227]">Pricing</p>
          <h2 className="mt-4 font-serif text-[32px] leading-[1.15] tracking-[-0.015em] text-[#F3F1EA] sm:text-[40px]">
            Priced like staff, not software.
          </h2>
        </div>

        <div className="mt-16 grid gap-6 lg:grid-cols-3">
          {pricingTiers.map((tier) => (
            <div key={tier.name} className="group relative">
              {/* Premium gradient border — always faintly present on the highlighted tier, only on hover for the rest */}
              <div
                aria-hidden
                className={
                  tier.highlighted
                    ? "pointer-events-none absolute inset-0 rounded-[20px] opacity-70 transition-opacity duration-700 ease-out group-hover:opacity-100"
                    : "pointer-events-none absolute inset-0 rounded-[20px] opacity-0 transition-opacity duration-700 ease-out group-hover:opacity-100"
                }
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
                className={
                  tier.highlighted
                    ? "relative overflow-hidden rounded-[20px] border border-[#C9A227]/40 bg-gradient-to-b from-[#1A1710] to-[#101114] p-8 transition-all ease-out group-hover:-translate-y-1.5"
                    : "relative overflow-hidden rounded-[20px] border border-[#F3F1EA]/[0.08] bg-gradient-to-b from-[#131418] to-[#0F1013] p-8 transition-all ease-out group-hover:-translate-y-1"
                }
                style={{
                  transitionDuration: "600ms",
                  transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
                  boxShadow: tier.highlighted
                    ? "0 40px 90px -35px rgba(0,0,0,0.75), 0 1px 0 0 rgba(255,255,255,0.04) inset"
                    : "0 18px 44px -26px rgba(0,0,0,0.55), 0 1px 0 0 rgba(255,255,255,0.03) inset",
                }}
              >
                {/* Soft glass top highlight */}
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-x-7 top-0 h-px bg-gradient-to-r from-transparent via-white/[0.09] to-transparent"
                />

                {/* Deepened shadow layer on hover */}
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-0 rounded-[20px] opacity-0 transition-opacity duration-500 ease-out group-hover:opacity-100"
                  style={{
                    boxShadow: tier.highlighted
                      ? "0 55px 110px -35px rgba(0,0,0,0.85), 0 0 0 1px rgba(201,162,39,0.12) inset"
                      : "0 30px 60px -28px rgba(0,0,0,0.6), 0 0 0 1px rgba(201,162,39,0.06) inset",
                  }}
                />

                {tier.highlighted && (
                  <span
                    className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-gradient-to-r from-[#E8C766] via-[#C9A227] to-[#B8860B] px-3.5 py-1 text-[10.5px] font-medium uppercase tracking-wider text-[#0B0C0E]"
                    style={{ boxShadow: "0 8px 20px -8px rgba(201,162,39,0.5)" }}
                  >
                    Most chosen
                  </span>
                )}

                <h3 className="relative font-serif text-[19px] tracking-[-0.005em] text-[#F3F1EA]">
                  {tier.name}
                </h3>

                <div className="relative mt-4 flex items-baseline gap-1.5">
                  <span className="font-serif text-[36px] tracking-[-0.01em] text-[#F3F1EA]">
                    {tier.price}
                  </span>
                  <span className="text-[13px] text-[#6E6A63]">{tier.cadence}</span>
                </div>

                <p className="relative mt-3 text-[13.5px] leading-relaxed tracking-[-0.003em] text-[#9C968C]">
                  {tier.description}
                </p>

                <div className="relative mt-6 flex flex-col gap-3 border-t border-[#F3F1EA]/[0.06] pt-6">
                  {tier.features.map((feature) => (
                    <div key={feature} className="flex items-start gap-2.5">
                      <span className="mt-1 text-[11px] text-[#C9A227]">—</span>
                      <span className="text-[13px] tracking-[-0.003em] text-[#F3F1EA]">
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>

                <a
                  href="/login"
                  className={
                    tier.highlighted
                      ? "group/cta relative mt-8 block w-full overflow-hidden rounded-full bg-gradient-to-r from-[#E8C766] via-[#C9A227] to-[#B8860B] py-3 text-center text-[13.5px] font-medium text-[#0B0C0E] transition-all ease-out hover:-translate-y-0.5"
                      : "group/cta relative mt-8 block w-full overflow-hidden rounded-full border border-[#F3F1EA]/[0.14] py-3 text-center text-[13.5px] font-medium text-[#F3F1EA] transition-all ease-out hover:-translate-y-0.5 hover:border-[#F3F1EA]/25 hover:bg-[#F3F1EA]/[0.04]"
                  }
                  style={{
                    transitionDuration: "450ms",
                    transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
                    boxShadow: tier.highlighted
                      ? "0 16px 36px -16px rgba(201,162,39,0.4)"
                      : undefined,
                  }}
                >
                  {tier.highlighted && (
                    <span
                      aria-hidden
                      className="pointer-events-none absolute inset-y-0 -left-1/2 w-1/3 -skew-x-12 bg-white/25 opacity-0 transition-all duration-700 ease-out group-hover/cta:left-[130%] group-hover/cta:opacity-100"
                    />
                  )}
                  <span className="relative">{tier.cta}</span>
                </a>
              </div>
            </div>
          ))}
        </div>

        <p className="mt-8 text-center text-[12px] text-[#6E6A63]">
          Payments aren&apos;t connected yet — pricing shown here is a preview of what&apos;s coming.
        </p>
      </div>
    </section>
  );
}