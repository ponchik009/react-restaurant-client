import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { orderApi } from "../../api/api";
import { RootState, AppThunk } from "../store";
import { ICreateOrder, IDish, IOrder, IOrderDish } from "../../types/apiTypes";
import { LoadingStatuses } from "../../types/enums";

export interface OrdersState {
  order: ICreateOrder | null;
  saveOrderStatus: LoadingStatuses;
  saveOrderError: string | null;

  orders: IOrder[] | null;
  fetchOrdersStatus: LoadingStatuses;
  fetchOrdersError: null | string;
}

const initialState: OrdersState = {
  order: null,
  saveOrderError: null,
  saveOrderStatus: LoadingStatuses.FULFILED,
  orders: null,
  fetchOrdersStatus: LoadingStatuses.FULFILED,
  fetchOrdersError: null,
};

export const createOrder = createAsyncThunk(
  "orders/createOrder",
  async (tableNumber: number, api) => {
    const { order } = (api.getState() as any).orders;
    const { user } = (api.getState() as any).auth;
    return orderApi.createOrder({ ...order, tableNumber }, user);
  }
);

export const fetchOrdersForKitchen = createAsyncThunk(
  "orders/fetchOrdersForKitchen",
  async () => {
    return orderApi.getOrdersForKitchen();
  }
);

export const ordersSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    addDishToOrder(state, action: PayloadAction<IOrderDish>) {
      if (state.order) {
        state.order.orderDishes.push(action.payload);
      } else {
        state.order = {
          orderDishes: [action.payload],
          // ?
          tableNumber: 1,
        };
      }
    },
    removeDishFromOrder(state, action: PayloadAction<number>) {
      state.order!.orderDishes = state.order!.orderDishes.filter(
        (d) => d.dish.id !== action.payload
      );
    },
    updateDishInOrder(state, action: PayloadAction<IOrderDish>) {
      state.order!.orderDishes = state.order!.orderDishes.map((d) =>
        d.dish.id === action.payload.dish.id ? action.payload : d
      );
    },
    resetOrder(state) {
      state.order = null;
    },
    addOrder(state, action: PayloadAction<IOrder>) {
      state.orders?.push(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createOrder.pending, (state) => {
        state.saveOrderStatus = LoadingStatuses.PENDING;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.saveOrderStatus = LoadingStatuses.FULFILED;
        state.saveOrderError = null;
      })
      .addCase(createOrder.rejected, (state, action) => {
        console.log(action.error);
        state.saveOrderStatus = LoadingStatuses.REJECTED;
      })
      .addCase(fetchOrdersForKitchen.pending, (state) => {
        state.fetchOrdersStatus = LoadingStatuses.PENDING;
      })
      .addCase(fetchOrdersForKitchen.fulfilled, (state, action) => {
        state.fetchOrdersStatus = LoadingStatuses.FULFILED;
        state.fetchOrdersError = null;
        state.orders = action.payload;
      })
      .addCase(fetchOrdersForKitchen.rejected, (state, action) => {
        state.fetchOrdersError = "Не удалось получить список заказов";
        state.fetchOrdersStatus = LoadingStatuses.REJECTED;
      });
  },
});

export const {
  addDishToOrder,
  resetOrder,
  removeDishFromOrder,
  updateDishInOrder,
  addOrder,
} = ordersSlice.actions;

export default ordersSlice.reducer;
