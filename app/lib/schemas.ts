import { z } from "zod";

// Zod schemas
const Link = z.object({
  label: z.string().min(1, "Label is required"),
  href: z.string().url("Must be a valid URL"),
});

export const Category = z.object({
  id: z.string().min(1, "Category ID is required"),
  name: z.string().min(1, "Category name is required"),
  icon: z.string().optional(),
});

export const Project = z.object({
  title: z.string().min(1, "Title is required"),
  year: z.number().int().min(1900).max(2100),
  links: z.array(Link).default([]),
  thumb: z.string().optional(),
  summary: z.string().optional(),
  categories: z.array(z.string()).default([]), // Array of category IDs
});

export const Projects = z.array(Project);

export const Categories = z.array(Category);

export type LinkType = z.infer<typeof Link>;
export type CategoryType = z.infer<typeof Category>;
export type ProjectType = z.infer<typeof Project>;
export type ProjectsType = z.infer<typeof Projects>;
export type CategoriesType = z.infer<typeof Categories>;