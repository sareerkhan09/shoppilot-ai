"use client";

import { useState } from "react";
import { faqItems } from "@/lib/landing/data";

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="relative overflow-hidden border-t border-[#F3F1EA]/[0.06] px-6 py-28">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#C9A227]/25 to-transparent"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-0 h-[340px] w-[560px] -translate-x-1/2 rounded-full opacity-[0.04] blur-[120px]"
        style={{ background: "radial-gradient(circle, #C9A227 0%, transparent 70%)" }}
      />

      <div className="relative mx-auto max-w-3xl">
        <div className="text-center">
          <p className="text-[11.5px] uppercase tracking-[0.16em] text-[#C9A227]">
            Questions
          </p>
          <h2 className="mt-4 font-serif text-[32px] leading-[1.15] tracking-[-0.015em] text-[#F3F1EA] sm:text-[38px]">
            Before you connect your store
          </h2>
        </div>

        <div className="mt-12 flex flex-col divide-y divide-[#F3F1EA]/[0.07]">
          {faqItems.map((item, index) => {
            const isOpen = openIndex === index;
            const panelId = `faq-panel-${index}`;
            return (
              <div key={item.question} className="group py-5">
                <button
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                  className="flex w-full items-center justify-between gap-4 text-left"
                >
                  <span
                    className="font-serif text-[15.5px] tracking-[-0.005em] text-[#F3F1EA] transition-colors duration-300 ease-out group-hover:text-[#F3F1EA]"
                    style={{ color: isOpen ? "#F3F1EA" : undefined }}
                  >
                    {item.question}
                  </span>
                  <span
                    className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-[#C9A227]/25 text-[15px] text-[#C9A227] transition-transform ease-out"
                    style={{
                      transitionDuration: "500ms",
                      transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
                      transform: isOpen ? "rotate(45deg)" : "rotate(0deg)",
                    }}
                  >
                    +
                  </span>
                </button>

                <div
                  id={panelId}
                  aria-hidden={!isOpen}
                  className="grid transition-[grid-template-rows] ease-out"
                  style={{
                    gridTemplateRows: isOpen ? "1fr" : "0fr",
                    transitionDuration: "500ms",
                    transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
                  }}
                >
                  <div className="overflow-hidden">
                    <p className="mt-3 max-w-2xl text-[13.5px] leading-relaxed tracking-[-0.003em] text-[#9C968C]">
                      {item.answer}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}