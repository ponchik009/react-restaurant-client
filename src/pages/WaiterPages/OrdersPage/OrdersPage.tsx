import React from "react";
import { useAppDispatch, useAppSelector } from "../../../hooks/hooks";
import { fetchOrdersByWaiter } from "../../../store/orderSlice/ordersSlice";
import OrdersList from "../../../components/OrdersList/OrdersList";
import { OrderStatuses } from "../../../types/enums";

const OrdersPage = () => {
  const dispatch = useAppDispatch();
  const { orders } = useAppSelector((state) => state.orders);

  React.useEffect(() => {
    if (!orders) {
      dispatch(fetchOrdersByWaiter());
    }
  }, []);

  const filteredOrders = React.useMemo(
    () =>
      orders
        ? orders.filter(
            (order) =>
              !(order.isPaid && order.status === OrderStatuses.DELIVERED)
          )
        : null,
    [orders]
  );

  return (
    <div>
      <OrdersList orders={filteredOrders} />
    </div>
  );
};

export default OrdersPage;
