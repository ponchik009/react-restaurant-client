import React from "react";
import Button from "../../../../components/Button/Button";
import Modal from "../../../../components/Modal/Modal";
import { IOrderDish } from "../../../../types/apiTypes";
import { OrderDishStatuses } from "../../../../types/enums";

import styles from "./OrderDishModal.module.css";

interface IOrderDishModalProps {
  orderDish: IOrderDish | null;
  open: boolean;
  onClose: () => void;
  onOkClick: () => void;
}

const OrderDishModal: React.FC<IOrderDishModalProps> = ({
  orderDish,
  open,
  onClose,
  onOkClick,
}) => {
  return (
    <Modal
      headerColor="green"
      title={`Блюдо ${orderDish?.dish.name}`}
      onClose={onClose}
      open={open}
    >
      {orderDish && (
        <div className={styles.body}>
          <img
            src={`${process.env.REACT_APP_API_URL}/${orderDish.dish.image}`}
            alt={orderDish.dish.name}
          />
          <span>Количество: {orderDish.count}</span>
          <span>Комментарий: {orderDish.comment}</span>
          <Button
            title={
              orderDish.orderDishStatus === OrderDishStatuses.SENT
                ? "Готовить"
                : "Готово"
            }
            onClick={onOkClick}
          />
        </div>
      )}
    </Modal>
  );
};

export default OrderDishModal;