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
  SiRedux,
  SiSass,
  SiStorybook,
  SiJest,
  SiCypress,
  SiVite,
  SiReactrouter,
  SiRedis,
  SiKubernetes,
  SiTerraform,
  SiGithub,
  SiGithubactions,
  SiNewrelic,
  SiSonarqube,
  SiElasticsearch,
  SiNx,
  SiPercy,
} from "react-icons/si";
import { FaJava } from "react-icons/fa";
import { IoAccessibility } from "react-icons/io5";
import { IconType } from "react-icons";

export interface Skill {
  name: string;
  icon: IconType;
  description: string;
  category:
    | "language"
    | "frontend"
    | "backend"
    | "infrastructure"
    | "testing"
    | "tools";
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
  {
    name: "Java",
    icon: FaJava,
    description: "Enterprise-grade language for platform development",
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
    name: "Redux",
    icon: SiRedux,
    description: "Predictable state management for JavaScript apps",
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
    name: "React Router",
    icon: SiReactrouter,
    description: "Declarative routing for React applications",
    category: "frontend",
  },
  {
    name: "Vite",
    icon: SiVite,
    description: "Next-generation frontend build tool",
    category: "frontend",
  },
  {
    name: "Nx",
    icon: SiNx,
    description: "Smart monorepo build system and dev tools",
    category: "frontend",
  },
  {
    name: "Sass",
    icon: SiSass,
    description: "CSS preprocessor for maintainable stylesheets",
    category: "frontend",
  },
  {
    name: "Tailwind CSS",
    icon: SiTailwindcss,
    description: "Utility-first CSS framework for rapid UI development",
    category: "frontend",
  },
  {
    name: "Storybook",
    icon: SiStorybook,
    description: "UI component explorer for design systems",
    category: "frontend",
  },

  // Backend
  {
    name: "Node.js",
    icon: SiNodedotjs,
    description: "JavaScript runtime for server-side development",
    category: "backend",
  },
  {
    name: "PostgreSQL",
    icon: SiPostgresql,
    description: "Advanced open-source relational database",
    category: "backend",
  },
  {
    name: "Redis",
    icon: SiRedis,
    description: "In-memory data store for caching and sessions",
    category: "backend",
  },
  {
    name: "Elasticsearch",
    icon: SiElasticsearch,
    description: "Distributed search and analytics engine",
    category: "backend",
  },

  // Infrastructure
  {
    name: "AWS",
    icon: SiAmazonwebservices,
    description: "Cloud computing services for scalable infrastructure",
    category: "infrastructure",
  },
  {
    name: "Docker",
    icon: SiDocker,
    description: "Containerization platform for consistent deployments",
    category: "infrastructure",
  },
  {
    name: "Kubernetes",
    icon: SiKubernetes,
    description: "Container orchestration for automated deployment",
    category: "infrastructure",
  },
  {
    name: "Terraform",
    icon: SiTerraform,
    description: "Infrastructure as code for cloud provisioning",
    category: "infrastructure",
  },
  {
    name: "GitHub Actions",
    icon: SiGithubactions,
    description: "CI/CD automation integrated with GitHub",
    category: "infrastructure",
  },

  // Testing
  {
    name: "Jest",
    icon: SiJest,
    description: "JavaScript testing framework for unit tests",
    category: "testing",
  },
  {
    name: "Cypress",
    icon: SiCypress,
    description: "End-to-end testing framework with visual testing",
    category: "testing",
  },
  {
    name: "Percy",
    icon: SiPercy,
    description: "Visual testing and review platform",
    category: "testing",
  },
  {
    name: "Jest Axe",
    icon: IoAccessibility,
    description: "Accessibility testing for Jest",
    category: "testing",
  },
  // Tools
  {
    name: "Git",
    icon: SiGit,
    description: "Version control system for tracking code changes",
    category: "tools",
  },
  {
    name: "GitHub",
    icon: SiGithub,
    description: "Code hosting and collaboration platform",
    category: "tools",
  },
  {
    name: "New Relic",
    icon: SiNewrelic,
    description: "Application performance monitoring and observability",
    category: "tools",
  },
  {
    name: "SonarQube",
    icon: SiSonarqube,
    description: "Code quality and security analysis platform",
    category: "tools",
  },
];

export const skillCategories = [
  { id: "language", label: "Languages" },
  { id: "frontend", label: "Frontend" },
  { id: "backend", label: "Backend" },
  { id: "infrastructure", label: "Infrastructure" },
  { id: "testing", label: "Testing" },
  { id: "tools", label: "Tools" },
] as const;

export default skills;
