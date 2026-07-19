import { integrations } from "@/lib/landing/data";

export function Integrations() {
  return (
    <section className="border-y border-[#F3F1EA]/[0.06] px-6 py-14">
      <div className="mx-auto max-w-5xl">
        <p className="text-center text-[11.5px] uppercase tracking-[0.14em] text-[#6E6A63]">
          Connects with the tools you already use
        </p>

        <div className="mt-9 flex flex-wrap items-center justify-center gap-x-10 gap-y-7">
          {integrations.map((integration) => (
            <div
              key={integration.name}
              className="flex items-center gap-2.5 opacity-90 transition-opacity hover:opacity-100"
            >
              <span className="font-serif text-[15px] tracking-tight text-[#F3F1EA]">
                {integration.name}
              </span>
              <span
                className={`rounded-full px-2 py-0.5 text-[9.5px] uppercase tracking-wider ${
                  integration.status === "connected"
                    ? "bg-[#C9A227]/15 text-[#C9A227]"
                    : "bg-[#F3F1EA]/[0.06] text-[#6E6A63]"
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