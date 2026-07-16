const steps = [
  {
    number: "01",
    title: "Connect your store",
    description:
      "Grant read-only access through Shopify's official permissions — no code, no developer needed.",
  },
  {
    number: "02",
    title: "ShopPilot reviews overnight",
    description:
      "Orders, inventory, products, and customers are compared against your store's own history.",
  },
  {
    number: "03",
    title: "Your ledger arrives at 7 AM",
    description:
      "A ranked account of what needs attention, waiting before you've opened your laptop.",
  },
];

export function HowItWorks() {
  return (
    <section
      id="how-it-works"
      className="relative overflow-hidden border-t border-[#F3F1EA]/[0.06] px-6 py-28"
    >
      {/* Premium gradient hairline, replacing the flat border tone */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#C9A227]/25 to-transparent"
      />

      {/* Ambient background depth — soft, low-opacity */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-[12%] top-10 h-[360px] w-[520px] rounded-full opacity-[0.045] blur-[120px]"
        style={{ background: "radial-gradient(circle, #C9A227 0%, transparent 70%)" }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-0 right-[10%] h-[300px] w-[420px] rounded-full opacity-[0.035] blur-[110px]"
        style={{ background: "radial-gradient(circle, #E8C766 0%, transparent 70%)" }}
      />

      <div className="relative mx-auto max-w-5xl">
        <div className="mx-auto max-w-xl text-center">
          <p className="text-[11.5px] uppercase tracking-[0.16em] text-[#C9A227]">
            How it works
          </p>
          <h2 className="mt-4 font-serif text-[32px] leading-[1.15] tracking-[-0.015em] text-[#F3F1EA] sm:text-[40px]">
            Three steps, then it runs itself.
          </h2>
        </div>

        <div className="mt-16 grid gap-10 sm:grid-cols-3">
          {steps.map((step, i) => (
            <div key={step.number} className="group relative">
              <span
                className="bg-gradient-to-b from-[#E8C766] to-[#8A6A1C] bg-clip-text font-serif text-[40px] italic text-transparent opacity-90 transition-opacity duration-500 ease-out group-hover:opacity-100"
                style={{
                  filter: "drop-shadow(0 2px 10px rgba(201,162,39,0.12))",
                }}
              >
                {step.number}
              </span>
              <h3 className="mt-3 font-serif text-[18px] leading-snug tracking-[-0.005em] text-[#F3F1EA] transition-transform duration-500 ease-out group-hover:translate-x-0.5">
                {step.title}
              </h3>
              <p className="mt-2.5 text-[13.5px] leading-relaxed tracking-[-0.003em] text-[#9C968C]">
                {step.description}
              </p>
              {i < steps.length - 1 && (
                <div className="pointer-events-none absolute right-[-1.25rem] top-[22px] hidden h-px w-10 bg-gradient-to-r from-[#C9A227]/35 to-transparent sm:block" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}