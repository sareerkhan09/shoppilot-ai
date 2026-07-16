"use client";

import { useEffect, useState } from "react";

type ToastType = "error" | "success";

export interface ToastData {
  id: number;
  type: ToastType;
  message: string;
}

interface ToastProps {
  toast: ToastData;
  onDismiss: (id: number) => void;
}

function SingleToast({ toast, onDismiss }: ToastProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const showTimer = requestAnimationFrame(() => setVisible(true));
    const hideTimer = setTimeout(() => setVisible(false), 3200);
    const removeTimer = setTimeout(() => onDismiss(toast.id), 3600);

    return () => {
      cancelAnimationFrame(showTimer);
      clearTimeout(hideTimer);
      clearTimeout(removeTimer);
    };
  }, [toast.id, onDismiss]);

  const isError = toast.type === "error";

  return (
    <div
      className={`pointer-events-auto flex items-start gap-3 rounded-xl border px-4 py-3.5 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.6)] backdrop-blur-md transition-all duration-300 ${
        visible ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"
      } ${
        isError
          ? "border-[#E5484D]/25 bg-[#1A1113]/95"
          : "border-[#4ADE80]/25 bg-[#0F1611]/95"
      }`}
    >
      <span
        className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full ${
          isError ? "bg-[#E5484D]/15" : "bg-[#4ADE80]/15"
        }`}
      >
        {isError ? (
          <svg width="11" height="11" viewBox="0 0 12 12" fill="none">
            <path
              d="M6 3.5v3M6 8.25h.006"
              stroke="#E5484D"
              strokeWidth="1.4"
              strokeLinecap="round"
            />
            <circle cx="6" cy="6" r="5" stroke="#E5484D" strokeWidth="1.1" />
          </svg>
        ) : (
          <svg width="11" height="11" viewBox="0 0 12 12" fill="none">
            <path
              d="M3.5 6.2l1.7 1.7 3.3-3.9"
              stroke="#4ADE80"
              strokeWidth="1.4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        )}
      </span>

      <p className="text-[13px] leading-snug text-[#F2F1ED]">{toast.message}</p>

      <button
        onClick={() => onDismiss(toast.id)}
        aria-label="Dismiss notification"
        className="ml-1 mt-0.5 shrink-0 text-[#6E7280] transition-colors hover:text-[#A9AEBB]"
      >
        <svg width="11" height="11" viewBox="0 0 12 12" fill="none">
          <path
            d="M2.5 2.5l7 7M9.5 2.5l-7 7"
            stroke="currentColor"
            strokeWidth="1.3"
            strokeLinecap="round"
          />
        </svg>
      </button>
    </div>
  );
}

interface ToastContainerProps {
  toasts: ToastData[];
  onDismiss: (id: number) => void;
}

export function ToastContainer({ toasts, onDismiss }: ToastContainerProps) {
  return (
    <div className="pointer-events-none fixed inset-x-0 top-5 z-[100] flex flex-col items-center gap-2 px-4">
      {toasts.map((toast) => (
        <div key={toast.id} className="w-full max-w-[380px]">
          <SingleToast toast={toast} onDismiss={onDismiss} />
        </div>
      ))}
    </div>
  );
}