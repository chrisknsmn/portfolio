"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  ProjectType,
  ProjectsType,
  Projects,
  CategoryType,
  CategoriesType,
  Categories,
} from "@/app/lib/schemas";

type Mode = "form" | "json" | "categories";

interface ImageData {
  folders: string[];
  images: Record<string, string[]>;
}

export default function AdminPage() {
  const [mode, setMode] = useState<Mode>("form");
  const [projects, setProjects] = useState<ProjectsType>([]);
  const [categories, setCategories] = useState<CategoriesType>([]);
  const [jsonText, setJsonText] = useState("");
  const [categoriesJsonText, setCategoriesJsonText] = useState("");
  const [status, setStatus] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [imageData, setImageData] = useState<ImageData>({
    folders: [],
    images: {},
  });

  const loadProjects = async () => {
    setIsLoading(true);
    setStatus(null);
    try {
      const response = await fetch("/api/admin/projects");
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
      const data = await response.json();
      setProjects(data);
      setJsonText(JSON.stringify(data, null, 2));
      setStatus({ type: "success", message: "Projects loaded successfully" });
    } catch (error) {
      setStatus({
        type: "error",
        message: `Failed to load: ${
          error instanceof Error ? error.message : "Unknown error"
        }`,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const saveFromJson = async () => {
    setIsLoading(true);
    setStatus(null);
    try {
      // Save projects
      const parsedProjectsData = JSON.parse(jsonText);
      const projectsResponse = await fetch("/api/admin/projects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parsedProjectsData),
      });

      if (!projectsResponse.ok) {
        const errorData = await projectsResponse.json();
        throw new Error(`Projects: ${errorData.error || `HTTP ${projectsResponse.status}`}`);
      }

      // Save categories
      const parsedCategoriesData = JSON.parse(categoriesJsonText);
      const categoriesResponse = await fetch("/api/admin/categories", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parsedCategoriesData),
      });

      if (!categoriesResponse.ok) {
        const errorData = await categoriesResponse.json();
        throw new Error(`Categories: ${errorData.error || `HTTP ${categoriesResponse.status}`}`);
      }

      const savedProjects = await projectsResponse.json();
      const savedCategories = await categoriesResponse.json();

      setProjects(savedProjects);
      setCategories(savedCategories);

      setStatus({ type: "success", message: "Projects and Categories saved successfully" });
    } catch (error) {
      setStatus({
        type: "error",
        message: `Failed to save: ${
          error instanceof Error ? error.message : "Unknown error"
        }`,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const saveFromForm = async () => {
    setIsLoading(true);
    setStatus(null);
    try {
      // Client-side validation
      Projects.parse(projects);

      const response = await fetch("/api/admin/projects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(projects),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || `HTTP ${response.status}`);
      }

      const savedData = await response.json();
      setProjects(savedData);
      setJsonText(JSON.stringify(savedData, null, 2));
      setStatus({ type: "success", message: "Projects saved successfully" });
    } catch (error) {
      setStatus({
        type: "error",
        message: `Validation failed: ${
          error instanceof Error ? error.message : "Unknown error"
        }`,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const loadCategories = async () => {
    setIsLoading(true);
    setStatus(null);
    try {
      const response = await fetch("/api/admin/categories");
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
      const data = await response.json();
      setCategories(data);
      setCategoriesJsonText(JSON.stringify(data, null, 2));
      setStatus({ type: "success", message: "Categories loaded successfully" });
    } catch (error) {
      setStatus({
        type: "error",
        message: `Failed to load categories: ${
          error instanceof Error ? error.message : "Unknown error"
        }`,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const saveCategories = async () => {
    setIsLoading(true);
    setStatus(null);
    try {
      // Client-side validation
      Categories.parse(categories);

      const response = await fetch("/api/admin/categories", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(categories),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || `HTTP ${response.status}`);
      }

      const savedData = await response.json();
      setCategories(savedData);
      setCategoriesJsonText(JSON.stringify(savedData, null, 2));
      setStatus({ type: "success", message: "Categories saved successfully" });
    } catch (error) {
      setStatus({
        type: "error",
        message: `Failed to save categories: ${
          error instanceof Error ? error.message : "Unknown error"
        }`,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const addCategory = () => {
    const newCategory: CategoryType = {
      id: `category-${Date.now()}`,
      name: "",
      icon: "",
    };
    setCategories([...categories, newCategory]);
  };

  const removeCategory = (index: number) => {
    setCategories(categories.filter((_, i) => i !== index));
  };

  const updateCategory = (index: number, updatedCategory: CategoryType) => {
    const newCategories = [...categories];
    newCategories[index] = updatedCategory;
    setCategories(newCategories);
  };

  const addProject = () => {
    const newProject: ProjectType = {
      title: "",
      year: new Date().getFullYear(),
      links: [],
      categories: [],
    };
    setProjects([...projects, newProject]);
  };

  const removeProject = (index: number) => {
    setProjects(projects.filter((_, i) => i !== index));
  };

  const updateProject = (index: number, updatedProject: ProjectType) => {
    const newProjects = [...projects];
    newProjects[index] = updatedProject;
    setProjects(newProjects);
  };

  const addLink = (projectIndex: number) => {
    const newProjects = [...projects];
    newProjects[projectIndex].links.push({ label: "", href: "" });
    setProjects(newProjects);
  };

  const removeLink = (projectIndex: number, linkIndex: number) => {
    const newProjects = [...projects];
    newProjects[projectIndex].links.splice(linkIndex, 1);
    setProjects(newProjects);
  };

  const updateLink = (
    projectIndex: number,
    linkIndex: number,
    field: "label" | "href",
    value: string
  ) => {
    const newProjects = [...projects];
    newProjects[projectIndex].links[linkIndex][field] = value;
    setProjects(newProjects);
  };

  const loadImages = async () => {
    try {
      const response = await fetch("/api/admin/images");
      if (response.ok) {
        const data = await response.json();
        setImageData(data);
      }
    } catch (error) {
      console.error("Failed to load images:", error);
    }
  };

  useEffect(() => {
    loadProjects();
    loadCategories();
    loadImages();
  }, []);

  const getDiffSummary = () => {
    try {
      const originalJson = JSON.stringify(JSON.parse(jsonText), null, 2);
      const currentJson = JSON.stringify(projects, null, 2);
      if (originalJson === currentJson) return "No changes";
      return `${projects.length} projects (modified)`;
    } catch {
      return "Invalid comparison";
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Admin</h1>
        <Link
          href="/"
          className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition-colors"
        >
          ← Back to Home
        </Link>
      </div>

      {/* Mode Toggle */}
      <div className="flex mb-6 border-b">
        <button
          onClick={() => setMode("form")}
          className={`px-4 py-2 font-medium ${
            mode === "form"
              ? "border-b-2 border-blue-500 text-blue-600"
              : "text-gray-600 hover:text-gray-800"
          }`}
        >
          Projects
        </button>
        <button
          onClick={() => setMode("categories")}
          className={`px-4 py-2 font-medium ${
            mode === "categories"
              ? "border-b-2 border-blue-500 text-blue-600"
              : "text-gray-600 hover:text-gray-800"
          }`}
        >
          Categories
        </button>
        <button
          onClick={() => setMode("json")}
          className={`px-4 py-2 font-medium ${
            mode === "json"
              ? "border-b-2 border-blue-500 text-blue-600"
              : "text-gray-600 hover:text-gray-800"
          }`}
        >
          JSON
        </button>
      </div>

      {/* Status */}
      {status && (
        <div
          className={`p-3 rounded mb-4 ${
            status.type === "success"
              ? "bg-green-100 text-green-800 border border-green-200"
              : "bg-red-100 text-red-800 border border-red-200"
          }`}
        >
          {status.message}
        </div>
      )}

      {/* Controls */}
      <div className="flex gap-2 mb-6">
        <button
          onClick={mode === "categories" ? loadCategories : loadProjects}
          disabled={isLoading}
          className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 disabled:opacity-50"
        >
          Load {mode === "categories" ? "Categories" : "Projects"}
        </button>
        <button
          onClick={
            mode === "categories"
              ? saveCategories
              : mode === "json"
              ? saveFromJson
              : saveFromForm
          }
          disabled={isLoading}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
        >
          Save {mode === "categories" ? "Categories" : "Projects"}
        </button>
      </div>

      {mode === "json" && (
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium mb-2">Projects JSON:</label>
            <textarea
              value={jsonText}
              onChange={(e) => setJsonText(e.target.value)}
              className="w-full h-64 p-3 font-mono text-sm border rounded-md"
              placeholder="Projects JSON content..."
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Categories JSON:</label>
            <textarea
              value={categoriesJsonText}
              onChange={(e) => setCategoriesJsonText(e.target.value)}
              className="w-full h-64 p-3 font-mono text-sm border rounded-md"
              placeholder="Categories JSON content..."
            />
          </div>
        </div>
      )}

      {mode === "form" && (
        <div>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">
              Projects ({projects.length})
            </h2>
            <div className="flex gap-2">
              <span className="text-sm text-gray-600">
                Changes: {getDiffSummary()}
              </span>
              <button
                onClick={addProject}
                className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600"
              >
                Add Project
              </button>
            </div>
          </div>

          <div className="space-y-6">
            {projects.map((project, projectIndex) => (
              <div key={projectIndex} className="border p-4 rounded-lg">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-lg font-medium">
                    Project {projectIndex + 1}
                  </h3>
                  <button
                    onClick={() => removeProject(projectIndex)}
                    className="px-2 py-1 bg-red-500 text-white text-sm rounded hover:bg-red-600"
                  >
                    Remove
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Title *
                    </label>
                    <input
                      type="text"
                      value={project.title}
                      onChange={(e) =>
                        updateProject(projectIndex, {
                          ...project,
                          title: e.target.value,
                        })
                      }
                      className="w-full p-2 border rounded"
                      placeholder="Project title"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Year *
                    </label>
                    <input
                      type="number"
                      value={project.year}
                      onChange={(e) =>
                        updateProject(projectIndex, {
                          ...project,
                          year:
                            parseInt(e.target.value) ||
                            new Date().getFullYear(),
                        })
                      }
                      className="w-full p-2 border rounded"
                      min="1900"
                      max="2100"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Thumbnail
                    </label>
                    <div className="space-y-2">
                      <input
                        type="text"
                        value={project.thumb || ""}
                        onChange={(e) =>
                          updateProject(projectIndex, {
                            ...project,
                            thumb: e.target.value || undefined,
                          })
                        }
                        className="w-full p-2 border rounded"
                        placeholder="/images/project_01/image.jpg or /images/project_01/* for all images"
                      />
                      {project.thumb && (
                        <div className="mt-2">
                          {project.thumb.endsWith("/*") ? (
                            <div>
                              <p className="text-sm text-gray-600 mb-2">
                                Folder: {project.thumb.replace("/*", "")} (all
                                images)
                              </p>
                              <div className="grid grid-cols-4 gap-2">
                                {imageData.images[
                                  project.thumb.replace("/*", "")
                                ]
                                  ?.slice(0, 8)
                                  .map((imagePath, idx) => (
                                    <img
                                      key={idx}
                                      src={imagePath}
                                      alt={`Preview ${idx + 1}`}
                                      className="w-16 h-16 object-cover rounded border"
                                      onError={(e) => {
                                        e.currentTarget.style.display = "none";
                                      }}
                                    />
                                  )) || (
                                  <p className="text-sm text-gray-500">
                                    No images found in folder
                                  </p>
                                )}
                                {imageData.images[
                                  project.thumb.replace("/*", "")
                                ]?.length > 8 && (
                                  <div className="w-16 h-16 border rounded flex items-center justify-center text-xs text-gray-500">
                                    +
                                    {imageData.images[
                                      project.thumb.replace("/*", "")
                                    ].length - 8}{" "}
                                    more
                                  </div>
                                )}
                              </div>
                            </div>
                          ) : (
                            <img
                              src={project.thumb}
                              alt="Thumbnail preview"
                              className="w-20 h-20 object-cover rounded border"
                              onError={(e) => {
                                e.currentTarget.style.display = "none";
                              }}
                            />
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-medium mb-1">
                    Summary
                  </label>
                  <textarea
                    value={project.summary || ""}
                    onChange={(e) =>
                      updateProject(projectIndex, {
                        ...project,
                        summary: e.target.value || undefined,
                      })
                    }
                    className="w-full p-2 border rounded"
                    rows={3}
                    placeholder="Project description..."
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-medium mb-2">
                    Categories
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {categories.map((category) => (
                      <label
                        key={category.id}
                        className="flex items-center gap-2 p-2 border rounded cursor-pointer hover:bg-gray-50"
                      >
                        <input
                          type="checkbox"
                          checked={
                            project.categories?.includes(category.id) || false
                          }
                          onChange={(e) => {
                            const currentCategories = project.categories || [];
                            const newCategories = e.target.checked
                              ? [...currentCategories, category.id]
                              : currentCategories.filter(
                                  (id) => id !== category.id
                                );
                            updateProject(projectIndex, {
                              ...project,
                              categories: newCategories,
                            });
                          }}
                          className="rounded"
                        />
                        {category.icon && (
                          <span className="text-sm flex items-center">
                            <img
                              src={category.icon}
                              alt={category.name}
                              className="w-4 h-4 object-contain"
                              onError={(e) => {
                                e.currentTarget.style.display = "none";
                              }}
                            />
                          </span>
                        )}
                        <span className="text-sm">{category.name}</span>
                      </label>
                    ))}
                  </div>
                  {categories.length === 0 && (
                    <p className="text-sm text-gray-500">No categories.</p>
                  )}
                </div>

                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label className="block text-sm font-medium">Links</label>
                    <button
                      onClick={() => addLink(projectIndex)}
                      className="px-2 py-1 bg-blue-500 text-white text-sm rounded hover:bg-blue-600"
                    >
                      Add Link
                    </button>
                  </div>
                  <div className="space-y-2">
                    {project.links.map((link, linkIndex) => (
                      <div key={linkIndex} className="flex gap-2">
                        <input
                          type="text"
                          value={link.label}
                          onChange={(e) =>
                            updateLink(
                              projectIndex,
                              linkIndex,
                              "label",
                              e.target.value
                            )
                          }
                          className="flex-1 p-2 border rounded"
                          placeholder="Link label"
                        />
                        <input
                          type="url"
                          value={link.href}
                          onChange={(e) =>
                            updateLink(
                              projectIndex,
                              linkIndex,
                              "href",
                              e.target.value
                            )
                          }
                          className="flex-2 p-2 border rounded"
                          placeholder="https://example.com"
                        />
                        <button
                          onClick={() => removeLink(projectIndex, linkIndex)}
                          className="px-2 py-1 bg-red-500 text-white text-sm rounded hover:bg-red-600"
                        >
                          Remove
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {mode === "categories" && (
        <div>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">
              Categories ({categories.length})
            </h2>
            <button
              onClick={addCategory}
              className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600"
            >
              Add Category
            </button>
          </div>

          <div className="space-y-4">
            {categories.map((category, index) => (
              <div key={index} className="border p-4 rounded-lg">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-lg font-medium">Category {index + 1}</h3>
                  <button
                    onClick={() => removeCategory(index)}
                    className="px-2 py-1 bg-red-500 text-white text-sm rounded hover:bg-red-600"
                  >
                    Remove
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Name *
                    </label>
                    <input
                      type="text"
                      value={category.name}
                      onChange={(e) =>
                        updateCategory(index, {
                          ...category,
                          name: e.target.value,
                        })
                      }
                      className="w-full p-2 border rounded"
                      placeholder="Category Name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Icon
                    </label>
                    <div className="space-y-2">
                      <input
                        type="text"
                        value={category.icon || ""}
                        onChange={(e) =>
                          updateCategory(index, {
                            ...category,
                            icon: e.target.value,
                          })
                        }
                        className="w-full p-2 border rounded"
                        placeholder="/images/icons/icon.svg"
                      />
                      {category.icon && (
                        <div className="mt-2">
                          <img
                            src={category.icon}
                            alt="Icon preview"
                            className="w-6 h-6 object-contain"
                            onError={(e) => {
                              e.currentTarget.style.display = "none";
                            }}
                          />
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
