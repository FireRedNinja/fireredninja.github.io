import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub, faItchIo } from '@fortawesome/free-brands-svg-icons';
import { GatsbyImage } from 'gatsby-plugin-image';
import Modal from './modal';

const iconMappings = {
  github: faGithub,
  'itch.io': faItchIo,
};

const buildLinks = (links) =>
  links.map((link) => (
    <button
      href={link.link}
      key={link.name}
      className="mr-2"
      aria-label={link.name}
    >
      <FontAwesomeIcon icon={iconMappings[link.name.toLowerCase()]} size="2x" />
    </button>
  ));

const Project = (props) => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = (e) => {
    setShow(true);
    e.stopPropagation();
  };
  return (
    <div className="flex flex-col mb-4 border-solid border rounded p-6">
      {props.image && (
        <>
          <button
            className="flex justify-center items-center rounded overflow-hidden max-h-32 mb-4 md:max-h-56 hover:bg-gray-100 active:bg-green-700"
            onClick={handleShow}
            aria-label={props.title}
          >
            <GatsbyImage className="rounded" image={props.image} alt="" />
          </button>
          <div className={show ? 'visible' : 'hidden'}>
            <Modal show={show} onHide={handleClose}>
              <GatsbyImage className="rounded" image={props.image} alt="" />
            </Modal>
          </div>
        </>
      )}
      <div className="flex flex-col">
        <div className="flex flex-col">
          <h3 className="font-medium">{props.title}</h3>
          <p className="font-light">{props.description}</p>
        </div>
        {props.links.length !== 0 && (
          <div className="flex flex-row mt-4">{buildLinks(props.links)}</div>
        )}
      </div>
    </div>
  );
};

export default Project;
