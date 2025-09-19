import { H2, H3, H4, P } from "@/components/ui/main";
import { readProjects } from "@/app/lib/projects";

export default async function Projects() {
  const projects = await readProjects();

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

          return (
            <div key={index} className="border-b pb-2">
              <h3 className="text-lg font-medium">{project.title}</h3>
              <p className="text-sm text-gray-600">{project.year}</p>

              <div className="flex gap-3 mt-2">
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
          );
        })}

        {projects.length === 0 && (
          <p className="text-gray-500 italic">No projects found</p>
        )}
      </div>
    </div>
  );
}
