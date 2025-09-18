import { z } from "zod";

// Zod schemas
const Link = z.object({
  label: z.string().min(1, "Label is required"),
  href: z.string().url("Must be a valid URL"),
});

export const Project = z.object({
  title: z.string().min(1, "Title is required"),
  year: z.number().int().min(1900).max(2100),
  links: z.array(Link).default([]),
  thumb: z.string().optional(),
  summary: z.string().optional(),
});

export const Projects = z.array(Project);

export type ProjectType = z.infer<typeof Project>;
export type ProjectsType = z.infer<typeof Projects>;