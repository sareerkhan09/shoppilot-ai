import { integrations } from "@/lib/landing/data";

export function Integrations() {
  return (
    <section id="integrations" className="border-t border-[#F3F1EA]/[0.06] px-6 py-28">
      <div className="mx-auto max-w-5xl">
        <div className="mx-auto max-w-xl text-center">
          <p className="text-[11.5px] uppercase tracking-[0.14em] text-[#C9A227]">
            Connected accounts
          </p>
          <h2 className="mt-4 font-serif text-[32px] tracking-[-0.01em] text-[#F3F1EA] sm:text-[40px]">
            Built to watch across your whole stack.
          </h2>
          <p className="mt-4 text-[15px] leading-relaxed text-[#9C968C]">
            Shopify is live today. Each additional account below is on the
            roadmap, arriving as the ledger's coverage expands.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-2 gap-4 sm:grid-cols-4">
          {integrations.map((integration) => (
            <div
              key={integration.name}
              className="flex flex-col items-center gap-3 rounded-2xl border border-[#F3F1EA]/[0.07] bg-[#101114] px-4 py-7 text-center"
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-full border border-[#F3F1EA]/[0.1] font-serif text-[15px] text-[#F3F1EA]">
                {integration.name.charAt(0)}
              </span>
              <p className="text-[13px] text-[#F3F1EA]">{integration.name}</p>
              <span
                className={`text-[10.5px] uppercase tracking-wider ${
                  integration.status === "connected" ? "text-[#C9A227]" : "text-[#6E6A63]"
                }`}
              >
                {integration.status === "connected" ? "Connected" : "Coming soon"}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}