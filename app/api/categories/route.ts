import { NextResponse } from "next/server";
import { Categories, CategoriesType } from "@/app/lib/schemas";
import fs from "fs/promises";
import path from "path";

const CATEGORIES_FILE = path.join(process.cwd(), "data", "categories.json");

async function readCategories(): Promise<CategoriesType> {
  try {
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

export async function GET() {
  try {
    const categories = await readCategories();
    return NextResponse.json(categories);
  } catch (error) {
    console.error("Error reading categories:", error);
    return NextResponse.json([], { status: 200 }); // Return empty array instead of error
  }
}