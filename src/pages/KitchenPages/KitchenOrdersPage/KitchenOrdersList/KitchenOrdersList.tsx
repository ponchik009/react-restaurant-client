import React from "react";
import { IOrder } from "../../../../types/apiTypes";
import OrderItem from "../OrderItem/OrderItem";

import styles from "./KitchenOrdersList.module.css";

interface IKitchenOrdersList {
  orders: IOrder[] | null;
}

const KitchenOrdersList: React.FC<IKitchenOrdersList> = ({ orders }) => {
  return (
    <div className={styles.list}>
      {orders &&
        orders.map((order) => <OrderItem key={order.id} order={order} />)}
    </div>
  );
};

export default KitchenOrdersList;
