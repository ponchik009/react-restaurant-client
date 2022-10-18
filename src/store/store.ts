import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";

import authReducer from "./authSlice/authSlice";
import menuSlice from "./menuSlice/menuSlice";
import ordersSlice from "./orderSlice/ordersSlice";
import usersSlice from "./usersSlice/usersSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    users: usersSlice,
    menu: menuSlice,
    orders: ordersSlice,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
