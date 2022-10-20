import React from "react";
import { socket } from "../../../../api/api";
import { RolesNames } from "../../../../const/conts";
import { useAppSelector } from "../../../../hooks/hooks";
import { IOrder, IOrderDish } from "../../../../types/apiTypes";
import { OrderDishStatuses, Roles } from "../../../../types/enums";
import OrderDishModal from "../OrderDishModal/OrderDishModal";
import OrderItem from "../OrderItem/OrderItem";

import styles from "./KitchenOrdersList.module.css";

interface IKitchenOrdersList {
  orders: IOrder[] | null;
}

const KitchenOrdersList: React.FC<IKitchenOrdersList> = ({ orders }) => {
  const { user } = useAppSelector((state) => state.auth);

  const [currentDish, setCurrentDish] = React.useState<null | IOrderDish>(null);
  const [canDishClick, setCanDishClick] = React.useState(false);
  const [modalOpen, setModalOpen] = React.useState(false);

  const onDishClick = React.useCallback((dish: IOrderDish) => {
    setCurrentDish(dish);
    if (
      (user!.role.name === Roles.KITCHEN &&
        (dish.orderDishStatus === OrderDishStatuses.SENT ||
          dish.orderDishStatus === OrderDishStatuses.COOKING)) ||
      (user!.role.name === Roles.WAITER &&
        dish.orderDishStatus === OrderDishStatuses.READY)
    ) {
      setModalOpen(true);
    }
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

  const onDeliverDishClick = React.useCallback(() => {
    if (
      currentDish &&
      currentDish.orderDishStatus === OrderDishStatuses.READY
    ) {
      socket.emit("deliverDish", currentDish.id);
    }

    modalClose();
  }, [currentDish]);

  const modalClose = React.useCallback(() => {
    setCurrentDish(null);
    setModalOpen(false);
  }, []);

  const onOkClick = React.useMemo(() => {
    if (user!.role.name === Roles.KITCHEN) {
      if (currentDish?.orderDishStatus === OrderDishStatuses.SENT) {
        return onStartCookingClick;
      } else if (currentDish?.orderDishStatus === OrderDishStatuses.COOKING) {
        return onEndCookingClick;
      }
    } else if (user!.role.name === Roles.WAITER) {
      if (currentDish?.orderDishStatus === OrderDishStatuses.READY) {
        return onDeliverDishClick;
      }
    }

    return () => {};
  }, [user, currentDish]);

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
        onOkClick={onOkClick}
      />
    </>
  );
};

export default KitchenOrdersList;
