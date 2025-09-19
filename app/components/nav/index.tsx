"use client";

import Link from "next/link";
import { useState } from "react";
import { Command, Home, User, Briefcase, Mail, X } from "lucide-react";

export default function Nav() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [shouldRender, setShouldRender] = useState(false);
  const isProduction = process.env.NODE_ENV === "production";

  const openMenu = () => {
    setShouldRender(true);
    setTimeout(() => setIsMenuOpen(true), 10);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
    setTimeout(() => setShouldRender(false), 220);
  };

  const menuItems = [
    { icon: Home, label: "Home", href: "/" },
    { icon: User, label: "About", href: "#about" },
    { icon: Briefcase, label: "Projects", href: "#projects" },
    { icon: Mail, label: "Contact", href: "#contact" },
  ];

  return (
    <header className="sticky top-4 inset-x-0 z-50 mx-6 mb-4">
      <div className="mx-auto max-w-screen-lg flex items-center justify-between justify-end">
        <div>
          {!isProduction && (
            <Link href="/admin" className="mr-2">
              ADMIN
            </Link>
          )}
        </div>
        <div className="relative">
          <div
            className="aspect-square h-12 rounded-full bg-white/10 hover:bg-gray-900/10 transition-colors duration-500 ease-in-out backdrop-blur-sm flex items-center justify-center cursor-pointer text-2xl"
            onClick={openMenu}
          >
            <Command size={20} />
          </div>

          {shouldRender && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
              <div className="absolute inset-0" onClick={closeMenu} />
              <div
                className={`relative w-full max-w-screen-sm h-[80vh] bg-white/10 backdrop-blur-sm rounded-lg shadow-lg border border-gray-200/50 p-8 flex flex-col items-center justify-center transition-all duration-200 ease-out ${
                  isMenuOpen ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
                }`}
              >
                <button
                  onClick={closeMenu}
                  className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100/50 transition-colors"
                >
                  <X size={20} />
                </button>
                {menuItems.map((item, index) => {
                  const Icon = item.icon;
                  return (
                    <Link
                      key={index}
                      href={item.href}
                      className="flex items-center gap-4 px-6 py-4 text-lg text-gray-700 hover:bg-gray-100/50 transition-colors rounded-lg w-full max-w-sm"
                      onClick={closeMenu}
                    >
                      <Icon size={24} />
                      {item.label}
                    </Link>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
