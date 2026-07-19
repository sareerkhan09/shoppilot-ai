"use client";

import { useState } from "react";
import Link from "next/link";
import {
  LayoutDashboard,
  DollarSign,
  Package,
  ShoppingCart,
  Users,
  Bot,
  Settings,
  Menu,
  X,
} from "lucide-react";

const menu = [
  {
    name: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    name: "Revenue",
    href: "/revenue",
    icon: DollarSign,
  },
  {
    name: "Orders",
    href: "/orders",
    icon: ShoppingCart,
  },
  {
    name: "Products",
    href: "/products",
    icon: Package,
  },
  {
    name: "Customers",
    href: "/customers",
    icon: Users,
  },
  {
    name: "AI Insights",
    href: "/insights",
    icon: Bot,
  },
  {
    name: "Settings",
    href: "/settings",
    icon: Settings,
  },
];

export function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);

  const closeSidebar = () => setIsOpen(false);

  return (
    <>
      {/* Mobile hamburger trigger — fixed, out of page flow so it never affects layout width */}
      {!isOpen && (
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          aria-label="Open menu"
          className="fixed left-4 top-4 z-40 flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 bg-[#171A22] text-gray-300 shadow-lg transition hover:text-white lg:hidden"
        >
          <Menu size={20} />
        </button>
      )}

      {/* Mobile overlay backdrop */}
      {isOpen && (
        <div
          onClick={closeSidebar}
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm transition-opacity duration-300 lg:hidden"
        />
      )}

      {/* Sidebar: sticky on desktop, slide-in drawer on mobile */}
      <aside
        className={`
          flex w-64 shrink-0 flex-col border-r border-white/10 bg-[#0D0F14]
          fixed inset-y-0 left-0 z-50 transition-transform duration-300 ease-in-out
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
          lg:sticky lg:top-0 lg:h-screen lg:translate-x-0 lg:flex
        `}
      >
        <div className="flex items-center justify-between border-b border-white/10 px-6 py-7">
          <div>
            <h1 className="text-2xl font-bold text-white">
              Shop<span className="text-[#E8B65A]">Pilot</span>
            </h1>
            <p className="mt-1 text-xs text-gray-400">AI Commerce Assistant</p>
          </div>

          <button
            type="button"
            onClick={closeSidebar}
            aria-label="Close menu"
            className="flex h-8 w-8 items-center justify-center rounded-lg text-gray-400 transition hover:text-white lg:hidden"
          >
            <X size={18} />
          </button>
        </div>

        <nav className="flex-1 space-y-2 overflow-y-auto px-4 py-6">
          {menu.map((item) => {
            const Icon = item.icon;

            return (
              <Link
                key={item.name}
                href={item.href}
                onClick={closeSidebar}
                className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm text-gray-300 transition hover:bg-[#171A22] hover:text-white"
              >
                <Icon size={18} />
                {item.name}
              </Link>
            );
          })}
        </nav>
      </aside>
    </>
  );
}