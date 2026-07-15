"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { H2, H3, H4, P } from "@/components/ui/main";
import { ProjectsType, CategoriesType } from "@/app/lib/schemas";

export default function Projects() {
  const [projects, setProjects] = useState<ProjectsType>([]);
  const [categories, setCategories] = useState<CategoriesType>([]);
  const [page, setPage] = useState(0);
  // 1 col x 2 rows on mobile, 2 x 2 from the sm breakpoint up
  const [pageSize, setPageSize] = useState(4);
  const [isFading, setIsFading] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 640px)");
    const update = () => {
      setPageSize(mediaQuery.matches ? 4 : 2);
      setPage(0);
    };
    update();
    mediaQuery.addEventListener("change", update);
    return () => mediaQuery.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    // Load projects and categories on client side
    Promise.all([
      fetch("/api/projects").then((res) => {
        if (!res.ok) throw new Error("Failed to fetch projects");
        return res.json();
      }),
      fetch("/api/categories").then((res) => {
        if (!res.ok) throw new Error("Failed to fetch categories");
        return res.json();
      }),
    ])
      .then(([projectsData, categoriesData]) => {
        setProjects(Array.isArray(projectsData) ? projectsData : []);
        setCategories(Array.isArray(categoriesData) ? categoriesData : []);
      })
      .catch((error) => {
        console.error("Failed to load data:", error);
        // Set empty arrays as fallback
        setProjects([]);
        setCategories([]);
      });
  }, []);

  const pageCount = Math.max(1, Math.ceil(projects.length / pageSize));
  const visibleProjects = projects.slice(
    page * pageSize,
    (page + 1) * pageSize
  );

  const changePage = (delta: number) => {
    if (isFading) return;
    setIsFading(true);
    setTimeout(() => {
      setPage((p) => (p + delta + pageCount) % pageCount);
      setIsFading(false);
    }, 200);
  };

  const prevPage = () => changePage(-1);
  const nextPage = () => changePage(1);

  return (
    <div className="p-4">
      <div className="flex items-end justify-between border-b pb-2 mb-4">
        <H2 id="projects">Projects</H2>
        {pageCount > 1 && (
          <div className="flex items-center gap-2">
            <button
              onClick={prevPage}
              aria-label="Previous projects"
              className="p-2 rounded-full hover:bg-gray-100 transition-colors cursor-pointer"
            >
              <ChevronLeft size={20} />
            </button>
            <span className="text-sm text-gray-600">
              {page + 1} / {pageCount}
            </span>
            <button
              onClick={nextPage}
              aria-label="Next projects"
              className="p-2 rounded-full hover:bg-gray-100 transition-colors cursor-pointer"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        )}
      </div>

      <div
        className={`grid grid-cols-1 sm:grid-cols-2 gap-4 transition-opacity duration-200 ease-in-out ${
          isFading ? "opacity-0" : "opacity-100"
        }`}
      >
        {visibleProjects.map((project, index) => (
          <div key={`${page}-${index}`} className="relative">
            {/* Border layer with bottom fade, matching the banner */}
            <div
              className="absolute inset-0 border rounded-lg bg-background pointer-events-none"
              style={{
                maskImage:
                  "linear-gradient(to bottom, black 50%, transparent 100%)",
                WebkitMaskImage:
                  "linear-gradient(to bottom, black 50%, transparent 100%)",
              }}
            ></div>
            <div className="relative rounded-lg overflow-hidden flex flex-col h-full">
            {project.thumb && (
              <Image
                src={project.thumb}
                alt={project.title}
                width={400}
                height={225}
                className="w-full aspect-video object-cover"
              />
            )}
            <div className="p-3 flex flex-col gap-2 flex-1">
              <h3 className="text-base font-medium leading-snug">
                {project.title}
              </h3>
              {project.summary && (
                <p className="text-xs text-gray-600 line-clamp-3">
                  {project.summary}
                </p>
              )}
              {project.categories && project.categories.length > 0 && (
                <div className="flex gap-1 flex-wrap">
                  {project.categories.map((categoryId) => {
                    const category = categories.find(
                      (cat) => cat.id === categoryId
                    );
                    if (!category) return null;

                    return (
                      <span
                        key={categoryId}
                        className="inline-flex items-center gap-1 px-1.5 py-0.5 bg-gray-100 text-gray-700 text-[10px] rounded-full"
                      >
                        {category.icon && (
                          <img
                            src={category.icon}
                            alt={category.name}
                            className="w-3 h-3 object-contain"
                            onError={(e) => {
                              e.currentTarget.style.display = "none";
                            }}
                          />
                        )}
                        {category.name}
                      </span>
                    );
                  })}
                </div>
              )}
              {project.links && project.links.length > 0 && (
                <div className="flex flex-col gap-1 mt-auto pt-1">
                  {project.links.map((link, linkIndex) => (
                    <a
                      key={linkIndex}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-blue-600 hover:text-blue-800 underline"
                    >
                      {link.label}
                    </a>
                  ))}
                </div>
              )}
            </div>
            </div>
          </div>
        ))}
      </div>

      {projects.length === 0 && (
        <p className="text-gray-500 italic">No projects found</p>
      )}
    </div>
  );
}
