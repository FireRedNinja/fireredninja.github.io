import React from 'react';

const Modal = ({ show, onHide, children }) => {
  return (
    <div
      className={`${
        show ? 'visible' : 'hidden'
      } block fixed top-0 left-0 w-full h-full outline-none overflow-x-hidden overflow-y-auto z-10`}
      onClick={() => onHide()}
      onKeyPress={() => onHide()}
    >
      <div
        className={`${
          show ? 'visible' : 'hidden'
        } bg-black opacity-75 fixed top-0 left-0 w-full h-full outline-none`}
      ></div>
      <div className="flex items-center relative w-auto pointer-events-none max-w-max my-8 mx-auto p-4">
        {children}
      </div>
    </div>
  );
};

export default Modal;
