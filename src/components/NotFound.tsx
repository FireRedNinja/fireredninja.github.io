import React from "react";
import { Link } from "gatsby";
import svg404 from "../images/undraw_page_not_found_su7k.svg";

const NotFound = () => {
  return (
    <div className="mx-auto flex w-full flex-col items-center justify-center py-24 sm:max-w-screen-sm">
      <div className="flex content-center">
        <img alt="404 - Page not found" src={svg404} />
      </div>
      <Link to="/" className="mt-8 w-full">
        <button
          className="w-full rounded-sm bg-accent-blue px-4 py-2 text-center font-bold text-white hover:bg-accent-blue-hover"
          aria-label="Go back home"
        >
          Go Back Home
        </button>
      </Link>
    </div>
  );
};

export default NotFound;
