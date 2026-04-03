import React, { useState } from "react";
import { Github, Gamepad2, ExternalLink } from "lucide-react";
import { GatsbyImage, IGatsbyImageData } from "gatsby-plugin-image";
import Modal from "./Modal";
import type { ProjectLink } from "../data/projectsList";

interface ProjectCardProps {
  index: number;
  title: string;
  description: string;
  tag: "personal" | "hackathon";
  links: ProjectLink[];
  image?: IGatsbyImageData;
  imageAlt?: string;
}

const iconMappings = {
  github: Github,
  game: Gamepad2,
  "live site": ExternalLink,
} as const;

const ProjectCard: React.FC<ProjectCardProps> = ({
  index,
  title,
  description,
  tag,
  links,
  image,
  imageAlt,
}) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <article className="project-entry mb-20 md:mb-32">
      {/* Numbered rule */}
      <div className="flex items-center gap-4 mb-6">
        <span
          className="font-sans text-sm tabular-nums"
          style={{ color: "rgba(245,237,216,0.35)" }}
        >
          {String(index).padStart(2, "0")}
        </span>
        <div
          className="flex-1"
          style={{ height: "1px", backgroundColor: "rgba(245,237,216,0.15)" }}
        />
      </div>

      {/* Title row */}
      <div className="mb-4 flex flex-wrap items-baseline gap-4">
        <h3
          className="project-title font-display font-bold uppercase"
          style={{
            color: "#F5EDD8",
            fontSize: "clamp(1.5rem, 4vw, 3.5rem)",
            lineHeight: 0.95,
            letterSpacing: "-0.02em",
          }}
        >
          {title}
        </h3>
        <span
          style={{
            fontFamily: "var(--font-editorial)",
            fontStyle: "italic",
            color: "#C4613A",
            fontSize: "0.95rem",
          }}
        >
          {tag}
        </span>
      </div>

      {/* Description */}
      <p
        className="mb-6 font-sans"
        style={{
          color: "rgba(245,237,216,0.65)",
          maxWidth: "60ch",
          fontSize: "1rem",
          lineHeight: 1.7,
        }}
      >
        {description}
      </p>

      {/* Links */}
      {links.length > 0 && (
        <div className="mb-8 flex flex-wrap gap-3">
          {links.map((link) => {
            const Icon =
              iconMappings[
                link.name.toLowerCase() as keyof typeof iconMappings
              ];
            return (
              <a
                key={link.name}
                href={link.link}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={link.ariaLabel}
                className="inline-flex items-center gap-2 rounded-full px-5 py-2 text-sm font-sans transition-colors duration-200"
                style={{
                  color: "#F5EDD8",
                  border: "1px solid rgba(245,237,216,0.25)",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.backgroundColor =
                    "rgba(245,237,216,0.08)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.backgroundColor = "";
                }}
              >
                {Icon && <Icon className="h-3.5 w-3.5" aria-hidden="true" />}
                {link.name}
              </a>
            );
          })}
        </div>
      )}

      {/* Full-width image with parallax */}
      {image && (
        <>
          <button
            onClick={() => setShowModal(true)}
            className="project-image-container block w-full overflow-hidden rounded-sm cursor-pointer"
            style={{ aspectRatio: "16/9", position: "relative" }}
            aria-label={`View larger image of ${title}`}
          >
            <div
              className="project-image-inner w-full"
              style={{ height: "120%", marginTop: "-5%" }}
            >
              <GatsbyImage
                image={image}
                alt={imageAlt || `Screenshot of ${title}`}
                className="h-full w-full"
                style={{ objectFit: "cover" }}
              />
            </div>
          </button>
          {showModal && (
            <Modal show={showModal} onHide={() => setShowModal(false)} title={title}>
              <GatsbyImage
                image={image}
                alt={imageAlt || `Full size screenshot of ${title}`}
                className="rounded-lg"
              />
            </Modal>
          )}
        </>
      )}
    </article>
  );
};

export default ProjectCard;
