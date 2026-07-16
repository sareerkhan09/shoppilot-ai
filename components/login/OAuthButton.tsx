import type { ReactNode } from "react";

interface OAuthButtonProps {
  icon: ReactNode;
  label: string;
  onClick: () => void;
}

export function OAuthButton({ icon, label, onClick }: OAuthButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex w-full items-center justify-center gap-2.5 rounded-full border border-white/[0.12] bg-white/[0.02] py-2.5 text-[13.5px] font-medium text-[#F2F1ED] transition-colors hover:bg-white/[0.06]"
    >
      {icon}
      {label}
    </button>
  );
}