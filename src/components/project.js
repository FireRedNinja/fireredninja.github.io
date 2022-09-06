import React, { useState } from 'react';
import { FaGithub, FaGamepad } from 'react-icons/fa';
import { GatsbyImage } from 'gatsby-plugin-image';
import Modal from './modal';

import * as STYLES from './project.module.scss';

const iconMappings = {
  github: FaGithub,
  game: FaGamepad,
};

const buildLinks = (links) =>
  links.map((link) => {
    const Icon = iconMappings[link.name.toLowerCase()];
    return (
      <a
        href={link.link}
        key={link.name}
        className={STYLES.Content__links__icon}
        // aria-label={link.name}
      >
        <Icon size="2em" />
      </a>
    );
  });

const Project = (props) => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = (e) => {
    setShow(true);
    e.stopPropagation();
  };
  return (
    <div className={STYLES.Project}>
      {props.image && (
        <>
          <button
            className={STYLES.Project__imgButton}
            onClick={handleShow}
            aria-label={props.title}
          >
            <GatsbyImage className={STYLES.Image} image={props.image} alt="" />
          </button>
          <div className={show ? STYLES.Popup__visible : STYLES.Popup__hidden}>
            <Modal show={show} onHide={handleClose}>
              <GatsbyImage
                className={STYLES.Image}
                image={props.image}
                alt=""
              />
            </Modal>
          </div>
        </>
      )}
      <div className={STYLES.Content}>
        <h3>{props.title}</h3>
        <p>{props.description}</p>
        {props.links.length !== 0 && (
          <div className={STYLES.Content__links}>{buildLinks(props.links)}</div>
        )}
      </div>
    </div>
  );
};

export default Project;
