import { NextRequest, NextResponse } from "next/server";
import { ZodError } from "zod";
import { Categories, CategoriesType } from "@/app/lib/schemas";
import fs from "fs/promises";
import path from "path";

function isLocalDev(request: NextRequest): boolean {
  const isProduction = process.env.NODE_ENV === "production";
  const host = request.headers.get("host") || "";
  const isLocalhost = host.startsWith("localhost") || host.startsWith("127.0.0.1");

  return !isProduction && isLocalhost;
}

const CATEGORIES_FILE = path.join(process.cwd(), "data", "categories.json");

async function ensureDataDir() {
  const dataDir = path.dirname(CATEGORIES_FILE);
  try {
    await fs.access(dataDir);
  } catch {
    await fs.mkdir(dataDir, { recursive: true });
  }
}

async function readCategories(): Promise<CategoriesType> {
  try {
    await ensureDataDir();
    const data = await fs.readFile(CATEGORIES_FILE, "utf-8");
    const parsed = JSON.parse(data);
    return Categories.parse(parsed);
  } catch (error) {
    // Return default categories if file doesn't exist
    return [
      { id: "frontend", name: "Frontend", icon: "⚛️" },
      { id: "backend", name: "Backend", icon: "🖥️" },
      { id: "fullstack", name: "Full Stack", icon: "🚀" },
      { id: "mobile", name: "Mobile", icon: "📱" },
      { id: "design", name: "Design", icon: "🎨" },
    ];
  }
}

async function writeCategories(categories: CategoriesType): Promise<CategoriesType> {
  await ensureDataDir();
  const validated = Categories.parse(categories);
  await fs.writeFile(CATEGORIES_FILE, JSON.stringify(validated, null, 2));
  return validated;
}

export async function GET(request: NextRequest) {
  if (!isLocalDev(request)) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  try {
    const categories = await readCategories();
    return NextResponse.json(categories);
  } catch (error) {
    console.error("Error reading categories:", error);
    return NextResponse.json(
      { error: "Failed to read categories" },
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
    const savedCategories = await writeCategories(body);
    return NextResponse.json(savedCategories);
  } catch (error) {
    console.error("Error writing categories:", error);

    if (error instanceof ZodError) {
      return NextResponse.json(
        { error: "Validation failed", details: error.errors },
        { status: 422 }
      );
    }

    return NextResponse.json(
      { error: "Failed to save categories" },
      { status: 400 }
    );
  }
}