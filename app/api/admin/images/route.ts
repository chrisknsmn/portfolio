import { NextRequest, NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";

function isLocalDev(request: NextRequest): boolean {
  const isProduction = process.env.NODE_ENV === "production";
  const host = request.headers.get("host") || "";
  const isLocalhost = host.startsWith("localhost") || host.startsWith("127.0.0.1");

  return !isProduction && isLocalhost;
}

const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.svg'];

export async function GET(request: NextRequest) {
  if (!isLocalDev(request)) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  try {
    const publicImagesPath = path.join(process.cwd(), "public", "images");

    // Check if images directory exists
    try {
      await fs.access(publicImagesPath);
    } catch {
      // Create the directory if it doesn't exist
      await fs.mkdir(publicImagesPath, { recursive: true });
      return NextResponse.json({ folders: [], images: {} });
    }

    const items = await fs.readdir(publicImagesPath, { withFileTypes: true });
    const folders = items
      .filter(item => item.isDirectory())
      .map(item => item.name)
      .sort();

    const images: Record<string, string[]> = {};

    // Get images for each folder
    for (const folder of folders) {
      const folderPath = path.join(publicImagesPath, folder);
      try {
        const folderItems = await fs.readdir(folderPath);
        images[folder] = folderItems
          .filter(file => {
            const ext = path.extname(file).toLowerCase();
            return imageExtensions.includes(ext);
          })
          .map(file => `/images/${folder}/${file}`)
          .sort();
      } catch (error) {
        console.error(`Error reading folder ${folder}:`, error);
        images[folder] = [];
      }
    }

    return NextResponse.json({ folders, images });
  } catch (error) {
    console.error("Error listing images:", error);
    return NextResponse.json(
      { error: "Failed to list images" },
      { status: 500 }
    );
  }
}