import type { HistoryItem } from "@/types/insight";
import { typeStyles } from "@/lib/data/insights";

interface InsightHistorySectionProps {
  items: HistoryItem[];
}

export function InsightHistorySection({ items }: InsightHistorySectionProps) {
  return (
    <section id="history" className="border-t border-white/[0.06] px-6 py-12">
      <div className="mx-auto max-w-5xl">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-[13px] font-medium uppercase tracking-wider text-[#6E7280]">
            What I&apos;ve caught this month
          </h2>
          <a href="#" className="text-[12.5px] text-[#8A8F9C] transition-colors hover:text-[#E8B65A]">
            View all
          </a>
        </div>

        <div className="flex flex-col gap-2.5">
          {items.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between rounded-xl border border-white/[0.06] bg-white/[0.015] px-5 py-4"
            >
              <div className="flex items-center gap-3">
                <span
                  className="rounded-full px-2 py-0.5 text-[10px] font-medium"
                  style={{
                    backgroundColor: typeStyles[item.type].color + "22",
                    color: typeStyles[item.type].color,
                  }}
                >
                  {typeStyles[item.type].label}
                </span>
                <p className="text-[13px] text-[#D7D9E0]">{item.headline}</p>
              </div>
              <span className="shrink-0 text-[11.5px] text-[#565A66]">
                {item.date}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}