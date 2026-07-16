export function FinalCTA() {
  return (
    <section className="border-t border-[#F3F1EA]/[0.06] px-6 py-28">
      <div className="relative mx-auto max-w-4xl overflow-hidden rounded-[28px] border border-[#C9A227]/25 bg-gradient-to-b from-[#15130A] to-[#0F1013] px-8 py-20 text-center sm:px-16">
        <div className="pointer-events-none absolute left-1/2 top-1/2 h-[420px] w-[620px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-[0.12] blur-[110px]" style={{ background: "radial-gradient(circle, #C9A227 0%, transparent 70%)" }}></div>
        <div className="relative">
          <p className="text-[11.5px] uppercase tracking-[0.14em] text-[#C9A227]">Open your first ledger</p>
          <h2 className="mt-4 font-serif text-[32px] leading-[1.15] tracking-[-0.01em] text-[#F3F1EA] sm:text-[42px]">
            Your store already has a story to tell.
            <br />
            Let it be told every morning.
          </h2>
          <a href="/login" className="mt-9 inline-block rounded-full bg-gradient-to-r from-[#E8C766] to-[#B8860B] px-8 py-3.5 text-[14px] font-medium text-[#0B0C0E] transition-transform hover:scale-[1.02]">
            Add ShopPilot to your store
          </a>
        </div>
      </div>
    </section>
  );
}