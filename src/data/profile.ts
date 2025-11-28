import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";
import { IconType } from "react-icons";

export interface SocialLink {
  name: string;
  url: string;
  ariaLabel: string;
  icon: IconType;
}

export interface Profile {
  name: string;
  firstName: string;
  role: string;
  location: string;
  email: string;
  socialLinks: SocialLink[];
}

export const profile: Profile = {
  name: "Noel Rajan",
  firstName: "Noel",
  role: "Software Engineer",
  location: "United Kingdom",
  email: "hello@noelrajan.com",
  socialLinks: [
    {
      name: "GitHub",
      url: "https://github.com/FireRedNinja",
      ariaLabel: "Visit my GitHub profile to see my open source projects",
      icon: FaGithub,
    },
    {
      name: "LinkedIn",
      url: "https://www.linkedin.com/in/noel-rajan/",
      ariaLabel: "Connect with me on LinkedIn for professional networking",
      icon: FaLinkedin,
    },
  ],
};

export default profile;
