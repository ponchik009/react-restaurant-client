import React from "react";
import Button from "../Button/Button";
import Modal from "../Modal/Modal";
import { IOrderDish } from "../../types/apiTypes";
import { OrderDishStatuses } from "../../types/enums";

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
  const dishTitle = React.useMemo(() => {
    switch (orderDish?.orderDishStatus) {
      case OrderDishStatuses.SENT:
        return "Готовить";
      case OrderDishStatuses.COOKING:
        return "Готово";
      case OrderDishStatuses.READY:
        return "Доставлено";
      default:
        return "Ожидание...";
    }
  }, [orderDish]);

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
          <Button title={dishTitle} onClick={onOkClick} />
        </div>
      )}
    </Modal>
  );
};

export default OrderDishModal;
