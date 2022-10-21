import React from "react";

import OrderItemDish from "../OrderItemDish/OrderItemDish";
import Chip, { ChipColors } from "../Chip/Chip";

import { IOrder, IOrderDish } from "../../types/apiTypes";
import { OrderDishStatuses } from "../../types/enums";

import styles from "./OrderItem.module.css";

import { ReactComponent as IconAlarm } from "../../assets/icons/IconAlarm.svg";

interface IOrderItemProps {
  order: IOrder;
  isWaiter?: boolean;
  onDishClick: (dish: IOrderDish) => void;
  onClick: (order: IOrder) => void;
}

const OrderItem: React.FC<IOrderItemProps> = ({
  order,
  onDishClick,
  isWaiter = false,
  onClick,
}) => {
  const elapsedTime = React.useMemo(() => {
    const mins = Math.floor(
      (Date.now() - (new Date(order.date) as any)) / 1000 / 60
    );
    return mins >= 60
      ? `${Math.floor(mins / 60)} час. ${mins % 60} мин. назад`
      : `${mins} мин. назад`;
  }, [order]);

  const deliveredDishes = React.useMemo(
    () =>
      order.orderDishes.filter(
        (dish) => dish.orderDishStatus === OrderDishStatuses.DELIVERED
      ).length,
    [order]
  );
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

  const isOrderPaid = React.useMemo(() => order?.isPaid, [order]);
  const paidStatusTitle = React.useMemo(
    () => (isOrderPaid ? "Оплачено" : "Не оплачено"),
    [isOrderPaid]
  );
  const paidStatusColor = React.useMemo<ChipColors>(
    () => (isOrderPaid ? "green" : "red"),
    [isOrderPaid]
  );

  return (
    <div className={styles.item} onClick={() => onClick(order)}>
      <div className={styles.info}>
        <div className={styles.mainInfo}>
          <div className={styles.mainRow}>
            <h3 className={styles.title}>Заказ №{order.id}</h3>
            {readyDishes > 0 && isWaiter && (
              <Chip
                title="Есть блюда, которые можно доставить"
                color="yellow"
                size="xs"
                icon={<IconAlarm />}
              />
            )}
            {sendedDishes > 0 && !isWaiter && (
              <Chip
                title="Есть блюда, которые нужно приготовить"
                color="yellow"
                size="xs"
                icon={<IconAlarm />}
              />
            )}
          </div>
          <span className={styles.time}>{elapsedTime}</span>
          <span className={styles.time}>Стол {order.tableNumber}</span>
        </div>
        <div className={styles.additionalInfo}>
          <div className={styles.statuses}>
            <span className={styles.ready}>Доставлено: {deliveredDishes}</span>
            <span className={styles.ready}>Готово: {readyDishes}</span>
            <span className={styles.cooking}>Готовится: {cookingDihes}</span>
            <span className={styles.sent}>Ожидает: {sendedDishes}</span>
          </div>
          {isWaiter && (
            <div className={styles.totalInfo}>
              <span>Общая сумма: {order.totalPrice}р</span>
              <Chip title={paidStatusTitle} color={paidStatusColor} />
            </div>
          )}
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
