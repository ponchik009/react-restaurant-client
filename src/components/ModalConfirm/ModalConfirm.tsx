import React from "react";
import Button from "../Button/Button";
import Modal from "../Modal/Modal";

import styles from "./ModalConfirm.module.css";

interface IModalConfirmProps {
  open: boolean;
  onClose: () => void;
  title: string;
  onOkClick: () => void;
  onCancelClick: () => void;
}

const ModalConfirm: React.FC<IModalConfirmProps> = ({
  title,
  open,
  onClose,
  onOkClick,
  onCancelClick,
}) => {
  return (
    <Modal headerColor="green" title={title} onClose={onClose} open={open}>
      <div className={styles.confirmBody}>
        <Button title="Да" onClick={onOkClick} />
        <Button title="Нет" onClick={onCancelClick} color="red" />
      </div>
    </Modal>
  );
};

export default ModalConfirm;
