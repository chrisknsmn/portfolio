"use client";

import Link from "next/link";
import { useState } from "react";
import {
  Command,
  X,
} from "lucide-react";
import { menuSections } from "@/app/lib/menu-data";

export default function Nav() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [shouldRender, setShouldRender] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const isProduction = process.env.NODE_ENV === "production";

  const openMenu = () => {
    setShouldRender(true);
    setTimeout(() => setIsMenuOpen(true), 10);
  };

  const closeMenu = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsMenuOpen(false);
      setShouldRender(false);
      setIsClosing(false);
    }, 150);
  };


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
                className={`relative w-full max-w-screen-sm h-[60vh] bg-white/30 backdrop-blur-sm rounded-lg shadow-lg border border-gray-200/50 ${
                  isClosing
                    ? "transition-opacity duration-150 ease-out opacity-0"
                    : isMenuOpen
                    ? "transition-all duration-200 ease-out translate-y-0 opacity-100"
                    : "transition-all duration-200 ease-out translate-y-8 opacity-0"
                }`}
              >
                <button
                  onClick={closeMenu}
                  className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100/50 transition-colors z-10 cursor-pointer"
                >
                  <X size={20} />
                </button>

                <div className="h-full overflow-y-auto p-4 pt-5">
                  <div className="flex flex-col space-y-1">
                    {menuSections.map((section, sectionIndex) => (
                      <div key={sectionIndex}>
                        <h2 className="text-xl px-2 font-semibold text-gray-800">
                          {section.title}
                        </h2>
                        <div>
                          {section.items.map((item, itemIndex) => (
                            <Link
                              key={itemIndex}
                              href={item.href}
                              target={
                                section.title === "Social" || section.title === "Resources"
                                  ? "_blank"
                                  : undefined
                              }
                              rel={
                                section.title === "Social" || section.title === "Resources"
                                  ? "noopener noreferrer"
                                  : undefined
                              }
                              className="flex items-center p-2 gap-2 text-lg text-gray-700 hover:bg-gray-100/50 transition-colors rounded-lg w-full"
                              onClick={closeMenu}
                            >
                              {item.label}
                            </Link>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
