'use client';

import { useState } from 'react';
import Link from 'next/link';
import Button from '@/components/ui/Button';

const navLinks = [
  { href: '/dashboard', label: 'Dashboard' },
  { href: '/projects', label: 'Projects' },
  { href: '/vote', label: 'Vote' },
  { href: '/transparency', label: 'Transparency' },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="bg-white border-b border-gray-100 px-4 py-3">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link href="/" className="text-xl font-bold text-primary">
          Renovo
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-text-secondary hover:text-primary transition-colors text-sm font-medium"
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-3">
          <Link href="/login">
            <Button variant="ghost" size="sm">
              Login
            </Button>
          </Link>
          <Link href="/signup">
            <Button variant="primary" size="sm">
              Sign Up
            </Button>
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden p-2 text-text-secondary hover:text-primary"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            {mobileOpen ? (
              <>
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </>
            ) : (
              <>
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </>
            )}
          </svg>
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden mt-3 pb-3 border-t border-gray-100 pt-3">
          <div className="flex flex-col gap-3">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-text-secondary hover:text-primary transition-colors text-sm font-medium px-2 py-1"
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <div className="flex gap-3 mt-2 px-2">
              <Link href="/login">
                <Button variant="ghost" size="sm">
                  Login
                </Button>
              </Link>
              <Link href="/signup">
                <Button variant="primary" size="sm">
                  Sign Up
                </Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
