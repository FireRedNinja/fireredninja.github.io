import React from "react";
import { FaGithub, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="flex w-full content-center justify-center bg-accent-orange p-8 text-white dark:bg-accent-navy md:p-20">
      <div className="flex w-64 justify-evenly sm:max-w-screen-sm md:max-w-screen-md lg:max-w-screen-lg">
        <a
          href="https://github.com/FireRedNinja"
          className="mx-2 text-inherit no-underline"
          aria-label="GitHub Profile"
        >
          <div className="flex flex-col items-center">
            <FaGithub size="3em" />
          </div>
        </a>
        <a
          href="https://www.linkedin.com/in/noelrajan31"
          className="mx-2 text-inherit no-underline"
          aria-label="LinkedIn Profile"
        >
          <div className="flex flex-col items-center">
            <FaLinkedin size="3em" />
          </div>
        </a>
      </div>
    </footer>
  );
};

export default Footer;
