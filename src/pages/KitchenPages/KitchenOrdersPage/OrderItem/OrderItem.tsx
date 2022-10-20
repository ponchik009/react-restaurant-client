import React from "react";
import { IOrder, IOrderDish } from "../../../../types/apiTypes";
import { OrderDishStatuses } from "../../../../types/enums";
import OrderItemDish from "../OrderItemDish/OrderItemDish";

import styles from "./OrderItem.module.css";

interface IOrderItemProps {
  order: IOrder;
  onDishClick: (dish: IOrderDish) => void;
}

const OrderItem: React.FC<IOrderItemProps> = ({ order, onDishClick }) => {
  const elapsedTime = React.useMemo(() => {
    const mins = Math.floor(
      (Date.now() - (new Date(order.date) as any)) / 1000 / 60
    );
    return mins >= 60
      ? `${Math.floor(mins / 60)} час ${mins % 60} мин назад`
      : `${mins} мин назад`;
  }, [order]);

  const readyDishes = React.useMemo(
    () =>
      order.orderDishes.filter(
        (dish) => dish.orderDishStatus === OrderDishStatuses.READY
      ).length,
    [order]
  );
  const cookingDihes = React.useMemo(
    () =>
      order.orderDishes.filter(
        (dish) => dish.orderDishStatus === OrderDishStatuses.COOKING
      ).length,
    [order]
  );
  const sendedDishes = React.useMemo(
    () =>
      order.orderDishes.filter(
        (dish) => dish.orderDishStatus === OrderDishStatuses.SENT
      ).length,
    [order]
  );

  return (
    <div className={styles.item}>
      <div className={styles.info}>
        <div className={styles.mainInfo}>
          <h3 className={styles.title}>Заказ №{order.id}</h3>
          <span className={styles.time}>{elapsedTime}</span>
        </div>
        <div className={styles.statuses}>
          <span className={styles.ready}>Готовых блюд: {readyDishes}</span>
          <span className={styles.cooking}>
            Готовящихся блюд: {cookingDihes}
          </span>
          <span className={styles.sent}>
            Блюд, ожидающих готовки: {sendedDishes}
          </span>
        </div>
      </div>
      <div className={styles.dishes}>
        {order.orderDishes.map((orderDish) => (
          <OrderItemDish
            orderDish={orderDish}
            key={orderDish.id}
            onClick={() => onDishClick(orderDish)}
          />
        ))}
      </div>
    </div>
  );
};

export default OrderItem;
