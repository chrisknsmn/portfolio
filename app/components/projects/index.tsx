"use client";

import { useState, useEffect, useRef } from "react";
import { H2, H3, H4, P } from "@/components/ui/main";
import { ProjectsType } from "@/app/lib/schemas";

export default function Projects() {
  const [projects, setProjects] = useState<ProjectsType>([]);
  const [expandedProjects, setExpandedProjects] = useState<Set<number>>(new Set());
  const contentRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    // Load projects on client side
    fetch('/api/admin/projects')
      .then(res => res.json())
      .then(data => {
        setProjects(data);
        // Initialize refs array
        contentRefs.current = new Array(data.length).fill(null);
      })
      .catch(console.error);
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

  const getLinkByLabel = (
    links: Array<{ label: string; href: string }>,
    label: string
  ) => {
    return links.find((link) =>
      link.label.toLowerCase().includes(label.toLowerCase())
    );
  };

  return (
    <div className="p-4">
      <H2 id="projects" variant="border" className="mb-2">
        Projects
      </H2>
      <div className="space-y-4">
        {projects.map((project, index) => {
          const productionLink =
            getLinkByLabel(project.links, "site") ||
            getLinkByLabel(project.links, "production") ||
            getLinkByLabel(project.links, "live");
          const githubLink =
            getLinkByLabel(project.links, "github") ||
            getLinkByLabel(project.links, "repo");
          const designLink =
            getLinkByLabel(project.links, "figma") ||
            getLinkByLabel(project.links, "design");

          const isExpanded = expandedProjects.has(index);

          return (
            <div key={index} className="border-b pb-2">
              <div
                className="flex justify-between items-center cursor-pointer py-2"
                onClick={() => toggleProject(index)}
              >
                <div className="flex items-center gap-4">
                  <h3 className="text-lg font-medium">{project.title}</h3>
                  <p className="text-sm text-gray-600">{project.year}</p>
                </div>
                <span className="text-lg transition-transform duration-200 ease-in-out">
                  {isExpanded ? '−' : '+'}
                </span>
              </div>

              <div
                ref={(el) => (contentRefs.current[index] = el)}
                className="overflow-hidden transition-all duration-300 ease-in-out"
                style={{
                  maxHeight: isExpanded ? contentRefs.current[index]?.scrollHeight + 'px' : '0px',
                }}
              >
                <div className="mt-2 pl-4 border-l-2 border-gray-200">
                  {project.summary && (
                    <p className="text-sm text-gray-700 mb-3">{project.summary}</p>
                  )}

                  <div className="flex gap-3 flex-wrap">
                    {productionLink && (
                      <a
                        href={productionLink.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-blue-600 hover:text-blue-800 underline"
                      >
                        Live Site
                      </a>
                    )}
                    {githubLink && (
                      <a
                        href={githubLink.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-blue-600 hover:text-blue-800 underline"
                      >
                        GitHub
                      </a>
                    )}
                    {designLink && (
                      <a
                        href={designLink.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-blue-600 hover:text-blue-800 underline"
                      >
                        Design
                      </a>
                    )}
                    {project.links
                      .filter(
                        (link) =>
                          !getLinkByLabel([link], "site") &&
                          !getLinkByLabel([link], "production") &&
                          !getLinkByLabel([link], "live") &&
                          !getLinkByLabel([link], "github") &&
                          !getLinkByLabel([link], "repo") &&
                          !getLinkByLabel([link], "figma") &&
                          !getLinkByLabel([link], "design")
                      )
                      .map((link, linkIndex) => (
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
