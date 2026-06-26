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

const tagColor = {
  personal: "#C8F135",
  hackathon: "rgba(240,240,238,0.4)",
};

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
    <article
      className="project-entry mb-24 md:mb-40"
      style={{ borderTop: "1px solid rgba(240,240,238,0.07)", paddingTop: "clamp(1.5rem, 3vw, 3rem)" }}
    >
      {/* Index + tag */}
      <div className="project-meta flex items-baseline justify-between mb-5" style={{ opacity: 0 }}>
        <span
          className="font-sans tabular-nums"
          style={{ fontSize: "0.65rem", color: "rgba(240,240,238,0.22)", letterSpacing: "0.14em" }}
        >
          {String(index).padStart(2, "0")}
        </span>
        <span
          className="font-sans uppercase"
          style={{ fontSize: "0.6rem", letterSpacing: "0.2em", color: tagColor[tag] }}
        >
          {tag}
        </span>
      </div>

      {/* Title */}
      <div className="mb-6 overflow-hidden">
        <h3
          className="project-title font-display font-black uppercase"
          style={{
            color: "#F0F0EE",
            fontSize: "clamp(2rem, 5.5vw, 6.5rem)",
            lineHeight: 0.9,
            letterSpacing: "-0.03em",
          }}
        >
          {title}
        </h3>
      </div>

      {/* Description + links */}
      <div
        className="project-meta flex flex-col gap-4 mb-8 md:flex-row md:items-start md:justify-between"
        style={{ opacity: 0 }}
      >
        <p
          className="font-sans"
          style={{
            color: "rgba(240,240,238,0.48)",
            maxWidth: "55ch",
            fontSize: "clamp(0.82rem, 1.05vw, 0.95rem)",
            lineHeight: 1.8,
          }}
        >
          {description}
        </p>

        {links.length > 0 && (
          <div className="flex flex-wrap gap-2 md:flex-shrink-0">
            {links.map(link => {
              const Icon = iconMappings[link.name.toLowerCase() as keyof typeof iconMappings];
              return (
                <a
                  key={link.name}
                  href={link.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={link.ariaLabel}
                  className="inline-flex items-center gap-2 px-4 py-2 font-sans font-medium transition-all duration-200"
                  style={{
                    fontSize: "0.7rem",
                    color: "#F0F0EE",
                    border: "1px solid rgba(240,240,238,0.14)",
                    borderRadius: "2px",
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                  }}
                  onMouseEnter={e => {
                    const el = e.currentTarget as HTMLElement;
                    el.style.borderColor = "#C8F135";
                    el.style.color = "#C8F135";
                  }}
                  onMouseLeave={e => {
                    const el = e.currentTarget as HTMLElement;
                    el.style.borderColor = "rgba(240,240,238,0.14)";
                    el.style.color = "#F0F0EE";
                  }}
                >
                  {Icon && <Icon className="h-3 w-3 flex-shrink-0" aria-hidden="true" />}
                  {link.name}
                </a>
              );
            })}
          </div>
        )}
      </div>

      {/* Image */}
      {image && (
        <>
          <button
            onClick={() => setShowModal(true)}
            className="project-image-container block w-full overflow-hidden cursor-pointer group"
            style={{ aspectRatio: "16/9", position: "relative", borderRadius: "2px" }}
            aria-label={`View larger image of ${title}`}
          >
            <div className="project-image-inner w-full" style={{ height: "120%", marginTop: "-5%" }}>
              <GatsbyImage
                image={image}
                alt={imageAlt || `Screenshot of ${title}`}
                className="h-full w-full"
                imgStyle={{ objectFit: "cover", filter: "grayscale(15%) contrast(1.04)" }}
              />
            </div>
            <div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              style={{ backgroundColor: "rgba(200,241,53,0.035)" }}
              aria-hidden="true"
            />
          </button>
          {showModal && (
            <Modal show={showModal} onHide={() => setShowModal(false)} title={title}>
              <GatsbyImage
                image={image}
                alt={imageAlt || `Full size screenshot of ${title}`}
                className="rounded"
              />
            </Modal>
          )}
        </>
      )}
    </article>
  );
};

export default ProjectCard;
