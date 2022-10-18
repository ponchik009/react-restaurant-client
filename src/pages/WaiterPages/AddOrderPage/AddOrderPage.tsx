import React from "react";
import { useNavigate } from "react-router-dom";
import { io } from "socket.io-client";
import { socket } from "../../../api/api";

import { ReactComponent as IconAdd } from "../../../assets/icons/IconAdd.svg";
import { ReactComponent as IconOrders } from "../../../assets/icons/IconOrders.svg";
import Button from "../../../components/Button/Button";
import MenuList from "../../../components/MenuList/MenuList";
import { useAppDispatch, useAppSelector } from "../../../hooks/hooks";
import {
  createOrder,
  removeDishFromOrder,
  resetOrder,
  updateDishInOrder,
} from "../../../store/orderSlice/ordersSlice";
import { IOrderDish } from "../../../types/apiTypes";
import ChooseCountModal from "../../../components/ChooseCountModal/ChooseCountModal";

import styles from "./AddOrderPage.module.css";
import ChooseTableModal from "./ChooseTableModal/ChooseTableModal";
import Order from "./Order/Order";

const AddOrderPage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { user } = useAppSelector((state) => state.auth);
  const { order } = useAppSelector((state) => state.orders);

  const totalPrice = React.useMemo(
    () =>
      order?.orderDishes.reduce(
        (prev, cur) => prev + cur.count * cur.dish.price,
        0
      ),
    [order]
  );

  React.useEffect(() => {
    socket.on("orderCreated", (data) => console.log(data));
  }, []);

  const [chooseTableNumberModalOpen, setChooseTableNumberModalOpen] =
    React.useState(false);

  const onSendClick = React.useCallback((data: any) => {
    setChooseTableNumberModalOpen(false);
    dispatch(createOrder(data.tableNumber));
    dispatch(resetOrder());
  }, []);

  const onChooseTableNumberModalClose = React.useCallback(
    () => setChooseTableNumberModalOpen(false),
    []
  );

  const onItemDelete = React.useCallback((id: number) => {
    dispatch(removeDishFromOrder(id));
  }, []);

  const [chooseCountModalOpen, setChooseCountModalOpen] = React.useState(false);
  const [currentDish, setCurrentDish] = React.useState<null | IOrderDish>(null);

  const onChooseDish = React.useCallback((dish: IOrderDish) => {
    setCurrentDish(dish);
    setChooseCountModalOpen(true);
  }, []);

  const onOkClick = React.useCallback(
    (data: any) => {
      if (currentDish) {
        setChooseCountModalOpen(false);
        dispatch(
          updateDishInOrder({
            ...currentDish,
            count: data.count,
            comment: data.comment,
          })
        );
      }
    },
    [currentDish]
  );

  const onChooseCountModalClose = React.useCallback(() => {
    setChooseCountModalOpen(false);
    setCurrentDish(null);
  }, []);

  return (
    <div className={styles.addOrderPageWrapper}>
      {!order || order?.orderDishes.length === 0 ? (
        <div
          className={styles.addOrderBlock}
          onClick={() => navigate("/waiterMenu")}
        >
          <div style={{ position: "relative" }}>
            <IconOrders className={styles.icon} />
            <IconAdd className={styles.plusIcon} />
          </div>
          <p>Чтобы создать заказ, добавьте в него блюда</p>
        </div>
      ) : (
        <>
          <h2>Общая стоимость: {totalPrice}</h2>
          <Order
            dishes={order.orderDishes}
            onDelete={onItemDelete}
            onClick={onChooseDish}
          />
          <Button
            title="Отправить на кухню"
            onClick={() => setChooseTableNumberModalOpen(true)}
          />
          <ChooseTableModal
            open={chooseTableNumberModalOpen}
            onClose={onChooseTableNumberModalClose}
            onOkClick={onSendClick}
            title="Выберите номер столика"
          />
          <ChooseCountModal
            onClose={onChooseCountModalClose}
            open={chooseCountModalOpen}
            title="Изменить блюдо в заказе"
            onOkClick={onOkClick}
            dish={currentDish}
            buttonText="Сохранить"
          />
        </>
      )}
    </div>
  );
};

export default AddOrderPage;
