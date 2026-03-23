"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";

interface Props {
  userName: string;
  userEmail: string;
  isAdmin: boolean;
  onSignOut: () => void;
}

export default function PortalHeader({
  userName,
  userEmail,
  isAdmin,
  onSignOut,
}: Props) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    }
    if (dropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownOpen]);

  return (
    <header className="flex items-center justify-between border-b border-[var(--color-border-warm)] bg-[var(--color-cream)] px-8 py-4">
      <div />
      <div className="flex items-center gap-4">
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setDropdownOpen((prev) => !prev)}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-[var(--color-border-warm)] bg-[var(--color-cream-dark)] transition-colors hover:bg-[var(--color-cream)]"
          >
            <svg className="h-5 w-5 text-[var(--color-text-muted)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
            </svg>
          </button>
          {dropdownOpen && (
            <div className="absolute right-0 top-full mt-1 z-50 min-w-[200px] rounded-lg border border-[var(--color-border-warm)] bg-white p-2 shadow-lg">
              <div className="px-2 py-1">
                <div className="text-sm font-bold text-[var(--color-text-primary)]">{userName}</div>
                <div className="text-xs text-[var(--color-text-muted)]">{userEmail}</div>
              </div>
              <div className="my-1 border-t border-[var(--color-border-warm)]" />
              {isAdmin && (
                <Link
                  href="/portal/admin"
                  className="block rounded px-2 py-1 text-sm text-[var(--color-text-primary)] transition-colors hover:bg-[var(--color-cream-dark)]"
                  onClick={() => setDropdownOpen(false)}
                >
                  Admin
                </Link>
              )}
              <button
                onClick={onSignOut}
                className="w-full rounded px-2 py-1 text-left text-sm text-[var(--color-text-muted)] transition-colors hover:bg-[var(--color-cream-dark)] hover:text-[var(--color-text-primary)]"
              >
                Sign out
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
