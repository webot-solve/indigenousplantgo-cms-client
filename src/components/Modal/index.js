import React from "react";
import { ExitIcon } from "../../icons";

/*
  @desc UI component that displays a modal.
  @controller null
*/
export default function Modal({
  children,
  title,
  subtitle,
  isActive,
  closeModal,
}) {
  return (
    <>
      {isActive && (
        <div className="modal__container">
          <div className="modal__body">
            <div className="modal__head">
              <button onClick={() => closeModal()}>
                <span>Cancel</span>
                <ExitIcon />
              </button>
            </div>
            <div className="modal__title">
              <h3>{title}</h3>
              <h4>{subtitle || " "}</h4>
            </div>
            {children}
          </div>
        </div>
      )}
    </>
  );
}
