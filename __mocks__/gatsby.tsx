import React from "react";

// Mock Link component as anchor tag
export const Link = jest.fn(({ to, children, ...props }) =>
  React.createElement("a", { href: to, ...props }, children)
);

// Mock navigate function
export const navigate = jest.fn();

// Mock useStaticQuery
export const useStaticQuery = jest.fn();

// Mock graphql tag
export const graphql = jest.fn();
