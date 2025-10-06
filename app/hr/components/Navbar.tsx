"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const user = {
  name: "Maria Santos",
  role: "hr",
};

const allQuickLinks = [
  { label: "HR Home", href: "/hr", roles: ["hr"] },
  { label: "Employees", href: "/hr/employees", roles: ["hr"] }
];

const HRNavbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const pathname = usePathname();
  const dropdownRef = useRef<HTMLDivElement>(null);

  const quickLinks = allQuickLinks.filter(link => link.roles.includes(user.role));

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setUserMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm border-b border-gray-200">
      <div className="flex items-center justify-between px-4 md:px-8 h-16">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#43cea2] via-[#647dee] to-[#7f53ac] flex items-center justify-center shadow-md">
            <span className="text-xl font-extrabold text-white">HR</span>
          </div>
          <span className="text-2xl font-bold text-[#1877f2] tracking-tight">HR Center</span>
        </div>

        {/* Search bar (desktop only) */}
        <div className="hidden sm:flex flex-grow justify-center max-w-sm m-2">
          <div className="relative w-full">
            <input
              type="text"
              placeholder="Search..."
              className="w-full pl-12 pr-4 py-2 rounded-full border border-gray-300 shadow-sm focus:ring-2 focus:ring-[#1877f2] focus:outline-none transition"
            />
            <div className="absolute inset-y-0 left-4 flex items-center text-gray-400">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <circle cx="11" cy="11" r="8" />
                <path d="M21 21l-4.35-4.35" />
              </svg>
            </div>
          </div>
        </div>

        {/* Right Controls */}
        <div className="flex items-center gap-3">
          {/* Desktop Links */}
          <nav className="hidden lg:flex gap-3">
            {quickLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                    isActive
                      ? "bg-[#eaf3ff] text-[#1877f2] shadow"
                      : "text-gray-700 hover:text-[#1877f2] hover:bg-gray-100"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* User Avatar */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setUserMenuOpen(!userMenuOpen)}
              className="w-10 h-10 rounded-full bg-gradient-to-br from-[#43cea2] via-[#647dee] to-[#7f53ac] flex items-center justify-center shadow-md"
            >
              <span className="text-sm font-bold text-white">U</span>
            </button>
            {userMenuOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                <Link href="/hr/profile" className="block px-4 py-3 hover:bg-gray-100 text-sm text-gray-700">
                  My Profile
                </Link>
                <Link href="/hr/settings" className="block px-4 py-3 hover:bg-gray-100 text-sm text-gray-700">
                  Settings
                </Link>
                <hr className="border-gray-200" />
                <Link href="/logout" className="block px-4 py-3 text-red-600 hover:bg-gray-100 text-sm font-medium">
                  Logout
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="lg:hidden p-2 rounded-md hover:bg-gray-100"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              {menuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Nav Menu */}
      {menuOpen && (
        <nav className="lg:hidden bg-white border-t border-gray-100 px-4 pb-3">
          {quickLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`block px-4 py-2 mt-1 rounded-md text-sm font-medium transition ${
                  isActive
                    ? "bg-[#eaf3ff] text-[#1877f2] shadow"
                    : "text-gray-700 hover:text-[#1877f2] hover:bg-gray-100"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>
      )}
    </header>
  );
};

export default HRNavbar;
