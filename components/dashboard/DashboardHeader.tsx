"use client";

import { useState } from "react";

interface DashboardHeaderProps {
  email: string | undefined;
  onSignOut: () => void;
}

export function DashboardHeader({ email, onSignOut }: DashboardHeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-white/[0.06] bg-[#0A0B0F]/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
        <div className="flex items-center gap-2">
          <span className="flex h-7 w-7 items-center justify-center rounded-[7px] bg-gradient-to-br from-[#E8B65A] to-[#B9812E] text-[13px] font-bold text-[#0A0B0F]">
            S
          </span>
          <span className="text-[15px] font-semibold tracking-tight">
            ShopPilot <span className="text-[#8A8F9C]">AI</span>
          </span>
        </div>

        <div className="hidden items-center gap-7 md:flex">
          <a href="#" className="text-[13.5px] font-medium text-[#F2F1ED]">
            Dashboard
          </a>
          <a href="#history" className="text-[13.5px] text-[#A9AEBB] transition-colors hover:text-[#F2F1ED]">
            History
          </a>
          <a href="#settings" className="text-[13.5px] text-[#A9AEBB] transition-colors hover:text-[#F2F1ED]">
            Settings
          </a>
          <a href="#billing" className="text-[13.5px] text-[#A9AEBB] transition-colors hover:text-[#F2F1ED]">
            Billing
          </a>
        </div>

        <div className="hidden items-center gap-3 md:flex">
          <span className="text-[12.5px] text-[#6E7280]">{email}</span>
          <button
            onClick={onSignOut}
            className="rounded-full border border-white/[0.12] px-4 py-2 text-[12.5px] font-medium text-[#A9AEBB] transition-colors hover:bg-white/[0.05] hover:text-[#F2F1ED]"
          >
            Sign out
          </button>
        </div>

        <button
          onClick={() => setMobileMenuOpen((v) => !v)}
          className="flex h-8 w-8 items-center justify-center rounded-md text-[#F2F1ED] md:hidden"
          aria-label="Toggle menu"
        >
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            <path
              d="M2 5H16M2 9H16M2 13H16"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
        </button>
      </div>

      {mobileMenuOpen && (
        <div className="border-t border-white/[0.06] px-6 py-4 md:hidden">
          <div className="flex flex-col gap-4">
            <span className="text-[12.5px] text-[#6E7280]">{email}</span>
            <button
              onClick={onSignOut}
              className="w-fit rounded-full border border-white/[0.12] px-4 py-2 text-[12.5px] font-medium text-[#F2F1ED]"
            >
              Sign out
            </button>
          </div>
        </div>
      )}
    </header>
  );
}