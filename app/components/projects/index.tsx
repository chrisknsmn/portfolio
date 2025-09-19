"use client";

import { useState, useEffect } from "react";
import { H2, H3, H4, P } from "@/components/ui/main";
import { ProjectsType, CategoriesType } from "@/app/lib/schemas";

export default function Projects() {
  const [projects, setProjects] = useState<ProjectsType>([]);
  const [categories, setCategories] = useState<CategoriesType>([]);
  const [expandedProjects, setExpandedProjects] = useState<Set<number>>(
    new Set()
  );

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

  const toggleProject = (index: number) => {
    const newExpanded = new Set(expandedProjects);
    if (newExpanded.has(index)) {
      newExpanded.delete(index);
    } else {
      newExpanded.add(index);
    }
    setExpandedProjects(newExpanded);
  };


  return (
    <div className="p-4">
      <H2 id="projects" variant="border" className="mb-2">
        Projects
      </H2>
      <div className="space-y-4">
        {projects.map((project, index) => {
          const isExpanded = expandedProjects.has(index);

          return (
            <div key={index} className="border-b pb-2 mb-2">
              <div
                className="flex justify-between items-center cursor-pointer"
                onClick={() => toggleProject(index)}
              >
                <div className="flex items-center gap-2">
                  <h3 className="text-lg font-medium">{project.title}</h3>
                  <p className="text-sm text-gray-600">{project.year}</p>
                </div>
                <span className="text-lg transition-transform duration-200 ease-in-out">
                  {isExpanded ? "−" : "+"}
                </span>
              </div>

              <div
                className={`overflow-hidden transition-all duration-300 ease-in-out ${
                  isExpanded ? "max-h-[1000px]" : "max-h-0"
                }`}
              >
                <div className="mt-2">
                  {/* ICONS */}
                  {project.categories && project.categories.length > 0 && (
                    <div className="mb-3">
                      <div className="flex gap-2 flex-wrap">
                        {project.categories.map((categoryId) => {
                          const category = categories.find(
                            (cat) => cat.id === categoryId
                          );
                          if (!category) return null;

                          return (
                            <span
                              key={categoryId}
                              className="inline-flex items-center gap-1 px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full"
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
                    </div>
                  )}
                  {/* SUMMARY */}
                  {project.summary && (
                    <p className="text-sm text-gray-700 mb-3">
                      {project.summary}
                    </p>
                  )}
                  {/* LINKS */}
                  <div className="flex flex-col gap-2">
                    {project.links?.map((link, linkIndex) => (
                      <a
                        key={linkIndex}
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-blue-600 hover:text-blue-800 underline"
                      >
                        {link.label}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          );
        })}

        {projects.length === 0 && (
          <p className="text-gray-500 italic">No projects found</p>
        )}
      </div>
    </div>
  );
}
