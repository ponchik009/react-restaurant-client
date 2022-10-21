import React from "react";
import { socket } from "../../api/api";
import { RolesNames } from "../../const/conts";
import { useAppSelector } from "../../hooks/hooks";
import { IOrder, IOrderDish } from "../../types/apiTypes";
import { OrderDishStatuses, Roles } from "../../types/enums";
import OrderDishModal from "../OrderDishModal/OrderDishModal";
import OrderItem from "../OrderItem/OrderItem";
import OrderModal from "../OrderModal/OrderModal";

import styles from "./OrdersList.module.css";

interface IOrdersList {
  orders: IOrder[] | null;
}

const OrdersList: React.FC<IOrdersList> = ({ orders }) => {
  const { user } = useAppSelector((state) => state.auth);

  const [currentDish, setCurrentDish] = React.useState<null | IOrderDish>(null);
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

  const modalClose = React.useCallback(() => {
    setCurrentDish(null);
    setModalOpen(false);
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

  const [currentOrder, setCurrentOrder] = React.useState<null | IOrder>(null);
  const [modalOrderOpen, setModalOrderOpen] = React.useState(false);

  const onOrderClick = React.useMemo(() => {
    if (user!.role.name === Roles.WAITER) {
      return (order: IOrder) => {
        setCurrentOrder(order);
        setModalOrderOpen(true);
      };
    }

    return () => {};
  }, []);

  const modalOrderClose = React.useCallback(() => {
    setCurrentOrder(null);
    setModalOrderOpen(false);
  }, []);

  const onPayClick = React.useCallback(() => {
    if (user!.role.name === Roles.WAITER && currentOrder) {
      socket.emit("payOrder", currentOrder.id);
    }

    modalOrderClose();
  }, [user, currentOrder]);

  return (
    <>
      <div className={styles.list}>
        {orders &&
          orders.map((order) => (
            <OrderItem
              key={order.id}
              order={order}
              onDishClick={onDishClick}
              onClick={onOrderClick}
              isWaiter={user!.role.name === Roles.WAITER}
            />
          ))}
      </div>
      <OrderDishModal
        open={modalOpen}
        orderDish={currentDish}
        onClose={modalClose}
        onOkClick={onOkClick}
      />
      <OrderModal
        open={modalOrderOpen}
        onClose={modalOrderClose}
        onOkClick={onPayClick}
        order={currentOrder}
      />
    </>
  );
};

export default OrdersList;
