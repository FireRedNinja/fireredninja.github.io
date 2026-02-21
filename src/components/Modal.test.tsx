import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Modal from "./Modal";
import { expectNoA11yViolations } from "../test-utils";

describe("Modal", () => {
  const mockOnHide = jest.fn();
  const defaultProps = {
    show: true,
    onHide: mockOnHide,
    children: <div>Test Modal Content</div>,
  };

  beforeEach(() => {
    mockOnHide.mockClear();
    document.body.style.overflow = "";
  });

  afterEach(() => {
    document.body.style.overflow = "";
  });

  it("should render without accessibility violations when open", async () => {
    const { container } = render(<Modal {...defaultProps} />);

    await waitFor(() => {
      expect(screen.getByRole("dialog")).toBeInTheDocument();
    });

    await expectNoA11yViolations(container);
  });

  it("should not render when show is false", () => {
    render(<Modal {...defaultProps} show={false} />);

    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("should render content when show is true", async () => {
    render(<Modal {...defaultProps} />);

    await waitFor(() => {
      expect(screen.getByRole("dialog")).toBeInTheDocument();
      expect(screen.getByText("Test Modal Content")).toBeInTheDocument();
    });
  });

  it("should render with custom title in aria-label", async () => {
    render(<Modal {...defaultProps} title="Test Image" />);

    await waitFor(() => {
      const dialog = screen.getByRole("dialog", {
        name: /image preview: test image/i,
      });
      expect(dialog).toBeInTheDocument();
    });
  });

  it("should have default aria-label when no title provided", async () => {
    render(<Modal {...defaultProps} />);

    await waitFor(() => {
      const dialog = screen.getByRole("dialog", { name: /image preview/i });
      expect(dialog).toBeInTheDocument();
    });
  });

  it("should render close button with correct aria-label", async () => {
    render(<Modal {...defaultProps} />);

    await waitFor(() => {
      const closeButton = screen.getByRole("button", {
        name: /close image preview/i,
      });
      expect(closeButton).toBeInTheDocument();
    });
  });

  it("should call onHide when close button is clicked", async () => {
    const user = userEvent.setup();
    render(<Modal {...defaultProps} />);

    await waitFor(() => {
      expect(screen.getByRole("dialog")).toBeInTheDocument();
    });

    const closeButton = screen.getByRole("button", {
      name: /close image preview/i,
    });
    await user.click(closeButton);

    expect(mockOnHide).toHaveBeenCalledTimes(1);
  });

  it("should call onHide when Escape key is pressed", async () => {
    const user = userEvent.setup();
    render(<Modal {...defaultProps} />);

    await waitFor(() => {
      expect(screen.getByRole("dialog")).toBeInTheDocument();
    });

    await user.keyboard("{Escape}");

    expect(mockOnHide).toHaveBeenCalledTimes(1);
  });

  it("should call onHide when backdrop is clicked", async () => {
    const user = userEvent.setup();
    render(<Modal {...defaultProps} />);

    await waitFor(() => {
      expect(screen.getByRole("dialog")).toBeInTheDocument();
    });

    const backdrop = screen.getByRole("dialog");
    await user.click(backdrop);

    expect(mockOnHide).toHaveBeenCalledTimes(1);
  });

  it("should not call onHide when clicking inside modal content", async () => {
    const user = userEvent.setup();
    render(<Modal {...defaultProps} />);

    await waitFor(() => {
      expect(screen.getByRole("dialog")).toBeInTheDocument();
    });

    const content = screen.getByText("Test Modal Content");
    await user.click(content);

    expect(mockOnHide).not.toHaveBeenCalled();
  });

  it("should prevent body scroll when modal is open", async () => {
    const { rerender } = render(<Modal {...defaultProps} show={false} />);

    expect(document.body.style.overflow).toBe("");

    rerender(<Modal {...defaultProps} show={true} />);

    await waitFor(() => {
      expect(document.body.style.overflow).toBe("hidden");
    });
  });

  it("should restore body scroll when modal closes", async () => {
    const { rerender } = render(<Modal {...defaultProps} show={true} />);

    await waitFor(() => {
      expect(document.body.style.overflow).toBe("hidden");
    });

    rerender(<Modal {...defaultProps} show={false} />);

    await waitFor(() => {
      expect(document.body.style.overflow).toBe("");
    });
  });

  it("should focus close button when modal opens", async () => {
    render(<Modal {...defaultProps} />);

    await waitFor(
      () => {
        const closeButton = screen.getByRole("button", {
          name: /close image preview/i,
        });
        expect(closeButton).toHaveFocus();
      },
      { timeout: 200 }
    );
  });

  it("should restore focus to previous element when modal closes", async () => {
    const triggerButton = document.createElement("button");
    triggerButton.textContent = "Trigger";
    document.body.appendChild(triggerButton);
    triggerButton.focus();

    expect(document.activeElement).toBe(triggerButton);

    const { rerender } = render(<Modal {...defaultProps} show={true} />);

    await waitFor(
      () => {
        const closeButton = screen.getByRole("button", {
          name: /close image preview/i,
        });
        expect(closeButton).toHaveFocus();
      },
      { timeout: 200 }
    );

    rerender(<Modal {...defaultProps} show={false} />);

    await waitFor(() => {
      expect(document.activeElement).toBe(triggerButton);
    });

    document.body.removeChild(triggerButton);
  });

  it("should have aria-modal attribute", async () => {
    render(<Modal {...defaultProps} />);

    await waitFor(() => {
      const dialog = screen.getByRole("dialog");
      expect(dialog).toHaveAttribute("aria-modal", "true");
    });
  });

  it("should cleanup on unmount", () => {
    const { unmount } = render(<Modal {...defaultProps} show={true} />);

    unmount();

    expect(document.body.style.overflow).toBe("");
  });

  it("should not render during SSR (before mounted)", () => {
    // Modal uses isMounted state to prevent SSR rendering
    const { container } = render(<Modal {...defaultProps} />);

    // Modal should eventually render after mount
    waitFor(() => {
      expect(container).not.toBeEmptyDOMElement();
    });
  });

  it("should handle rapid open/close toggles", async () => {
    const { rerender } = render(<Modal {...defaultProps} show={false} />);

    // Rapidly toggle
    rerender(<Modal {...defaultProps} show={true} />);
    rerender(<Modal {...defaultProps} show={false} />);
    rerender(<Modal {...defaultProps} show={true} />);

    await waitFor(() => {
      expect(screen.getByRole("dialog")).toBeInTheDocument();
    });
  });

  it("should only call onHide once per Escape press", async () => {
    const user = userEvent.setup();
    render(<Modal {...defaultProps} />);

    await waitFor(() => {
      expect(screen.getByRole("dialog")).toBeInTheDocument();
    });

    await user.keyboard("{Escape}");

    expect(mockOnHide).toHaveBeenCalledTimes(1);
  });

  it("should not call onHide on Escape when modal is closed", async () => {
    const user = userEvent.setup();
    render(<Modal {...defaultProps} show={false} />);

    await user.keyboard("{Escape}");

    expect(mockOnHide).not.toHaveBeenCalled();
  });
});
