"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Settings,
  Shield,
  PanelLeftOpen,
  PanelLeftClose,
} from "lucide-react";

export default function PortalSidebar({
  isAdmin,
  collapsed,
  onToggle,
}: {
  isAdmin: boolean;
  collapsed: boolean;
  onToggle: () => void;
}) {
  const pathname = usePathname();

  const navItems = [
    { href: "/portal", label: "Dashboard", icon: LayoutDashboard },
    { href: "/portal/settings", label: "Settings", icon: Settings },
  ];

  return (
    <aside
      className={`flex flex-col bg-[var(--color-brown)] text-white transition-all duration-200 ${
        collapsed ? "w-16" : "w-64"
      }`}
    >
      <div className={`py-6 ${collapsed ? "px-0 flex justify-center" : "px-6"}`}>
        <Link
          href="/portal"
          className={`flex items-center text-lg font-medium tracking-tight ${
            collapsed ? "justify-center" : "gap-2"
          }`}
        >
          <span className="text-[var(--color-accent)] text-xl font-bold">c</span>
          {!collapsed && "claudje"}
        </Link>
      </div>

      <nav className={`flex-1 ${collapsed ? "px-1" : "px-3"}`}>
        <button
          onClick={onToggle}
          className={`group relative mb-2 flex w-full items-center rounded text-sm text-white/40 transition-colors hover:bg-white/5 hover:text-white ${
            collapsed ? "justify-center px-0 py-2.5" : "gap-3 px-3 py-2"
          }`}
          aria-label={collapsed ? "Open sidebar" : "Close sidebar"}
        >
          {collapsed ? (
            <PanelLeftOpen className="h-4 w-4 flex-shrink-0" />
          ) : (
            <PanelLeftClose className="h-4 w-4 flex-shrink-0" />
          )}
          {!collapsed && <span>Close sidebar</span>}
          {collapsed && (
            <span className="pointer-events-none absolute left-full ml-2 top-1/2 -translate-y-1/2 z-20 rounded bg-[var(--color-brown)] px-2 py-1 text-xs text-white opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
              Open sidebar
            </span>
          )}
        </button>
        {navItems.map((item) => {
          const active = pathname === item.href;
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`group relative mb-1 flex items-center rounded text-sm transition-colors ${
                collapsed ? "justify-center px-0 py-2.5" : "gap-3 px-3 py-2"
              } ${
                active
                  ? "bg-[var(--color-accent)]/10 font-medium text-[var(--color-accent)]"
                  : "text-white/70 hover:bg-white/5 hover:text-white"
              }`}
            >
              <Icon className="h-4 w-4 flex-shrink-0" />
              {!collapsed && item.label}
              {collapsed && (
                <span className="pointer-events-none absolute left-full ml-2 top-1/2 -translate-y-1/2 z-20 rounded bg-[var(--color-brown)] px-2 py-1 text-xs text-white opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                  {item.label}
                </span>
              )}
            </Link>
          );
        })}
        {isAdmin && (
          <>
            <div className="my-3 border-t border-white/10" />
            <Link
              href="/portal/admin"
              className={`group relative mb-1 flex items-center rounded text-sm transition-colors ${
                collapsed ? "justify-center px-0 py-2.5" : "gap-3 px-3 py-2"
              } ${
                pathname === "/portal/admin"
                  ? "bg-[var(--color-accent)]/10 font-medium text-[var(--color-accent)]"
                  : "text-white/70 hover:bg-white/5 hover:text-white"
              }`}
            >
              <Shield className="h-4 w-4 flex-shrink-0" />
              {!collapsed && "Admin"}
              {collapsed && (
                <span className="pointer-events-none absolute left-full ml-2 top-1/2 -translate-y-1/2 z-20 rounded bg-[var(--color-brown)] px-2 py-1 text-xs text-white opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                  Admin
                </span>
              )}
            </Link>
          </>
        )}
      </nav>

      <div className="border-t border-white/10 py-2" />
    </aside>
  );
}
