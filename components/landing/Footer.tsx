const footerLinks = {
  Product: ["Features", "Pricing", "Integrations", "How it works"],
  Company: ["About", "Careers", "Contact"],
  Legal: ["Privacy", "Terms", "Data processing"],
};

export function Footer() {
  return (
    <footer className="border-t border-[#F3F1EA]/[0.06] px-6 py-16">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <div className="flex items-center gap-2.5">
              <span className="flex h-7 w-7 items-center justify-center rounded-[6px] bg-gradient-to-br from-[#E8C766] to-[#8A701E] text-[13px] font-serif font-bold text-[#0B0C0E]">S</span>
              <span className="font-serif text-[16px] text-[#F3F1EA]">
                ShopPilot <span className="italic text-[#9C968C]">AI</span>
              </span>
            </div>
            <p className="mt-4 max-w-xs text-[13px] leading-relaxed text-[#6E6A63]">
              A daily account of your Shopify store, written the way a trusted employee would write it.
            </p>
          </div>

          {Object.entries(footerLinks).map(([heading, links]) => (
            <div key={heading}>
              <p className="text-[11.5px] uppercase tracking-wider text-[#6E6A63]">{heading}</p>
              <div className="mt-4 flex flex-col gap-3">
                {links.map((link) => (
                  <a key={link} href="#" className="text-[13.5px] text-[#9C968C] transition-colors hover:text-[#F3F1EA]">
                    {link}
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-[#F3F1EA]/[0.06] pt-8 sm:flex-row">
          <p className="text-[12px] text-[#6E6A63]">© {new Date().getFullYear()} ShopPilot AI. Not affiliated with Shopify Inc.</p>
          <p className="text-[12px] text-[#6E6A63]">Built for merchants, not marketers.</p>
        </div>
      </div>
    </footer>
  );
}