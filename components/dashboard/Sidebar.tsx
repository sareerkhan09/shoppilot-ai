"use client";

import Link from "next/link";
import { LayoutDashboard, DollarSign, Package, ShoppingCart, Users, Bot, Settings } from "lucide-react";

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
  return (
    <aside className="hidden lg:flex w-64 flex-col border-r border-white/10 bg-[#0D0F14]">
      <div className="px-6 py-7 border-b border-white/10">
        <h1 className="text-2xl font-bold text-white">
          Shop<span className="text-[#E8B65A]">Pilot</span>
        </h1>

        <p className="mt-1 text-xs text-gray-400">
          AI Commerce Assistant
        </p>
      </div>

      <nav className="flex-1 px-4 py-6 space-y-2">
        {menu.map((item) => {
          const Icon = item.icon;

          return (
            <Link
              key={item.name}
              href={item.href}
              className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm text-gray-300 transition hover:bg-[#171A22] hover:text-white"
            >
              <Icon size={18} />
              {item.name}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}