import React from "react";
import { socket } from "../../../../api/api";
import { IOrder, IOrderDish } from "../../../../types/apiTypes";
import { OrderDishStatuses } from "../../../../types/enums";
import OrderDishModal from "../OrderDishModal/OrderDishModal";
import OrderItem from "../OrderItem/OrderItem";

import styles from "./KitchenOrdersList.module.css";

interface IKitchenOrdersList {
  orders: IOrder[] | null;
}

const KitchenOrdersList: React.FC<IKitchenOrdersList> = ({ orders }) => {
  const [currentDish, setCurrentDish] = React.useState<null | IOrderDish>(null);
  const [modalOpen, setModalOpen] = React.useState(false);

  const onDishClick = React.useCallback((dish: IOrderDish) => {
    setCurrentDish(dish);
    setModalOpen(true);
  }, []);

  const onStartCookingClick = React.useCallback(() => {
    if (currentDish && currentDish.orderDishStatus === OrderDishStatuses.SENT) {
      socket.emit("startCooking", currentDish.id);
    }

    modalClose();
  }, [currentDish]);

  const onEndCookingClick = React.useCallback(() => {
    if (
      currentDish &&
      currentDish.orderDishStatus === OrderDishStatuses.COOKING
    ) {
      socket.emit("endCooking", currentDish.id);
    }

    modalClose();
  }, [currentDish]);

  const modalClose = React.useCallback(() => {
    setCurrentDish(null);
    setModalOpen(false);
  }, []);

  return (
    <>
      <div className={styles.list}>
        {orders &&
          orders.map((order) => (
            <OrderItem key={order.id} order={order} onDishClick={onDishClick} />
          ))}
      </div>
      <OrderDishModal
        open={modalOpen}
        orderDish={currentDish}
        onClose={modalClose}
        onOkClick={
          currentDish?.orderDishStatus === OrderDishStatuses.SENT
            ? onStartCookingClick
            : onEndCookingClick
        }
      />
    </>
  );
};

export default KitchenOrdersList;
