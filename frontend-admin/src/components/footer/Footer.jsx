// src/components/Footer.jsx
import React from "react";
import { FaLinkedin, FaGithub } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="flex justify-center items-center p-4 bg-gray-800 text-white">
      <a
        href="https://www.linkedin.com/in/ravimakwana/"
        target="_blank"
        rel="noopener noreferrer"
        className="mx-4 hover:text-gray-400"
      >
        <FaLinkedin size={30} />
      </a>
      <a
        href="https://github.com/RaviJM"
        target="_blank"
        rel="noopener noreferrer"
        className="mx-4 hover:text-gray-400"
      >
        <FaGithub size={30} />
      </a>
    </footer>
  );
};

export default Footer;
