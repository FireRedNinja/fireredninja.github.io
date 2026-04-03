import React, {
  type ReactNode,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";
import { Button } from "./ui/button";
import { gsap, useGSAP } from "../lib/gsap";

interface ModalProps {
  show: boolean;
  onHide: () => void;
  children: ReactNode;
  title?: string;
}

const Modal: React.FC<ModalProps> = ({ show, onHide, children, title }) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Store previous focus and focus close button when modal opens
  useEffect(() => {
    if (show) {
      previousFocusRef.current = document.activeElement as HTMLElement;
      // Small delay to ensure modal is rendered
      setTimeout(() => {
        closeButtonRef.current?.focus();
      }, 50);
      // Prevent body scroll
      document.body.style.overflow = "hidden";
    } else {
      // Restore body scroll
      document.body.style.overflow = "";
      // Restore focus to previous element
      previousFocusRef.current?.focus();
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [show]);

  // ── Entrance animation ──────────────────────────────────────────
  useGSAP(
    () => {
      if (!show || !overlayRef.current || !contentRef.current) return;
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      gsap.fromTo(
        overlayRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.3, ease: "power2.out" }
      );
      gsap.fromTo(
        contentRef.current,
        { scale: 0.85, opacity: 0, y: 20 },
        {
          scale: 1,
          opacity: 1,
          y: 0,
          duration: 0.4,
          ease: "power4.out",
          delay: 0.1,
        }
      );
    },
    { dependencies: [show] }
  );

  // Close when clicking outside the content box (overlay / backdrop area)
  const closeModal = (e: React.MouseEvent<HTMLDivElement>): void => {
    if (!contentRef.current?.contains(e.target as Node)) {
      onHide();
    }
  };

  const keyPress = useCallback(
    (e: globalThis.KeyboardEvent): void => {
      if (!show) return;
      if (e.key === "Escape") {
        onHide();
      }
      if (e.key === "Tab") {
        // Close button is the only focusable element — keep focus contained
        e.preventDefault();
        closeButtonRef.current?.focus();
      }
    },
    [show, onHide]
  );

  useEffect(() => {
    document.addEventListener("keydown", keyPress);
    return () => document.removeEventListener("keydown", keyPress);
  }, [keyPress]);

  // Don't render anything during SSR
  if (!isMounted) {
    return null;
  }

  if (!show) {
    return null;
  }

  // Portal renders outside any scroll-wrapper to keep position:fixed correct
  return createPortal(
    <div
      className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto overflow-x-hidden"
      onClick={closeModal}
      ref={modalRef}
      role="dialog"
      aria-modal="true"
      aria-label={title ? `Image preview: ${title}` : "Image preview"}
    >
      {/* Overlay */}
      <div
        ref={overlayRef}
        className="absolute inset-0 bg-zinc-950/80"
        aria-hidden="true"
      />

      {/* Content */}
      <div
        ref={contentRef}
        className="relative flex w-auto max-w-[90vw] max-h-[90vh] items-center justify-center p-4"
      >
        {/* Close button */}
        <Button
          ref={closeButtonRef}
          variant="ghost"
          size="icon"
          onClick={onHide}
          className="absolute -top-2 -right-2 z-10 rounded-full shadow-lg"
          style={{
            backgroundColor: "rgba(245,237,216,0.95)",
            color: "#1C1208",
          }}
          aria-label="Close image preview"
        >
          <X className="h-5 w-5" aria-hidden="true" />
        </Button>

        {/* Content */}
        <div className="overflow-hidden rounded-lg">{children}</div>
      </div>
    </div>,
    document.body
  );
};

export default Modal;
