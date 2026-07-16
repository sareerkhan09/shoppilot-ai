const reasons = [
  {
    title: "Grounded in your own numbers",
    description:
      "Every alert is measured against your store's own baseline — never a generic industry average pretending to fit you.",
  },
  {
    title: "Built to be trusted, not just used",
    description:
      "Detection logic is deterministic and explainable. The AI writes the account; it doesn't invent the facts underneath it.",
  },
  {
    title: "Designed like staff, not software",
    description:
      "No dashboards to remember to check. A single daily account, the way a trusted employee would deliver one.",
  },
];

export function WhyShopPilot() {
  return (
    <section className="border-t border-[#F3F1EA]/[0.06] px-6 py-28">
      <div className="mx-auto max-w-5xl">
        <div className="grid gap-14 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <p className="text-[11.5px] uppercase tracking-[0.14em] text-[#C9A227]">
              Why ShopPilot AI
            </p>
            <h2 className="mt-4 font-serif text-[32px] leading-[1.15] tracking-[-0.01em] text-[#F3F1EA] sm:text-[38px]">
              Most AI tools answer questions.
              <br />
              This one keeps the books.
            </h2>
            <p className="mt-5 text-[14.5px] leading-relaxed text-[#9C968C]">
              ShopPilot AI was built on a simple premise: the hardest part of
              running a store isn't finding answers — it's knowing what to ask
              in the first place.
            </p>
          </div>

          <div className="flex flex-col divide-y divide-[#F3F1EA]/[0.06]">
            {reasons.map((reason) => (
              <div key={reason.title} className="py-6 first:pt-0 last:pb-0">
                <h3 className="font-serif text-[17px] text-[#F3F1EA]">{reason.title}</h3>
                <p className="mt-2 text-[13.5px] leading-relaxed text-[#9C968C]">
                  {reason.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}