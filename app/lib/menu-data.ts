import { Home, Briefcase, GraduationCap, Mail, Github, Linkedin } from "lucide-react";

export const menuSections = [
  {
    title: "Navigation",
    items: [
      { icon: Home, label: "Home", href: "/" },
      { icon: Briefcase, label: "Projects", href: "#projects" },
      { icon: GraduationCap, label: "Experience", href: "#experience" },
      { icon: Mail, label: "Contact", href: "#contact" },
    ],
  },
  {
    title: "Resources",
    items: [{ icon: Mail, label: "Resume", href: "/kinsman_resume.pdf" }],
  },
  {
    title: "Social",
    items: [
      { icon: Mail, label: "Email", href: "mailto:chrisknsmn@gmail.com" },
      {
        icon: Github,
        label: "GitHub",
        href: "https://github.com/chrisknsmn",
      },
      {
        icon: Linkedin,
        label: "LinkedIn",
        href: "https://linkedin.com/in/chrisknsmn",
      },
      {
        icon: Linkedin,
        label: "Figma",
        href: "https://www.figma.com/@chrisknsmn",
      },
    ],
  },
];
