"use client";

import { useEffect, useState, useRef } from "react";
import Nav from "./components/nav";
import Banner from "./components/banner";
import Projects from "./components/projects";
import Experience from "./components/experience";
import Contact from "./components/contact";
import Footer from "./components/footer";

function ContentSection({ sectionId }: { sectionId: number }) {
  return (
    <>
      <main className="p-4 flex flex-col gap-24 pt-24">
        <div data-section="banner" data-section-id={sectionId}>
          <Banner />
        </div>
        <div data-section="projects" data-section-id={sectionId}>
          <Projects />
        </div>
        <div data-section="about" data-section-id={sectionId}>
          <Experience />
        </div>
        <div data-section="contact" data-section-id={sectionId}>
          <Contact />
        </div>
      </main>
      <Footer />
    </>
  );
}

export default function Home() {
  const [sections, setSections] = useState([-2, -1, 0, 1, 2]);
  const isAddingRef = useRef(false);
  const hasScrolledToMiddle = useRef(false);

  useEffect(() => {
    // Scroll to middle section on initial load
    if (!hasScrolledToMiddle.current) {
      const middleSection = document.querySelector('[data-section-id="0"]');
      if (middleSection) {
        middleSection.scrollIntoView({ behavior: "instant" as ScrollBehavior });
        hasScrolledToMiddle.current = true;
      }
    }
  }, [sections]);

  useEffect(() => {
    const handleScroll = () => {
      if (isAddingRef.current) return;

      const scrollPosition = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;

      // Add more sections at bottom
      if (scrollPosition + windowHeight >= documentHeight - 2000) {
        isAddingRef.current = true;

        setSections((current) => {
          const maxSection = Math.max(...current);
          return [...current, maxSection + 1];
        });

        requestAnimationFrame(() => {
          isAddingRef.current = false;
        });
      }

      // Add more sections at top
      if (scrollPosition <= 2000) {
        isAddingRef.current = true;
        const scrollBefore = documentHeight;

        setSections((current) => {
          const minSection = Math.min(...current);
          return [minSection - 1, ...current];
        });

        requestAnimationFrame(() => {
          const scrollAfter = document.documentElement.scrollHeight;
          const heightAdded = scrollAfter - scrollBefore;
          window.scrollTo({
            top: scrollPosition + heightAdded,
            behavior: "instant" as ScrollBehavior,
          });
          isAddingRef.current = false;
        });
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToNextSection = (sectionName: string) => {
    // Convert "/" to "banner" for home clicks
    const targetSection =
      sectionName === "" || sectionName === "/" ? "banner" : sectionName;

    const currentScrollY = window.scrollY;
    const allSections = document.querySelectorAll(
      `[data-section="${targetSection}"]`
    );

    // Find the next section below current scroll position
    let nextSection: Element | null = null;
    for (const section of Array.from(allSections)) {
      const rect = section.getBoundingClientRect();
      const absoluteTop = rect.top + currentScrollY;

      // If this section is below current position (with small buffer)
      if (absoluteTop > currentScrollY + 100) {
        nextSection = section;
        break;
      }
    }

    // Only scroll if found a section below (never scroll up)
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: "smooth", block: "start" });
    } else {
      // If no section below, add more sections first then scroll
      setSections((prev) => [...prev, prev.length + 1]);
      // Wait for DOM update then scroll to the newly added section
      setTimeout(() => {
        const updatedSections = document.querySelectorAll(
          `[data-section="${targetSection}"]`
        );
        const lastSection = updatedSections[updatedSections.length - 1];
        if (lastSection) {
          lastSection.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }, 50);
    }
  };

  return (
    <>
      <Nav onNavigate={scrollToNextSection} />
      {sections.map((id) => (
        <ContentSection key={id} sectionId={id} />
      ))}
    </>
  );
}
