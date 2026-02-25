import React, {
  type ReactNode,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { X } from "lucide-react";
import { Button } from "./ui/button";

interface ModalProps {
  show: boolean;
  onHide: () => void;
  children: ReactNode;
  title?: string;
}

const Modal: React.FC<ModalProps> = ({ show, onHide, children, title }) => {
  const modalRef = useRef<HTMLDivElement>(null);
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

  const closeModal = (e: React.MouseEvent<HTMLDivElement>): void => {
    if (modalRef.current === e.target) {
      onHide();
    }
  };

  const keyPress = useCallback(
    (e: globalThis.KeyboardEvent): void => {
      if (e.key === "Escape" && show) {
        onHide();
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

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto overflow-x-hidden bg-black/80"
      onClick={closeModal}
      ref={modalRef}
      role="dialog"
      aria-modal="true"
      aria-label={title ? `Image preview: ${title}` : "Image preview"}
    >
      <div className="relative flex w-auto max-w-[90vw] max-h-[90vh] items-center justify-center p-4">
        {/* Close button */}
        <Button
          ref={closeButtonRef}
          variant="ghost"
          size="icon"
          onClick={onHide}
          className="absolute -top-2 -right-2 z-10 rounded-full bg-bg-card-light/90 text-text-primary shadow-lg hover:bg-bg-card-light dark:bg-bg-card-dark/90 dark:text-text-primary-dark dark:hover:bg-bg-card-dark"
          aria-label="Close image preview"
        >
          <X className="h-5 w-5" aria-hidden="true" />
        </Button>

        {/* Content */}
        <div className="overflow-hidden rounded-lg">{children}</div>
      </div>
    </div>
  );
};

export default Modal;
