import {
  SiTypescript,
  SiJavascript,
  SiReact,
  SiNextdotjs,
  SiGatsby,
  SiNodedotjs,
  SiPython,
  SiTailwindcss,
  SiPostgresql,
  SiDocker,
  SiGit,
  SiAmazonwebservices,
} from "react-icons/si";
import { IconType } from "react-icons";

export interface Skill {
  name: string;
  icon: IconType;
  description: string;
  category: "language" | "frontend" | "backend" | "tools";
}

export const skills: Skill[] = [
  // Languages
  {
    name: "TypeScript",
    icon: SiTypescript,
    description: "Strongly typed JavaScript for scalable applications",
    category: "language",
  },
  {
    name: "JavaScript",
    icon: SiJavascript,
    description: "Dynamic scripting language for web development",
    category: "language",
  },
  {
    name: "Python",
    icon: SiPython,
    description: "Versatile language for scripting and data analysis",
    category: "language",
  },
  // Frontend
  {
    name: "React",
    icon: SiReact,
    description: "Component-based UI library for building interfaces",
    category: "frontend",
  },
  {
    name: "Next.js",
    icon: SiNextdotjs,
    description: "React framework for production-grade applications",
    category: "frontend",
  },
  {
    name: "Gatsby",
    icon: SiGatsby,
    description: "Static site generator with React and GraphQL",
    category: "frontend",
  },
  {
    name: "Tailwind CSS",
    icon: SiTailwindcss,
    description: "Utility-first CSS framework for rapid UI development",
    category: "frontend",
  },
  // Backend
  {
    name: "Node.js",
    icon: SiNodedotjs,
    description: "JavaScript runtime for server-side development",
    category: "backend",
  },
  // Tools
  {
    name: "Docker",
    icon: SiDocker,
    description: "Containerization platform for consistent deployments",
    category: "tools",
  },
  {
    name: "Git",
    icon: SiGit,
    description: "Version control system for tracking code changes",
    category: "tools",
  },
  {
    name: "AWS",
    icon: SiAmazonwebservices,
    description: "Cloud computing services for scalable infrastructure",
    category: "tools",
  },
];

export const skillCategories = [
  { id: "language", label: "Languages" },
  { id: "frontend", label: "Frontend" },
  { id: "backend", label: "Backend" },
  { id: "tools", label: "Tools" },
] as const;

export default skills;
