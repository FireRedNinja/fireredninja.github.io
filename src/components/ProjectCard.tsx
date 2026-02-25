import React, { useRef, useState } from "react";
import { Github, Gamepad2, ExternalLink } from "lucide-react";
import { GatsbyImage, IGatsbyImageData } from "gatsby-plugin-image";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "./ui/card";
import { Button } from "./ui/button";
import Modal from "./Modal";
import type { ProjectLink } from "../data/projectsList";

interface ProjectCardProps {
  title: string;
  description: string;
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
  title,
  description,
  links,
  image,
  imageAlt,
}) => {
  const [showModal, setShowModal] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const handleOpenModal = (): void => setShowModal(true);
  const handleCloseModal = (): void => setShowModal(false);

  return (
    <>
      <div
        ref={cardRef}
        className="h-full transition-transform duration-200 hover:-translate-y-1.5 hover:shadow-[0_20px_40px_-12px_rgba(0,0,0,0.2)]"
      >
        <Card className="group flex h-full flex-col overflow-hidden">
          {/* Image */}
          {image && (
            <button
              onClick={handleOpenModal}
              className="group relative aspect-video w-full overflow-hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-orange focus-visible:ring-offset-2 dark:focus-visible:ring-accent-orange-dark"
              aria-label={`View larger image of ${title}`}
            >
              <GatsbyImage
                image={image}
                alt={imageAlt || `Screenshot of ${title} project`}
                className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
              />

              {/* Caption sweep overlay */}
              <div
                className="absolute inset-x-0 bottom-0 translate-y-full bg-gradient-to-t from-black/80 via-black/50 to-transparent px-4 pb-4 pt-12 transition-transform duration-300 group-hover:translate-y-0"
                aria-hidden="true"
              >
                <p className="line-clamp-2 text-left text-sm text-white/90">
                  {description}
                </p>
              </div>

              {/* Zoom icon hint */}
              <div className="absolute inset-0 flex items-center justify-center bg-black/0 transition-colors group-hover:bg-black/10">
                <ExternalLink
                  className="h-8 w-8 text-white opacity-0 transition-opacity group-hover:opacity-100"
                  aria-hidden="true"
                />
              </div>
            </button>
          )}

          <CardHeader>
            <CardTitle>{title}</CardTitle>
          </CardHeader>

          <CardContent className="flex-1">
            <CardDescription className="line-clamp-4">
              {description}
            </CardDescription>
          </CardContent>

          {links.length > 0 && (
            <CardFooter className="gap-2">
              {links.map((link) => {
                const Icon =
                  iconMappings[
                    link.name.toLowerCase() as keyof typeof iconMappings
                  ];
                return (
                  <Button
                    key={link.name}
                    variant="outline"
                    size="sm"
                    asChild
                    className="gap-2"
                  >
                    <a
                      href={link.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={link.ariaLabel}
                    >
                      {Icon && <Icon className="h-4 w-4" aria-hidden="true" />}
                      {link.name}
                    </a>
                  </Button>
                );
              })}
            </CardFooter>
          )}
        </Card>
      </div>

      {/* Modal */}
      {image && showModal && (
        <Modal show={showModal} onHide={handleCloseModal} title={title}>
          <GatsbyImage
            image={image}
            alt={imageAlt || `Full size screenshot of ${title} project`}
            className="rounded-lg"
          />
        </Modal>
      )}
    </>
  );
};

export default ProjectCard;
