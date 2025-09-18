import { promises as fs } from "fs";
import path from "path";
import { Projects, ProjectsType } from "./schemas";

// Re-export types and schemas for convenience
export * from "./schemas";

const projectsPath = path.join(process.cwd(), "data", "projects.json");

export async function readProjects(): Promise<ProjectsType> {
  try {
    const content = await fs.readFile(projectsPath, "utf-8");
    const data = JSON.parse(content);
    return Projects.parse(data);
  } catch (error) {
    console.error("Error reading projects:", error);
    return [];
  }
}

export async function writeProjects(nextData: unknown): Promise<ProjectsType> {
  if (process.env.NODE_ENV === "production") {
    throw new Error("Cannot write projects in production");
  }

  const validatedData = Projects.parse(nextData);
  const jsonContent = JSON.stringify(validatedData, null, 2) + "\n";

  await fs.writeFile(projectsPath, jsonContent, "utf-8");
  return validatedData;
}