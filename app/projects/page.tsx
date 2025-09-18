import { readProjects } from "@/app/lib/projects";

export default async function ProjectsPage() {
  const projects = await readProjects();

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-8">Projects</h1>

      <div className="space-y-8">
        {projects.map((project, index) => (
          <div key={index} className="border rounded-lg p-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h2 className="text-2xl font-semibold">{project.title}</h2>
                <p className="text-gray-600">{project.year}</p>
              </div>
              {project.thumb && (
                <img
                  src={project.thumb}
                  alt={project.title}
                  className="w-24 h-24 object-cover rounded"
                />
              )}
            </div>

            {project.summary && (
              <p className="text-gray-700 mb-4">{project.summary}</p>
            )}

            {project.links.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {project.links.map((link, linkIndex) => (
                  <a
                    key={linkIndex}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-1 bg-blue-500 text-white text-sm rounded hover:bg-blue-600 transition-colors"
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            )}
          </div>
        ))}

        {projects.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">No projects found.</p>
          </div>
        )}
      </div>
    </div>
  );
}