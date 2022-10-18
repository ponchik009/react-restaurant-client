import React from "react";
import { useForm } from "react-hook-form";
import Button from "../Button/Button";
import FormInput from "../FormInput/FormInput";
import Modal from "../Modal/Modal";
import { IOrderDish } from "../../types/apiTypes";

import styles from "./ChooseCountModal.module.css";

interface IChooseCountModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
  buttonText: string;
  onOkClick: (data: any) => void;
  dish?: IOrderDish | null;
}

const ChooseCountModal: React.FC<IChooseCountModalProps> = ({
  title,
  open,
  onClose,
  onOkClick,
  dish = null,
  buttonText,
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

  React.useEffect(() => {
    if (dish) {
      setValue("count", dish.count);
      setValue("comment", dish.comment);
    }
  }, [dish]);

  return (
    <Modal headerColor="green" title={title} onClose={handleClose} open={open}>
      <form
        className={styles.modalBody}
        onSubmit={handleSubmit(handleAddClick)}
      >
        <FormInput
          control={control}
          errors={errors}
          name="count"
          placeholder="Количество"
          title="Введите количество"
          type="number"
          rules={{
            required: "Поле обязательно для заполнения",
            validate: (val: string) => {
              if (+val < 1) {
                return "Значение не может быть меньше единицы";
              }
            },
          }}
        />
        <FormInput
          control={control}
          errors={errors}
          name="comment"
          placeholder="Комментарий"
          title="Введите комментарий (необязательное)"
          rules={{}}
        />
        <Button title={buttonText} type="submit" onClick={() => {}} />
      </form>
    </Modal>
  );
};

export default ChooseCountModal;
