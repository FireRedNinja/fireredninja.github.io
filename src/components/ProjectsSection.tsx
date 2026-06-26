import React, { useRef } from "react";
import { graphql, useStaticQuery } from "gatsby";
import { IGatsbyImageData } from "gatsby-plugin-image";
import { projectsList } from "../data";
import ProjectCard from "./ProjectCard";
import { gsap, SplitText, useGSAP } from "../lib/gsap";

interface ImageNode {
  node: {
    id: string;
    gatsbyImageData: IGatsbyImageData;
    fluid: { originalName: string };
  };
}

const ProjectsSection: React.FC = () => {
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
            fluid { originalName }
          }
        }
      }
    }
  `);

  const images: ImageNode[] = data.image.edges;

  const getProjectImage = (imageName?: string): IGatsbyImageData | undefined => {
    if (!imageName) return undefined;
    return images.find(img => img.node.fluid.originalName === imageName)?.node.gatsbyImageData;
  };

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      // Heading char reveal
      const headingSplit = SplitText.create("#projects-heading", { type: "chars", mask: "chars" });
      gsap.fromTo(
        headingSplit.chars,
        { yPercent: 110 },
        {
          yPercent: 0,
          duration: 0.9,
          ease: "power4.out",
          stagger: 0.025,
          scrollTrigger: { trigger: "#projects-heading", start: "top 88%", once: true },
        }
      );

      // Per-project title reveals
      const titleEls = containerRef.current?.querySelectorAll(".project-title");
      const titleSplits: InstanceType<typeof SplitText>[] = [];
      titleEls?.forEach(el => {
        const split = SplitText.create(el, { type: "chars", mask: "chars" });
        titleSplits.push(split);
        gsap.fromTo(
          split.chars,
          { yPercent: 110 },
          {
            yPercent: 0,
            duration: 0.7,
            ease: "power3.out",
            stagger: 0.018,
            scrollTrigger: { trigger: el, start: "top 90%", once: true },
          }
        );
      });

      // Image parallax
      containerRef.current?.querySelectorAll(".project-image-inner").forEach(el => {
        gsap.fromTo(el, { yPercent: -8 }, {
          yPercent: 8,
          ease: "none",
          scrollTrigger: { trigger: el.parentElement, start: "top bottom", end: "bottom top", scrub: 1.2 },
        });
      });

      // Project meta fade-up
      gsap.utils.toArray<Element>(".project-meta").forEach(el => {
        gsap.fromTo(el, { opacity: 0, y: 18 }, {
          opacity: 1, y: 0, duration: 0.6, ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 92%", once: true },
        });
      });

      return () => {
        headingSplit.revert();
        titleSplits.forEach(s => s.revert());
      };
    },
    { scope: containerRef }
  );

  return (
    <section
      id="projects"
      ref={containerRef}
      className="py-24 px-8 md:px-16"
      aria-labelledby="projects-heading"
      style={{ borderTop: "1px solid rgba(240,240,238,0.06)" }}
    >
      <div className="mb-24 overflow-hidden">
        <h2
          id="projects-heading"
          className="font-display font-black uppercase"
          style={{
            color: "#F0F0EE",
            fontSize: "clamp(3rem, 10vw, 11rem)",
            lineHeight: 0.88,
            letterSpacing: "-0.03em",
          }}
        >
          Projects
        </h2>
      </div>

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

export default ProjectsSection;
