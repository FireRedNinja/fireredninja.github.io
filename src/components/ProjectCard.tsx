import React, { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";
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
import { useReducedMotion } from "../lib/motion";

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
  const [isHovered, setIsHovered] = useState(false);
  const [isTouch, setIsTouch] = useState(false);
  const reducedMotion = useReducedMotion();
  const cardRef = useRef<HTMLDivElement>(null);

  // Detect touch devices after mount (SSR safe)
  useEffect(() => {
    setIsTouch(window.matchMedia("(hover: none)").matches);
  }, []);

  // 3D tilt motion values
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const springRotateX = useSpring(rotateX, { stiffness: 300, damping: 25 });
  const springRotateY = useSpring(rotateY, { stiffness: 300, damping: 25 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (reducedMotion || isTouch || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const maxDeg = 8;
    rotateY.set(((e.clientX - cx) / (rect.width / 2)) * maxDeg);
    rotateX.set(-((e.clientY - cy) / (rect.height / 2)) * maxDeg);
  };

  const handleMouseLeave = () => {
    rotateX.set(0);
    rotateY.set(0);
    setIsHovered(false);
  };

  const handleOpenModal = (): void => setShowModal(true);
  const handleCloseModal = (): void => setShowModal(false);

  return (
    <>
      <motion.div
        ref={cardRef}
        className="h-full"
        style={{
          perspective: 1000,
          rotateX: reducedMotion || isTouch ? 0 : springRotateX,
          rotateY: reducedMotion || isTouch ? 0 : springRotateY,
          transformStyle: "preserve-3d",
        }}
        whileHover={
          reducedMotion
            ? {}
            : {
                y: -6,
                boxShadow: "0 20px 40px -12px rgba(0,0,0,0.2)",
                transition: { type: "spring", stiffness: 400, damping: 25 },
              }
        }
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
      >
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

              {/* Caption sweep overlay */}
              <motion.div
                className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent px-4 pb-4 pt-12"
                initial={{ y: "100%" }}
                animate={{
                  y: isHovered && !isTouch && !reducedMotion ? 0 : "100%",
                }}
                transition={{ type: "spring", stiffness: 300, damping: 28 }}
                aria-hidden="true"
              >
                <p className="line-clamp-2 text-left text-sm text-white/90">
                  {description}
                </p>
              </motion.div>

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
