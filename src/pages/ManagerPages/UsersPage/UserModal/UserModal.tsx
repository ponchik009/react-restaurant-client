import React from "react";
import Modal from "../../../../components/Modal/Modal";

interface IUserModalProps {
  modalOpen: boolean;
  onClose: () => void;
}

const UserModal: React.FC<IUserModalProps> = ({ modalOpen, onClose }) => {
  return (
    <Modal
      open={modalOpen}
      onClose={onClose}
      title="Создать пользователя"
      headerColor="green"
    >
      123
    </Modal>
  );
};

export default UserModal;
