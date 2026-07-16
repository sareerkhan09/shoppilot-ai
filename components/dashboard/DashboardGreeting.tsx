interface DashboardGreetingProps {
  firstName: string;
  activeInsightCount: number;
}

export function DashboardGreeting({
  firstName,
  activeInsightCount,
}: DashboardGreetingProps) {
  return (
    <section className="relative overflow-hidden px-6 pb-10 pt-14">
      <div
        className="pointer-events-none absolute left-1/2 top-0 h-[420px] w-[720px] -translate-x-1/2 rounded-full opacity-[0.12] blur-[110px]"
        style={{
          background: "radial-gradient(circle, #E8B65A 0%, transparent 70%)",
        }}
      />
      <div className="relative mx-auto max-w-5xl">
        <div className="mb-2 flex items-center gap-2 text-[12.5px] text-[#A9AEBB]">
          <span className="h-1.5 w-1.5 rounded-full bg-[#4ADE80]" />
          Synced 4 minutes ago
        </div>
        <h1 className="text-[30px] font-semibold tracking-[-0.01em] sm:text-[36px]">
          Good morning, <span className="capitalize">{firstName}</span>.
        </h1>
        <p className="mt-2 max-w-lg text-[14.5px] leading-relaxed text-[#A9AEBB]">
          Here&apos;s what happened at your store overnight — {activeInsightCount}{" "}
          thing{activeInsightCount === 1 ? "" : "s"} worth your attention today.
        </p>
      </div>
    </section>
  );
}