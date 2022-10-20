import React from "react";
import { socket } from "../../api/api";
import Chip, { ChipColors } from "../Chip/Chip";
import { DishStatusesNames } from "../../const/conts";
import { IOrderDish } from "../../types/apiTypes";

import styles from "./OrderItemDish.module.css";

interface IOrderItemDishProps {
  orderDish: IOrderDish;
  onClick: () => void;
}

const OrderItemDish: React.FC<IOrderItemDishProps> = ({
  orderDish,
  onClick,
}) => {
  return (
    <div className={styles.dish} key={orderDish.id} onClick={onClick}>
      <img
        className={styles.image}
        src={`${process.env.REACT_APP_API_URL}/${orderDish.dish.image}`}
        alt={orderDish.dish.name}
      />
      <div className={styles.dishInfo}>
        <h4>{orderDish.dish.name}</h4>
        <div className={styles.dishAdditionalInfo}>
          <span>Количество: {orderDish.count}</span>
          <span>Комментарий: {orderDish.comment}</span>
        </div>
        <Chip
          title={DishStatusesNames[orderDish.orderDishStatus].name}
          size="xs"
          color={
            DishStatusesNames[orderDish.orderDishStatus].color as ChipColors
          }
        />
      </div>
    </div>
  );
};

export default OrderItemDish;
