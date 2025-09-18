"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { ArrowUp } from "lucide-react";

export function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const onScroll = () => setIsVisible(window.scrollY > 50);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  const btn = (
    <div
      className={`
        fixed z-50 bottom-4
        transition-all duration-300 ease-out
        ${
          isVisible
            ? "opacity-100 translate-y-0 pointer-events-auto"
            : "opacity-0 translate-y-3 pointer-events-none"
        }
      `}
      style={{
        right: `max(1rem, calc((100vw - 768px) / 2 + 1.5rem))`,
      }}
      onClick={scrollToTop}
    >
      <div
        className="
          h-12 w-12 rounded-full overflow-hidden
          bg-white/10 bg-clip-padding
          backdrop-blur-sm backdrop-saturate-150
          flex items-center justify-center cursor-pointer
          transition-colors duration-300 ease-out
          hover:bg-gray-900/10
        "
        style={{
          WebkitBackdropFilter: "blur(6px) saturate(0.5)",
          backdropFilter: "blur(6px) saturate(0.5)",
        }}
      >
        <ArrowUp />
      </div>
    </div>
  );

  // Render at the end of <body>, outside isolating wrappers
  return mounted ? createPortal(btn, document.body) : null;
}
