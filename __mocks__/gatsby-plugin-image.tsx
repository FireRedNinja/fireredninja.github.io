import React from "react";

// Mock GatsbyImage component
export const GatsbyImage = ({ image, alt, ...props }: any) => (
  <img
    src={image?.images?.fallback?.src || "test-image.jpg"}
    alt={alt}
    {...props}
  />
);

// Mock StaticImage component
export const StaticImage = ({ src, alt, ...props }: any) => (
  <img src={src} alt={alt} {...props} />
);

// Mock getImage helper
export const getImage = jest.fn((node) => node);

// Mock getSrc helper
export const getSrc = jest.fn(
  (node) => node?.images?.fallback?.src || "test-image.jpg"
);
