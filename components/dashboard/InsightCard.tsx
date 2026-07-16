import type { Insight } from "@/types/insight";
import { typeStyles } from "@/lib/data/insights";

interface InsightCardProps {
  insight: Insight;
  variant: "top" | "regular";
  onMarkDone: (id: string) => void;
  onDismiss: (id: string) => void;
}

export function InsightCard({
  insight,
  variant,
  onMarkDone,
  onDismiss,
}: InsightCardProps) {
  const style = typeStyles[insight.type];

  if (variant === "top") {
    return (
      <div
        className="relative overflow-hidden rounded-3xl border p-8"
        style={{ borderColor: style.color + "33", backgroundColor: style.bg }}
      >
        <div
          className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full opacity-[0.15] blur-[80px]"
          style={{ background: style.color }}
        />
        <div className="relative">
          <div className="mb-3 flex items-center gap-2">
            <span
              className="rounded-full px-2.5 py-1 text-[11px] font-medium"
              style={{ backgroundColor: style.color + "22", color: style.color }}
            >
              {style.label}
            </span>
            <span className="text-[11px] text-[#6E7280]">Top priority</span>
          </div>
          <p className="max-w-xl text-[18px] font-medium leading-snug tracking-[-0.01em]">
            {insight.headline}
          </p>
          <p className="mt-2 max-w-xl text-[13.5px] leading-relaxed text-[#A9AEBB]">
            {insight.detail}
          </p>
          <div className="mt-5 flex flex-wrap gap-2.5">
            <button
              onClick={() => onMarkDone(insight.id)}
              className="rounded-full bg-white/[0.1] px-4 py-2 text-[12.5px] font-medium text-[#F2F1ED] transition-colors hover:bg-white/[0.16]"
            >
              Mark as done
            </button>
            <button
              onClick={() => onDismiss(insight.id)}
              className="rounded-full px-4 py-2 text-[12.5px] font-medium text-[#8A8F9C] transition-colors hover:text-[#F2F1ED]"
            >
              Dismiss
            </button>
            <button className="rounded-full px-4 py-2 text-[12.5px] font-medium text-[#8A8F9C] transition-colors hover:text-[#F2F1ED]">
              Why am I seeing this?
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-white/[0.07] bg-white/[0.02] p-6 transition-colors hover:border-white/[0.14] hover:bg-white/[0.03]">
      <div className="mb-1.5 flex items-center gap-2">
        <span
          className="rounded-full px-2 py-0.5 text-[10.5px] font-medium"
          style={{ backgroundColor: style.color + "22", color: style.color }}
        >
          {style.label}
        </span>
      </div>
      <p className="text-[14px] font-medium">{insight.headline}</p>
      <p className="mt-1 text-[12.5px] leading-relaxed text-[#8A8F9C]">
        {insight.detail}
      </p>
      <div className="mt-3.5 flex gap-2">
        <button
          onClick={() => onMarkDone(insight.id)}
          className="rounded-full bg-white/[0.06] px-3.5 py-1.5 text-[11.5px] font-medium text-[#F2F1ED] transition-colors hover:bg-white/[0.12]"
        >
          Mark as done
        </button>
        <button
          onClick={() => onDismiss(insight.id)}
          className="rounded-full px-3.5 py-1.5 text-[11.5px] font-medium text-[#6E7280] transition-colors hover:text-[#A9AEBB]"
        >
          Dismiss
        </button>
        <button className="rounded-full px-3.5 py-1.5 text-[11.5px] font-medium text-[#6E7280] transition-colors hover:text-[#A9AEBB]">
          Why am I seeing this?
        </button>
      </div>
    </div>
  );
}