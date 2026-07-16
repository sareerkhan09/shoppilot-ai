export function DashboardShowcase() {
  return (
    <section className="relative overflow-hidden border-t border-[#F3F1EA]/[0.06] px-6 py-28">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#C9A227]/25 to-transparent"
      />

      <div className="relative mx-auto max-w-5xl">
        <div className="mx-auto max-w-xl text-center">
          <p className="text-[11.5px] uppercase tracking-[0.16em] text-[#C9A227]">
            Inside the ledger
          </p>
          <h2 className="mt-4 font-serif text-[32px] leading-[1.15] tracking-[-0.015em] text-[#F3F1EA] sm:text-[40px]">
            Ranked. Explained. Ready to act on.
          </h2>
        </div>

        <div className="relative mt-16">
          {/* Layered ambient glow — soft core + wider, dimmer halo for natural depth */}
          <div
            aria-hidden
            className="pointer-events-none absolute left-1/2 top-1/2 h-[300px] w-[520px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-[0.09] blur-[100px]"
            style={{ background: "radial-gradient(circle, #E8C766 0%, transparent 70%)" }}
          />
          <div
            aria-hidden
            className="pointer-events-none absolute left-1/2 top-1/2 h-[440px] w-[780px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-[0.05] blur-[140px]"
            style={{ background: "radial-gradient(circle, #C9A227 0%, transparent 70%)" }}
          />

          {/* Outer frame — premium metallic border + Apple-grade layered shadow */}
          <div
            className="relative rounded-[24px] border border-[#C9A227]/[0.16] bg-gradient-to-b from-[#15161A] to-[#0D0E10] p-3"
            style={{
              boxShadow:
                "0 70px 140px -50px rgba(0,0,0,0.92), 0 24px 60px -30px rgba(0,0,0,0.6), 0 1px 0 0 rgba(255,255,255,0.04) inset, 0 0 0 1px rgba(201,162,39,0.04) inset",
            }}
          >
            {/* Soft top highlight — the glass edge catching light */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-x-8 top-0 h-px rounded-full bg-gradient-to-r from-transparent via-white/[0.14] to-transparent"
            />

            <div className="relative rounded-[18px] border border-[#F3F1EA]/[0.05] bg-gradient-to-b from-[#121317] to-[#0D0E10] px-6 py-8 sm:px-10 sm:py-10">
              <div className="mb-8 flex flex-wrap items-center justify-between gap-3 border-b border-[#F3F1EA]/[0.06] pb-6">
                <div>
                  <p className="font-serif text-[16px] leading-snug tracking-[-0.005em] text-[#F3F1EA]">
                    Good morning, Aria &amp; Co.
                  </p>
                  <p className="mt-1 text-[12.5px] tracking-[-0.003em] text-[#6E6A63]">
                    Four things worth your attention today
                  </p>
                </div>
                <span className="rounded-full border border-[#C9A227]/25 bg-[#C9A227]/[0.04] px-3 py-1 text-[11px] tracking-[0.01em] text-[#C9A227]">
                  Synced 4 min ago
                </span>
              </div>

              <div
                className="group relative mb-4 overflow-hidden rounded-2xl border border-[#C9A227]/20 bg-gradient-to-b from-[#C9A227]/[0.07] to-[#C9A227]/[0.03] p-6 transition-all ease-out hover:-translate-y-0.5 hover:border-[#C9A227]/30"
                style={{
                  transitionDuration: "550ms",
                  transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
                  boxShadow: "0 20px 44px -28px rgba(201,162,39,0.18) inset",
                }}
              >
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-[#E8C766]/25 to-transparent"
                />
                <p className="relative text-[11px] font-medium uppercase tracking-[0.12em] text-[#C9A227]">
                  Top priority
                </p>
                <p className="relative mt-2 font-serif text-[17px] leading-snug tracking-[-0.005em] text-[#F3F1EA]">
                  Sales dropped 18% against your seven-day average
                </p>
                <p className="relative mt-1.5 text-[13px] leading-relaxed tracking-[-0.003em] text-[#9C968C]">
                  Your lowest Tuesday in six weeks — worth checking your top ad set.
                </p>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                <div
                  className="group relative overflow-hidden rounded-xl border border-[#F3F1EA]/[0.06] bg-gradient-to-b from-[#F3F1EA]/[0.025] to-transparent p-5 transition-all ease-out hover:-translate-y-0.5 hover:border-[#F3F1EA]/[0.12]"
                  style={{
                    transitionDuration: "500ms",
                    transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
                  }}
                >
                  <p className="text-[11px] uppercase tracking-wider text-[#9C968C]">Inventory</p>
                  <p className="mt-1.5 text-[13.5px] tracking-[-0.003em] text-[#F3F1EA]">
                    &ldquo;Aria Tote&rdquo; sells out in ~3 days
                  </p>
                </div>
                <div
                  className="group relative overflow-hidden rounded-xl border border-[#F3F1EA]/[0.06] bg-gradient-to-b from-[#F3F1EA]/[0.025] to-transparent p-5 transition-all ease-out hover:-translate-y-0.5 hover:border-[#F3F1EA]/[0.12]"
                  style={{
                    transitionDuration: "500ms",
                    transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
                  }}
                >
                  <p className="text-[11px] uppercase tracking-wider text-[#9C968C]">Trending</p>
                  <p className="mt-1.5 text-[13.5px] tracking-[-0.003em] text-[#F3F1EA]">
                    &ldquo;Linen Wrap&rdquo; up 63% week-over-week
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}