import { NextRequest, NextResponse } from "next/server";
import { readProjects, writeProjects } from "@/app/lib/projects";
import { ZodError } from "zod";

function isLocalDev(request: NextRequest): boolean {
  const isProduction = process.env.NODE_ENV === "production";
  const host = request.headers.get("host") || "";
  const isLocalhost = host.startsWith("localhost") || host.startsWith("127.0.0.1");

  return !isProduction && isLocalhost;
}

export async function GET(request: NextRequest) {
  if (!isLocalDev(request)) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  try {
    const projects = await readProjects();
    return NextResponse.json(projects);
  } catch (error) {
    console.error("Error reading projects:", error);
    return NextResponse.json(
      { error: "Failed to read projects" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  if (!isLocalDev(request)) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  try {
    const body = await request.json();
    const savedProjects = await writeProjects(body);
    return NextResponse.json(savedProjects);
  } catch (error) {
    console.error("Error writing projects:", error);

    if (error instanceof ZodError) {
      return NextResponse.json(
        { error: "Validation failed", details: error.errors },
        { status: 422 }
      );
    }

    return NextResponse.json(
      { error: "Failed to save projects" },
      { status: 400 }
    );
  }
}