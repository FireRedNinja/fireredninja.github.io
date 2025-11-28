import React, { type ReactNode } from "react";
import Header from "./Header";
import Footer from "./Footer";

interface LayoutProps {
  header?: boolean;
  footer?: boolean;
  children: ReactNode;
}

const Layout = ({ header = true, footer = true, children }: LayoutProps) => {
  return (
    <div className="relative min-h-screen w-full dark:bg-black">
      {header && <Header />}
      <div className="relative -top-8 -mb-8 h-8 w-full rounded-t-[2rem] bg-white md:-top-20 md:-mb-20 md:h-20 md:rounded-t-[5rem] dark:bg-black" />
      <main className="flex justify-center px-8 pb-8 md:px-20 md:pb-20 dark:bg-black">
        <div className="sm:max-w-screen-sm md:max-w-screen-md lg:max-w-screen-lg">
          {children}
        </div>
      </main>
      {footer && <Footer />}
    </div>
  );
};

export default Layout;
