import React, { useRef } from "react";
import { graphql, useStaticQuery } from "gatsby";
import { IGatsbyImageData } from "gatsby-plugin-image";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { projectsList } from "../data";
import ProjectCard from "./ProjectCard";
import { gsap, ScrollTrigger, SplitText, useGSAP } from "../lib/gsap";

interface ImageNode {
  node: {
    id: string;
    gatsbyImageData: IGatsbyImageData;
    fluid: {
      originalName: string;
    };
  };
}

const Projects: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  const data = useStaticQuery(graphql`
    query {
      image: allImageSharp {
        edges {
          node {
            id
            gatsbyImageData(
              placeholder: DOMINANT_COLOR
              height: 500
              quality: 80
              formats: [AUTO, WEBP, AVIF]
            )
            fluid {
              originalName
            }
          }
        }
      }
    }
  `);

  const images: ImageNode[] = data.image.edges;

  const personalProjects = projectsList.filter((project) =>
    project.tags.includes("personal")
  );
  const hackathonProjects = projectsList.filter((project) =>
    project.tags.includes("hackathon")
  );

  const getProjectImage = (
    imageName?: string
  ): IGatsbyImageData | undefined => {
    if (!imageName) return undefined;
    const projectImage = images.find(
      (image) => image.node.fluid.originalName === imageName
    );
    return projectImage?.node.gatsbyImageData;
  };

  // ── Scroll-triggered reveals ────────────────────────────────────
  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      // Section index "01" reveal
      gsap.set(".projects-index", { yPercent: 100, opacity: 0 });
      gsap.to(".projects-index", {
        yPercent: 0,
        opacity: 1,
        duration: 0.6,
        ease: "power3.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 85%",
          once: true,
        },
      });

      // Heading word reveal via SplitText + mask
      const split = SplitText.create("#projects-heading", {
        type: "words",
        mask: "words",
      });
      gsap.set(split.words, { yPercent: 110 });
      gsap.to(split.words, {
        yPercent: 0,
        duration: 0.8,
        ease: "power4.out",
        stagger: 0.03,
        scrollTrigger: {
          trigger: "#projects-heading",
          start: "top 85%",
          once: true,
        },
      });

      // Tabs fade in
      gsap.set(".projects-tabs", { opacity: 0, y: 20 });
      gsap.to(".projects-tabs", {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".projects-tabs",
          start: "top 90%",
          once: true,
        },
      });

      // Project cards — batch entrance (more performant than one ST per card)
      ScrollTrigger.batch(".project-card-wrapper", {
        onEnter: (batch) =>
          gsap.from(batch, {
            opacity: 0,
            y: 60,
            scale: 0.95,
            stagger: 0.1,
            duration: 0.7,
            ease: "power3.out",
            onComplete: () => {
              gsap.set(batch, { clearProps: "all" });
            },
          }),
        start: "top 88%",
        once: true,
      });

      return () => {
        split.revert();
      };
    },
    { scope: containerRef }
  );

  return (
    <section
      id="projects"
      ref={containerRef}
      className="py-24 px-4"
      aria-labelledby="projects-heading"
    >
      <div className="mx-auto max-w-6xl">
        <div className="mb-8">
          {/* Section index number */}
          <span
            className="projects-index mb-2 block font-sans text-xs font-medium uppercase tracking-[0.25em] text-accent-orange dark:text-accent-orange-dark"
            aria-hidden="true"
          >
            01
          </span>
          {/* Oversized editorial heading */}
          <div className="overflow-hidden">
            <h2
              id="projects-heading"
              className="font-display font-bold uppercase text-text-primary dark:text-text-primary-dark"
              style={{
                fontSize: "clamp(2.5rem, 8vw, 9rem)",
                lineHeight: 0.9,
                letterSpacing: "-0.03em",
              }}
            >
              Projects
            </h2>
          </div>
        </div>

        <Tabs defaultValue="personal" className="projects-tabs w-full">
          <div>
            <TabsList className="mb-8" aria-label="Project categories">
              <TabsTrigger value="personal" aria-label="View personal projects">
                Personal
              </TabsTrigger>
              <TabsTrigger
                value="hackathon"
                aria-label="View hackathon projects"
              >
                Hackathon
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="personal">
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {personalProjects.map((project) => (
                <div key={project.title} className="project-card-wrapper">
                  <ProjectCard
                    title={project.title}
                    description={project.description}
                    links={project.links}
                    image={getProjectImage(project.image)}
                    imageAlt={project.imageAlt}
                  />
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="hackathon">
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {hackathonProjects.map((project) => (
                <div key={project.title} className="project-card-wrapper">
                  <ProjectCard
                    title={project.title}
                    description={project.description}
                    links={project.links}
                    image={getProjectImage(project.image)}
                    imageAlt={project.imageAlt}
                  />
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
};

export default Projects;
