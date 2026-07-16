export function DashboardFooter() {
  return (
    <footer className="border-t border-white/[0.06] px-6 py-6">
      <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-3 text-[12px] text-[#565A66] sm:flex-row">
        <span>Last synced 4 minutes ago · Next briefing tomorrow, 7:00 AM</span>
        <a href="#" className="transition-colors hover:text-[#A9AEBB]">
          Need help? Contact support
        </a>
      </div>
    </footer>
  );
}