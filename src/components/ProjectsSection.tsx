import React, { useRef } from "react";
import { graphql, useStaticQuery } from "gatsby";
import { IGatsbyImageData } from "gatsby-plugin-image";
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

  const getProjectImage = (
    imageName?: string
  ): IGatsbyImageData | undefined => {
    if (!imageName) return undefined;
    const projectImage = images.find(
      (image) => image.node.fluid.originalName === imageName
    );
    return projectImage?.node.gatsbyImageData;
  };

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      // 1. Section index reveal
      gsap.fromTo(
        ".projects-index",
        { yPercent: 100, opacity: 0 },
        {
          yPercent: 0,
          opacity: 1,
          duration: 0.6,
          ease: "power3.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 85%",
            once: true,
          },
        }
      );

      // 2. Heading word reveal via SplitText
      const headingSplit = SplitText.create("#projects-heading", {
        type: "words",
        mask: "words",
      });
      gsap.fromTo(
        headingSplit.words,
        { yPercent: 110 },
        {
          yPercent: 0,
          duration: 0.8,
          ease: "power4.out",
          stagger: 0.03,
          scrollTrigger: {
            trigger: "#projects-heading",
            start: "top 85%",
            once: true,
          },
        }
      );

      // 3. Per-project-title word reveals
      const titleEls = containerRef.current?.querySelectorAll(".project-title");
      const titleSplits: InstanceType<typeof SplitText>[] = [];
      titleEls?.forEach((el) => {
        const split = SplitText.create(el, { type: "words", mask: "words" });
        titleSplits.push(split);
        gsap.fromTo(
          split.words,
          { yPercent: 100 },
          {
            yPercent: 0,
            duration: 0.7,
            ease: "power3.out",
            stagger: 0.03,
            scrollTrigger: {
              trigger: el,
              start: "top 88%",
              once: true,
            },
          }
        );
      });

      // 4. Per-project-image parallax
      const imageEls =
        containerRef.current?.querySelectorAll(".project-image-inner");
      imageEls?.forEach((el) => {
        gsap.fromTo(
          el,
          { yPercent: -10 },
          {
            yPercent: 10,
            ease: "none",
            scrollTrigger: {
              trigger: el.parentElement,
              start: "top bottom",
              end: "bottom top",
              scrub: 1,
            },
          }
        );
      });

      return () => {
        headingSplit.revert();
        titleSplits.forEach((s) => s.revert());
      };
    },
    { scope: containerRef }
  );

  return (
    <section
      id="projects"
      ref={containerRef}
      className="skew-on-scroll py-24 px-8 md:px-16"
      aria-labelledby="projects-heading"
    >
      {/* Section header */}
      <div className="mb-20">
        <span
          aria-hidden="true"
          className="projects-index mb-2 block font-sans text-xs font-medium uppercase tracking-[0.25em]"
          style={{ color: "#C4613A" }}
        >
          01
        </span>
        <h2
          id="projects-heading"
          className="font-display font-bold uppercase"
          style={{
            color: "#F5EDD8",
            fontSize: "clamp(2.5rem, 8vw, 9rem)",
            lineHeight: 0.9,
            letterSpacing: "-0.03em",
          }}
        >
          Projects
        </h2>
      </div>

      {/* Numbered project spreads — all projects, personal then hackathon */}
      {projectsList.map((project, i) => (
        <ProjectCard
          key={project.title}
          index={i + 1}
          title={project.title}
          description={project.description}
          tag={project.tags[0]}
          links={project.links}
          image={getProjectImage(project.image)}
          imageAlt={project.imageAlt}
        />
      ))}
    </section>
  );
};

export default Projects;
