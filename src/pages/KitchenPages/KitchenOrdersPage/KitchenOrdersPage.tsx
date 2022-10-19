import React from "react";
import { socket } from "../../../api/api";
import Loader from "../../../components/Loader/Loader";
import { useAppDispatch, useAppSelector } from "../../../hooks/hooks";
import { usePreloader } from "../../../hooks/usePreloader";
import {
  addOrder,
  fetchOrdersForKitchen,
} from "../../../store/orderSlice/ordersSlice";
import { IOrder } from "../../../types/apiTypes";
import { LoadingStatuses } from "../../../types/enums";
import KitchenOrdersList from "./KitchenOrdersList/KitchenOrdersList";

const KitchenOrdersPage = () => {
  const dispatch = useAppDispatch();

  const { orders, fetchOrdersStatus, fetchOrdersError } = useAppSelector(
    (state) => state.orders
  );

  React.useEffect(() => {
    dispatch(fetchOrdersForKitchen());

    socket.on("orderCreated", (order: IOrder) => dispatch(addOrder(order)));
  }, []);

  const { isPreloaderShow } = usePreloader(
    fetchOrdersStatus === LoadingStatuses.PENDING
  );

  if (!isPreloaderShow && !orders) return null;

  return (
    <>
      {isPreloaderShow ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Loader />
        </div>
      ) : (
        <>
          <KitchenOrdersList orders={orders} />
        </>
      )}
    </>
  );
};

export default KitchenOrdersPage;
