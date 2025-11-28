import React, { useState } from "react";
import { FaGithub, FaGamepad } from "react-icons/fa";
import { GatsbyImage, IGatsbyImageData } from "gatsby-plugin-image";
import Modal from "./Modal";
import type { ProjectLink } from "../data/projectsList";

interface ProjectProps {
  title: string;
  description: string;
  links: ProjectLink[];
  image?: IGatsbyImageData;
}

const iconMappings: Record<string, typeof FaGithub> = {
  github: FaGithub,
  game: FaGamepad,
};

const buildLinks = (links: ProjectLink[]) =>
  links.map((link) => {
    const Icon = iconMappings[link.name.toLowerCase()];
    return (
      <a
        href={link.link}
        key={link.name}
        className="mr-2"
        aria-label={link.name}
      >
        <Icon size="2em" />
      </a>
    );
  });

const Project = ({ title, description, links, image }: ProjectProps) => {
  const [show, setShow] = useState(false);

  const handleClose = (): void => setShow(false);
  const handleShow = (e: React.MouseEvent): void => {
    setShow(true);
    e.stopPropagation();
  };

  return (
    <div className="mb-4 flex flex-col rounded-sm border border-border-light p-6 dark:border-border-dark">
      {image && (
        <>
          <button
            className="mb-4 flex max-h-32 items-center justify-center overflow-hidden rounded-lg hover:bg-bg-hover-light max-md:max-h-56 dark:hover:bg-bg-hover-dark"
            onClick={handleShow}
            aria-label={title}
          >
            <GatsbyImage className="rounded-sm" image={image} alt="" />
          </button>
          <div className={show ? "visible" : "invisible"}>
            <Modal show={show} onHide={handleClose}>
              <GatsbyImage className="rounded-sm" image={image} alt="" />
            </Modal>
          </div>
        </>
      )}
      <div className="flex flex-col">
        <h3 className="font-medium">{title}</h3>
        <p className="font-light text-text-secondary dark:text-text-secondary-dark">
          {description}
        </p>
        {links.length !== 0 && (
          <div className="mt-4 flex flex-row">{buildLinks(links)}</div>
        )}
      </div>
    </div>
  );
};

export default Project;
