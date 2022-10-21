import React from "react";
import Button from "../Button/Button";
import Modal from "../Modal/Modal";
import { IOrder, IOrderDish } from "../../types/apiTypes";
import { OrderDishStatuses } from "../../types/enums";

import styles from "./OrderModal.module.css";

interface IOrderModalProps {
  order: IOrder | null;
  open: boolean;
  onClose: () => void;
  onOkClick: () => void;
}

const OrderModal: React.FC<IOrderModalProps> = ({
  order,
  open,
  onClose,
  onOkClick,
}) => {
  return (
    <Modal
      headerColor="green"
      title={`Оплата заказа №${order?.id}`}
      onClose={onClose}
      open={open}
    >
      {order && (
        <div className={styles.body}>
          <span>Сумма: {order.totalPrice}</span>
          <Button
            title={order.isPaid ? "Не оплачено" : "Оплачено"}
            color={order.isPaid ? "red" : "green"}
            onClick={onOkClick}
          />
        </div>
      )}
    </Modal>
  );
};

export default OrderModal;
