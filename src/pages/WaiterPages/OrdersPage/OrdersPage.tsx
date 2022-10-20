import React from "react";
import { useAppDispatch, useAppSelector } from "../../../hooks/hooks";
import { fetchOrdersByWaiter } from "../../../store/orderSlice/ordersSlice";
import KitchenOrdersList from "../../KitchenPages/KitchenOrdersPage/KitchenOrdersList/KitchenOrdersList";

const OrdersPage = () => {
  const dispatch = useAppDispatch();
  const { orders } = useAppSelector((state) => state.orders);

  React.useEffect(() => {
    if (!orders) {
      dispatch(fetchOrdersByWaiter());
    }
  }, []);

  return (
    <div>
      <KitchenOrdersList orders={orders} />
    </div>
  );
};

export default OrdersPage;
