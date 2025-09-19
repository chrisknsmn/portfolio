import {
  Home,
  User,
  Briefcase,
  Mail,
  Github,
  Linkedin,
} from "lucide-react";

export const menuSections = [
  {
    title: "Navigation",
    items: [
      { icon: Home, label: "Home", href: "/" },
      { icon: User, label: "About", href: "#about" },
      { icon: Briefcase, label: "Projects", href: "#projects" },
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
    ],
  },
];