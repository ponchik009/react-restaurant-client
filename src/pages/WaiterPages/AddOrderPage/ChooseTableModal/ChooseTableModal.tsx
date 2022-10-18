import React from "react";
import { useForm } from "react-hook-form";
import Button from "../../../../components/Button/Button";
import FormInput from "../../../../components/FormInput/FormInput";
import Modal from "../../../../components/Modal/Modal";

import styles from "./ChooseTableModal.module.css";

interface IChooseTableModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
  onOkClick: (data: any) => void;
}

const ChooseTableModal: React.FC<IChooseTableModalProps> = ({
  title,
  open,
  onClose,
  onOkClick,
}) => {
  const {
    handleSubmit,
    reset,
    control,
    watch,
    formState: { errors },
    setValue,
  } = useForm({});

  const handleClose = React.useCallback(() => {
    reset();
    onClose();
  }, [onClose, reset]);

  const handleAddClick = React.useCallback(
    (data: any) => {
      onOkClick(data);
      handleClose();
    },
    [onOkClick, handleClose]
  );

  return (
    <Modal headerColor="green" title={title} onClose={handleClose} open={open}>
      <form
        className={styles.modalBody}
        onSubmit={handleSubmit(handleAddClick)}
      >
        <FormInput
          control={control}
          errors={errors}
          name="tableNumber"
          placeholder="Номер столика"
          title="Выберите номер столика"
          type="number"
          rules={{
            required: "Поле обязательно для заполнения",
          }}
        />
        <Button title="Отправить" type="submit" onClick={() => {}} />
      </form>
    </Modal>
  );
};

export default ChooseTableModal;
