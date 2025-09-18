"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ProjectType, ProjectsType, Projects } from "@/app/lib/schemas";

type Mode = "form" | "json";

interface ImageData {
  folders: string[];
  images: Record<string, string[]>;
}

export default function AdminPage() {
  const [mode, setMode] = useState<Mode>("form");
  const [projects, setProjects] = useState<ProjectsType>([]);
  const [jsonText, setJsonText] = useState("");
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
      const parsedData = JSON.parse(jsonText);
      const response = await fetch("/api/admin/projects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parsedData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || `HTTP ${response.status}`);
      }

      const savedData = await response.json();
      setProjects(savedData);
      setStatus({ type: "success", message: "Projects saved successfully" });
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

  const addProject = () => {
    const newProject: ProjectType = {
      title: "",
      year: new Date().getFullYear(),
      links: [],
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
        <h1 className="text-3xl font-bold">Admin (local only)</h1>
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
          Form
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
          onClick={loadProjects}
          disabled={isLoading}
          className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 disabled:opacity-50"
        >
          Load
        </button>
        <button
          onClick={mode === "json" ? saveFromJson : saveFromForm}
          disabled={isLoading}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
        >
          Save
        </button>
      </div>

      {mode === "json" && (
        <div>
          <label className="block text-sm font-medium mb-2">JSON Editor:</label>
          <textarea
            value={jsonText}
            onChange={(e) => setJsonText(e.target.value)}
            className="w-full h-96 p-3 font-mono text-sm border rounded-md"
            placeholder="JSON content..."
          />
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
                      <select
                        value=""
                        onChange={(e) => {
                          if (e.target.value) {
                            updateProject(projectIndex, {
                              ...project,
                              thumb: e.target.value,
                            });
                          }
                        }}
                        className="w-full p-2 border rounded"
                      >
                        <option value="">Select from images...</option>
                        {imageData.folders.map((folder) => (
                          <optgroup key={folder} label={folder}>
                            {imageData.images[folder]?.map((imagePath) => (
                              <option key={imagePath} value={imagePath}>
                                {imagePath.split("/").pop()}
                              </option>
                            ))}
                          </optgroup>
                        ))}
                      </select>
                      {/* <input
                        type="text"
                        value={project.thumb || ""}
                        onChange={(e) =>
                          updateProject(projectIndex, { ...project, thumb: e.target.value || undefined })
                        }
                        className="w-full p-2 border rounded"
                        placeholder="/images/project_01/image.jpg"
                      /> */}
                      {project.thumb && (
                        <div className="mt-2">
                          <img
                            src={project.thumb}
                            alt="Thumbnail preview"
                            className="w-20 h-20 object-cover rounded border"
                            onError={(e) => {
                              e.currentTarget.style.display = "none";
                            }}
                          />
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
    </div>
  );
}
