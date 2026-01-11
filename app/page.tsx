"use client";

import { useEffect, useState } from "react";
import Nav from "./components/nav";
import Banner from "./components/banner";
import Projects from "./components/projects";
import Experience from "./components/experience";
import Contact from "./components/contact";
import Footer from "./components/footer";

function ContentSection() {
  return (
    <>
      <main className="p-4 flex flex-col gap-24">
        <Banner />
        <Projects />
        <Experience />
        <Contact />
      </main>
      <div className="mb-24">
        <Footer />
      </div>
    </>
  );
}

export default function Home() {
  const [sections, setSections] = useState([1, 2, 3]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Check if user is near bottom (within 1000px)
      const scrollPosition = window.innerHeight + window.scrollY;
      const bottomPosition = document.documentElement.scrollHeight - 1000;

      if (scrollPosition >= bottomPosition && !isLoading) {
        setIsLoading(true);
        // Add one more section
        setSections((prev) => [...prev, prev.length + 1]);
        setTimeout(() => setIsLoading(false), 100);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isLoading]);

  return (
    <>
      <Nav />
      {sections.map((id) => (
        <ContentSection key={id} />
      ))}
      {isLoading && (
        <div className="p-8 text-center text-muted-foreground">
          Loading more...
        </div>
      )}
    </>
  );
}
