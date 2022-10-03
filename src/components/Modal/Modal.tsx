import React from "react";
import ReactDOM from "react-dom";

import { ReactComponent as IconClose } from "../../assets/icons/IconClose.svg";

import styles from "./Modal.module.css";

export type HeaderColor = "green" | "orange" | "gray";

interface IModalProps {
  children: React.ReactNode;
  open: boolean;
  onClose: () => void;
  title: string;
  headerColor: HeaderColor;
}

const Modal: React.FC<IModalProps> = ({ children, open, onClose, title }) => {
  return ReactDOM.createPortal(
    <>
      {open && (
        <div className={styles.modal} onClick={onClose}>
          <div
            onClick={(event) => event.stopPropagation()}
            className={styles.modalContent}
          >
            <div className={styles.modalHeader}>
              <IconClose className={styles.closeButton} onClick={onClose} />
              <h2 className={styles.modalHeaderTitle}>{title}</h2>
            </div>
            <div className={styles.modalBody}>{children}</div>
          </div>
        </div>
      )}
    </>,
    document.body
  );
};

export default Modal;
