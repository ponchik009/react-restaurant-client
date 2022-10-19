import React from "react";
import { IOrder } from "../../../../types/apiTypes";

import styles from "./OrderItem.module.css";

interface IOrderItemProps {
  order: IOrder;
}

const OrderItem: React.FC<IOrderItemProps> = ({ order }) => {
  return <div className={styles.item}>{order.totalPrice}</div>;
};

export default OrderItem;
