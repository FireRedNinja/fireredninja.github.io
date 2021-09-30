import React, { useCallback, useEffect, useRef } from 'react';
import { useSpring, animated } from 'react-spring';

import * as STYLES from './modal.module.scss';

const Modal = ({ show, onHide, children }) => {
  const modalRef = useRef();

  const animation = useSpring({
    config: {
      duration: 150,
    },
    opacity: show ? 1 : 0,
    transform: show ? `translateY(0%)` : `translateY(-20%)`,
  });

  const closeModal = (e) => {
    if (modalRef.current === e.target) {
      onHide();
    }
  };

  const keyPress = useCallback(
    (e) => {
      if (e.key === 'Escape' && show) {
        onHide();
      }
    },
    [show, onHide]
  );

  useEffect(() => {
    document.addEventListener('keydown', keyPress);
    return () => document.removeEventListener('keydown', keyPress);
  }, [keyPress]);

  return (
    <>
      {show && (
        <div
          className={STYLES.Modal}
          onClick={closeModal}
          onKeyPress={() => onHide()}
          ref={modalRef}
        >
          <animated.div style={animation}>
            <div className={STYLES.Modal__wrapper}>{children}</div>
          </animated.div>
        </div>
      )}
    </>
  );
};

export default Modal;
