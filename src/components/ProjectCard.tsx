import React, { useState } from "react";
import { motion } from "framer-motion";
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
import { useReducedMotion, getCardHover } from "../lib/motion";

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
} as const;

const ProjectCard: React.FC<ProjectCardProps> = ({
  title,
  description,
  links,
  image,
  imageAlt,
}) => {
  const [showModal, setShowModal] = useState(false);
  const reducedMotion = useReducedMotion();
  const cardHover = getCardHover(reducedMotion);

  const handleOpenModal = (): void => setShowModal(true);
  const handleCloseModal = (): void => setShowModal(false);

  return (
    <>
      <motion.div {...cardHover} className="h-full">
        <Card className="flex h-full flex-col overflow-hidden">
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
              <div className="absolute inset-0 flex items-center justify-center bg-black/0 transition-colors group-hover:bg-black/20">
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
      </motion.div>

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
