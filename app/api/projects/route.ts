import { NextResponse } from "next/server";
import { readProjects } from "@/app/lib/projects";

export async function GET() {
  try {
    const projects = await readProjects();
    return NextResponse.json(projects);
  } catch (error) {
    console.error("Error reading projects:", error);
    return NextResponse.json([], { status: 200 }); // Return empty array instead of error
  }
}