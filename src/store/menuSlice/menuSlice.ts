import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { menuApi } from "../../api/api";
import { RootState, AppThunk } from "../store";
import { IDish } from "../../types/apiTypes";
import { LoadingStatuses } from "../../types/enums";

export interface MenuState {
  menu: IDish[] | null;
  fetchMenuStatus: LoadingStatuses;
  fetchMenuError: string | null;
  dish: IDish | null;
  fetchDishStatus: LoadingStatuses;
  fetchDishError: string | null;
  saveDishStatus: LoadingStatuses | null;
  saveDishError: string | null;
}

const initialState: MenuState = {
  menu: null,
  fetchMenuStatus: LoadingStatuses.PENDING,
  fetchMenuError: null,
  dish: null,
  fetchDishStatus: LoadingStatuses.FULFILED,
  fetchDishError: null,
  saveDishStatus: null,
  saveDishError: null,
};

export const fetchMenu = createAsyncThunk("menu/fetchMenu", async () => {
  return menuApi.fetchMenu();
});

export const fetchDish = createAsyncThunk(
  "menu/fetchDish",
  async (id: number) => {
    return menuApi.fetchDishById(id);
  }
);

export const createDish = createAsyncThunk(
  "menu/createDish",
  async (formData: FormData) => {
    return menuApi.createDish(formData);
  }
);

interface IUpdateDish {
  id: number;
  data: FormData;
}

export const updateDish = createAsyncThunk(
  "menu/updateDish",
  async (updateDishData: IUpdateDish) => {
    return menuApi.updateDish(updateDishData.id, updateDishData.data);
  }
);

export const menuSlice = createSlice({
  name: "menu",
  initialState,
  reducers: {
    resetDish(state) {
      state.fetchDishStatus = LoadingStatuses.FULFILED;
      state.fetchDishError = null;
      state.dish = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMenu.pending, (state) => {
        state.fetchMenuStatus = LoadingStatuses.PENDING;
      })
      .addCase(fetchMenu.fulfilled, (state, action) => {
        state.fetchMenuStatus = LoadingStatuses.FULFILED;
        state.fetchMenuError = null;
        state.menu = action.payload;
      })
      .addCase(fetchMenu.rejected, (state, action) => {
        console.log(action.error);
        state.fetchMenuError = LoadingStatuses.REJECTED;
        state.fetchMenuError = "Не удалось получить данные о меню";
      })
      .addCase(fetchDish.pending, (state) => {
        state.fetchDishStatus = LoadingStatuses.PENDING;
      })
      .addCase(fetchDish.fulfilled, (state, action) => {
        state.fetchDishStatus = LoadingStatuses.FULFILED;
        state.fetchDishError = null;
        state.dish = action.payload;
      })
      .addCase(fetchDish.rejected, (state) => {
        state.fetchDishError = LoadingStatuses.REJECTED;
      })
      .addCase(createDish.pending, (state) => {
        state.saveDishStatus = LoadingStatuses.PENDING;
      })
      .addCase(createDish.fulfilled, (state, action) => {
        state.saveDishStatus = LoadingStatuses.FULFILED;
        state.dish = null;
        state.menu?.push(action.payload);
        state.saveDishError = null;
      })
      .addCase(createDish.rejected, (state) => {
        state.saveDishError = LoadingStatuses.REJECTED;
      })
      .addCase(updateDish.pending, (state) => {
        state.saveDishStatus = LoadingStatuses.PENDING;
      })
      .addCase(updateDish.fulfilled, (state, action) => {
        state.saveDishStatus = LoadingStatuses.FULFILED;
        state.dish = null;
        state.menu =
          state.menu?.map((dish) =>
            dish.id === action.payload.id ? action.payload : dish
          ) || null;
        state.saveDishError = null;
      })
      .addCase(updateDish.rejected, (state) => {
        state.saveDishError = LoadingStatuses.REJECTED;
      });
  },
});

export const { resetDish } = menuSlice.actions;

export default menuSlice.reducer;
