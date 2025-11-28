// Data layer exports
// All content data is centralized here for easy updates

export { profile, type Profile, type SocialLink } from "./profile";
export { skills, skillCategories, type Skill } from "./skills";
export {
  default as projectsList,
  type Project,
  type ProjectLink,
} from "./projectsList";

// Navigation items for the top nav
export const navItems = [
  {
    label: "Projects",
    href: "#projects",
    ariaLabel: "Navigate to projects section",
  },
  { label: "Skills", href: "#skills", ariaLabel: "Navigate to skills section" },
] as const;

export type NavItem = (typeof navItems)[number];
