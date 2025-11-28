import React from "react";

const Header = () => {
  return (
    <header className="flex content-center justify-center bg-accent-orange pb-16 pt-8 text-white dark:bg-accent-navy md:pb-40 md:pt-20">
      <div className="flex flex-col">
        <h1 className="flex flex-none justify-center pb-2 text-5xl font-bold leading-none">
          Noel Rajan
        </h1>
        <span className="flex flex-none justify-center text-2xl font-extralight leading-8">
          Software Engineer
        </span>
      </div>
    </header>
  );
};

export default Header;
