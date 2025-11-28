import React, {
  type ReactNode,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { AnimatePresence, motion } from "framer-motion";

interface ModalProps {
  show: boolean;
  onHide: () => void;
  children: ReactNode;
}

const Modal = ({ show, onHide, children }: ModalProps) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

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

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
          className="fixed inset-0 z-10 flex items-center justify-center overflow-y-auto overflow-x-hidden bg-black/80 outline-2 outline-transparent outline-offset-2"
          onClick={closeModal}
          ref={modalRef}
        >
          <motion.div
            initial={{ opacity: 0, y: "-20%" }}
            animate={{ opacity: 1, y: "0%" }}
            exit={{ opacity: 0, y: "-20%" }}
            transition={{ duration: 0.15 }}
            className="relative flex w-auto max-w-max items-center justify-center p-4"
          >
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Modal;
