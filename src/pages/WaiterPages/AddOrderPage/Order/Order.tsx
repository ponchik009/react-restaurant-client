import React from "react";
import { IOrderDish } from "../../../../types/apiTypes";
import OrderDishItem from "../OrderDishItem/OrderDishItem";

import styles from "./Order.module.css";

interface IOrderProps {
  dishes: IOrderDish[];
  onDelete: (id: number) => void;
  onClick: (dish: IOrderDish) => void;
}

const Order: React.FC<IOrderProps> = ({ dishes, onDelete, onClick }) => {
  return (
    <div className={styles.list}>
      {dishes.map((dish) => (
        <OrderDishItem
          orderDish={dish}
          key={dish.dish.id}
          onDelete={onDelete}
          onClick={onClick}
        />
      ))}
    </div>
  );
};

export default Order;
