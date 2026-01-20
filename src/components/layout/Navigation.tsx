"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/shop", label: "Shop" },
  { href: "/pricing", label: "Pricing" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

interface NavigationProps {
  className?: string;
  onLinkClick?: () => void;
}

export function Navigation({ className = "", onLinkClick }: NavigationProps) {
  const pathname = usePathname();

  return (
    <nav className={className}>
      <ul className="flex flex-col md:flex-row gap-1 md:gap-6">
        {navLinks.map((link) => {
          const isActive = pathname === link.href;
          return (
            <li key={link.href}>
              <Link
                href={link.href}
                onClick={onLinkClick}
                className={`block px-3 py-2 rounded-lg transition-colors ${
                  isActive
                    ? "text-dark-accent dark:text-dark-accent"
                    : "text-dark-text dark:text-dark-text hover:text-dark-accent dark:hover:text-dark-accent"
                } .light & {
                  ${
                    isActive
                      ? "text-light-accent"
                      : "text-light-text hover:text-light-accent"
                  }
                }`}
              >
                {link.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
