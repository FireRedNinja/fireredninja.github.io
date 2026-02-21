import { render, RenderOptions } from "@testing-library/react";
import { axe } from "jest-axe";
import React from "react";
import type { IconType } from "react-icons";
import type { Profile } from "./data/profile";
import type { Project, ProjectLink } from "./data/projectsList";
import type { Skill } from "./data/skills";

// Custom render function with providers
const AllProviders = ({ children }: { children: React.ReactNode }) => {
  return <>{children}</>;
};

export function customRender(
  ui: React.ReactElement,
  options?: Omit<RenderOptions, "wrapper">
) {
  return render(ui, { wrapper: AllProviders, ...options });
}

// Accessibility helper
export async function expectNoA11yViolations(container: HTMLElement) {
  const results = await axe(container);
  // @ts-expect-error - expect is defined in test environment
  expect(results).toHaveNoViolations();
}

// Re-export everything from testing library
export * from "@testing-library/react";
export { render as defaultRender };

// Mock data factories

export function createMockProfile(overrides?: Partial<Profile>): Profile {
  const mockIcon: IconType = () => null;

  return {
    name: "Test User",
    firstName: "Test",
    role: "Software Engineer",
    location: "Test Location",
    socialLinks: [
      {
        name: "GitHub",
        url: "https://github.com/testuser",
        ariaLabel: "Visit my GitHub profile",
        icon: mockIcon,
      },
      {
        name: "LinkedIn",
        url: "https://linkedin.com/in/testuser",
        ariaLabel: "Connect with me on LinkedIn",
        icon: mockIcon,
      },
    ],
    ...overrides,
  };
}

export function createMockProjectLink(
  overrides?: Partial<ProjectLink>
): ProjectLink {
  return {
    name: "Github",
    link: "https://github.com/test/project",
    ariaLabel: "View source code on GitHub",
    ...overrides,
  };
}

export function createMockProject(overrides?: Partial<Project>): Project {
  return {
    title: "Test Project",
    description: "A test project description",
    tags: ["personal"],
    image: "test-project.webp",
    imageAlt: "Test project screenshot",
    links: [createMockProjectLink()],
    ...overrides,
  };
}

export function createMockSkill(overrides?: Partial<Skill>): Skill {
  const mockIcon: IconType = () => null;

  return {
    name: "TypeScript",
    icon: mockIcon,
    description: "A strongly typed programming language",
    category: "language",
    ...overrides,
  };
}

export function createMockSkills(): Skill[] {
  const mockIcon: IconType = () => null;

  return [
    {
      name: "TypeScript",
      icon: mockIcon,
      description: "Strongly typed JavaScript",
      category: "language",
    },
    {
      name: "React",
      icon: mockIcon,
      description: "UI library",
      category: "frontend",
    },
    {
      name: "Node.js",
      icon: mockIcon,
      description: "JavaScript runtime",
      category: "backend",
    },
    {
      name: "Jest",
      icon: mockIcon,
      description: "Testing framework",
      category: "testing",
    },
  ];
}

export function createMockGatsbyImageData() {
  return {
    layout: "constrained" as const,
    width: 800,
    height: 600,
    images: {
      fallback: {
        src: "/static/test-image.jpg",
        srcSet: "/static/test-image.jpg 800w",
        sizes: "(min-width: 800px) 800px, 100vw",
      },
      sources: [],
    },
  };
}

export function createMockGatsbyImageNode(filename: string) {
  return {
    id: `image-${filename}`,
    fluid: {
      originalName: filename,
    },
    gatsbyImageData: createMockGatsbyImageData(),
  };
}

// Setup IntersectionObserver mock with callback trigger
export function mockIntersectionObserver() {
  type IOCallback = (
    entries: IntersectionObserverEntry[],
    observer: IntersectionObserver
  ) => void;
  const instanceMap = new Map<object, Set<Element>>();

  global.IntersectionObserver = class MockIntersectionObserver implements IntersectionObserver {
    readonly root: Element | null = null;
    readonly rootMargin: string = "";
    readonly thresholds: ReadonlyArray<number> = [];
    private callback: IOCallback;
    private elements: Set<Element>;

    constructor(callback: IOCallback) {
      this.callback = callback;
      this.elements = new Set();
      instanceMap.set(this, this.elements);
    }

    observe(element: Element) {
      this.elements.add(element);
    }

    unobserve(element: Element) {
      this.elements.delete(element);
    }

    disconnect() {
      this.elements.clear();
    }

    takeRecords(): IntersectionObserverEntry[] {
      return [];
    }

    // Helper to trigger intersection
    trigger(entries: Partial<IntersectionObserverEntry>[]) {
      this.callback(entries as IntersectionObserverEntry[], this);
    }
  };

  return {
    trigger: (
      element: Element,
      options: Partial<IntersectionObserverEntry> = {}
    ) => {
      const observer = Array.from(instanceMap.entries()).find(([_, elements]) =>
        elements.has(element)
      )?.[0];

      if (
        observer &&
        typeof (observer as { trigger?: unknown }).trigger === "function"
      ) {
        (
          observer as {
            trigger: (entries: Partial<IntersectionObserverEntry>[]) => void;
          }
        ).trigger([
          {
            target: element,
            isIntersecting: true,
            intersectionRatio: 1,
            boundingClientRect: element.getBoundingClientRect(),
            intersectionRect: element.getBoundingClientRect(),
            rootBounds: null,
            time: Date.now(),
            ...options,
          },
        ]);
      }
    },
  };
}
