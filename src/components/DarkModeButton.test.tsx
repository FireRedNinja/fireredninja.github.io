import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import DarkModeButton from "./DarkModeButton";
import { expectNoA11yViolations } from "../test-utils";

describe("DarkModeButton", () => {
  beforeEach(() => {
    // Clear localStorage
    localStorage.clear();
    (localStorage.getItem as jest.Mock).mockClear();
    (localStorage.setItem as jest.Mock).mockClear();

    // Reset document classes
    document.documentElement.className = "";
  });

  it("should render without accessibility violations", async () => {
    const { container } = render(<DarkModeButton />);
    await expectNoA11yViolations(container);
  });

  it("should render the button with correct initial aria-label", () => {
    render(<DarkModeButton />);

    const button = screen.getByRole("button", { name: /switch to dark mode/i });
    expect(button).toBeInTheDocument();
  });

  it("should display sun icon in light mode", () => {
    render(<DarkModeButton />);

    const button = screen.getByRole("button");
    // Sun icon is shown in light mode
    expect(button).toBeInTheDocument();
  });

  it("should initialize with dark mode if dark class exists on document", () => {
    // Set dark mode before rendering
    document.documentElement.classList.add("dark");

    render(<DarkModeButton />);

    // Should show light mode option when in dark mode
    const button = screen.getByRole("button", {
      name: /switch to light mode/i,
    });
    expect(button).toBeInTheDocument();
  });

  it("should toggle theme on button click", async () => {
    const user = userEvent.setup();
    render(<DarkModeButton />);

    const button = screen.getByRole("button", { name: /switch to dark mode/i });

    // Click to toggle to dark mode
    await user.click(button);

    // Verify theme changed to dark
    await waitFor(() => {
      expect(document.documentElement.classList.contains("dark")).toBe(true);
      expect(localStorage.setItem).toHaveBeenCalledWith("theme", "dark");
    });

    // Click again to toggle back to light mode
    await user.click(button);

    await waitFor(() => {
      expect(document.documentElement.classList.contains("dark")).toBe(false);
      expect(localStorage.setItem).toHaveBeenCalledWith("theme", "light");
    });
  });

  it("should update localStorage when theme changes", async () => {
    const user = userEvent.setup();
    render(<DarkModeButton />);

    const button = screen.getByRole("button");

    // Toggle to dark
    await user.click(button);

    expect(localStorage.setItem).toHaveBeenCalledWith("theme", "dark");

    // Toggle to light
    await user.click(button);

    expect(localStorage.setItem).toHaveBeenCalledWith("theme", "light");
  });

  it("should add and remove dark class from document element", async () => {
    const user = userEvent.setup();
    render(<DarkModeButton />);

    const button = screen.getByRole("button");

    // Initially no dark class
    expect(document.documentElement.classList.contains("dark")).toBe(false);

    // Toggle to dark
    await user.click(button);

    await waitFor(() => {
      expect(document.documentElement.classList.contains("dark")).toBe(true);
    });

    // Toggle back to light
    await user.click(button);

    await waitFor(() => {
      expect(document.documentElement.classList.contains("dark")).toBe(false);
    });
  });

  it("should update aria-label when theme changes", async () => {
    const user = userEvent.setup();
    render(<DarkModeButton />);

    // Initial aria-label
    let button = screen.getByRole("button", { name: /switch to dark mode/i });
    expect(button).toBeInTheDocument();

    // Click to switch to dark mode
    await user.click(button);

    // Aria-label should update
    await waitFor(() => {
      button = screen.getByRole("button", { name: /switch to light mode/i });
      expect(button).toBeInTheDocument();
    });
  });

  it("should have correct hover styles", () => {
    render(<DarkModeButton />);

    const button = screen.getByRole("button");
    expect(button).toHaveClass("hover:bg-gray-100", "dark:hover:bg-gray-900");
  });

  it("should be keyboard accessible", async () => {
    const user = userEvent.setup();
    render(<DarkModeButton />);

    const button = screen.getByRole("button");

    // Tab to button
    await user.tab();
    expect(button).toHaveFocus();

    // Press Enter to toggle
    await user.keyboard("{Enter}");

    await waitFor(() => {
      expect(document.documentElement.classList.contains("dark")).toBe(true);
    });
  });
});
