import { readProjects } from "@/app/lib/projects";

export default async function Work() {
  const projects = await readProjects();

  return (
    <div className="p-4">
      <h2 className="leading-tight text-[clamp(1.75rem,calc(1rem+6vw),5rem)]">
        Work
      </h2>
      <p className="text-sm opacity-90 mb-4">Recent projects</p>

      <div className="space-y-4">
        {projects.map((project, index) => (
          <div key={index} className="border-b pb-2">
            <h3 className="text-lg font-medium">{project.title}</h3>
            <p className="text-sm text-gray-600">{project.year}</p>
          </div>
        ))}

        {projects.length === 0 && (
          <p className="text-gray-500 italic">No projects found</p>
        )}
      </div>
    </div>
  );
}
