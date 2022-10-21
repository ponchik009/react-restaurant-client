import React from "react";

import Loader from "../../../components/Loader/Loader";
import OrdersList from "../../../components/OrdersList/OrdersList";

import { useAppDispatch, useAppSelector } from "../../../hooks/hooks";
import { usePreloader } from "../../../hooks/usePreloader";

import { fetchOrdersForKitchen } from "../../../store/orderSlice/ordersSlice";

import { LoadingStatuses, OrderStatuses } from "../../../types/enums";

const KitchenOrdersPage = () => {
  const dispatch = useAppDispatch();

  const { orders, fetchOrdersStatus, fetchOrdersError } = useAppSelector(
    (state) => state.orders
  );

  const kitchenOrders = React.useMemo(
    () =>
      orders
        ? orders.filter(
            (order) =>
              order.status === OrderStatuses.SENT ||
              order.status === OrderStatuses.COOKING ||
              order.status === OrderStatuses.READY
          )
        : null,
    [orders]
  );

  React.useEffect(() => {
    dispatch(fetchOrdersForKitchen());
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
          <OrdersList orders={kitchenOrders} />
        </>
      )}
    </>
  );
};

export default KitchenOrdersPage;
