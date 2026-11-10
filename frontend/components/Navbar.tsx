"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const NAV_LINKS = [
  { label: "O mnie", href: "/" },
  { label: "Przepisy", href: "/przepisy" },
  { label: "Kontakt", href: "/kontakt" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <nav className="fixed inset-x-0 top-0 z-50 border-b-[1.5px] border-blush bg-beige">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <Link href="/" className="flex items-center gap-2" onClick={() => setMenuOpen(false)}>
          <span className="text-2xl">🥑</span>
          <span className="font-script text-[1.6rem] leading-none text-avocado">
            Dietetownia
          </span>
        </Link>

        {/* Desktop */}
        <div className="hidden items-center gap-1 md:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                isActive(link.href)
                  ? "bg-avocado-pale text-avocado-dark"
                  : "text-bark hover:bg-beige-warm"
              }`}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/kontakt"
            className="ml-3 rounded-full bg-blush-deep px-5 py-2 text-sm font-medium text-white transition-opacity hover:opacity-90"
          >
            Umów wizytę ♡
          </Link>
        </div>

        {/* Hamburger (mobile) */}
        <button
          className="p-3 md:hidden"
          onClick={() => setMenuOpen((open) => !open)}
          aria-label={menuOpen ? "Zamknij menu" : "Otwórz menu"}
          aria-expanded={menuOpen}
        >
          <span className="mb-[5px] block h-0.5 w-5 bg-bark" />
          <span className="mb-[5px] block h-0.5 w-5 bg-bark" />
          <span className="block h-0.5 w-5 bg-bark" />
        </button>
      </div>

      {/* Menu mobilne */}
        {menuOpen && (
        <div className="flex flex-col gap-1 border-t border-blush bg-beige px-6 py-4 md:hidden">
            {NAV_LINKS.map((link) => (
            <Link
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className={`rounded-full px-4 py-2 text-[0.9rem] ${
                isActive(link.href) ? "bg-avocado-pale text-avocado-dark" : "text-bark"
                }`}
            >
                {link.label}
            </Link>
            ))}

            <Link
            href="/kontakt"
            onClick={() => setMenuOpen(false)}
            className="mt-2 rounded-full bg-blush-deep px-4 py-2.5 text-center text-sm font-medium text-white"
            >
            Umów wizytę ♡
            </Link>
        </div>
        )}
    </nav>
  );
}