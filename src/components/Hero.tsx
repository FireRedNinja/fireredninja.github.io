import React from "react";
import { ArrowDown } from "lucide-react";
import { Button } from "./ui/button";
import { profile } from "../data";

const Hero: React.FC = () => {
  const handleScrollToProjects = () => {
    const element = document.getElementById("projects");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const nameWords = profile.name.split(" ");
  const roleText = profile.role;

  return (
    <section
      id="hero"
      className="relative flex h-screen flex-col justify-center overflow-hidden pt-24"
      aria-labelledby="hero-heading"
    >
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-8 lg:px-12">
        {/* Role label — appears above name as a typographic anchor */}
        <div className="mb-4 overflow-hidden">
          <p className="font-sans text-xs font-medium uppercase tracking-[0.25em] text-text-secondary dark:text-text-secondary-dark sm:text-sm">
            {roleText}
          </p>
        </div>

        {/* Name — stacked words */}
        <h1
          id="hero-heading"
          className="mb-8 w-full font-display font-bold uppercase"
          style={{
            fontSize: "clamp(3rem, min(31vw, 38vh), 9999px)",
            lineHeight: 0.88,
            letterSpacing: "-0.03em",
          }}
        >
          {nameWords.map((word, wi) => {
            const isStroke = wi % 2 !== 0;
            const wordClass = isStroke
              ? "text-text-primary dark:text-text-primary-dark text-stroke"
              : "text-text-primary dark:text-text-primary-dark";

            return (
              <span key={wi} className="block whitespace-nowrap">
                {word.split("").map((char, ci) => {
                  const key = `${wi}-${ci}`;
                  return (
                    <span
                      key={key}
                      style={{ display: "inline-block", overflow: "hidden" }}
                    >
                      <span
                        className={wordClass}
                        style={{ display: "inline-block" }}
                        aria-hidden="true"
                      >
                        {char}
                      </span>
                    </span>
                  );
                })}
                {/* Screen-reader-only full word so assistive tech reads "Noel Rajan" */}
                <span className="sr-only">{word}</span>
              </span>
            );
          })}
        </h1>

        {/* CTA Button */}
        <div className="flex justify-center">
          <Button
            size="lg"
            onClick={handleScrollToProjects}
            className="group gap-2"
            aria-label="View my projects - scroll to projects section"
          >
            View My Work
            <span>
              <ArrowDown
                className="h-5 w-5 transition-transform group-hover:translate-y-1"
                aria-hidden="true"
              />
            </span>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
