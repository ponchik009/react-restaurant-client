import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { authApi } from "../../api/api";
import { RootState, AppThunk } from "../../store/store";
import { IUser } from "../../types/apiTypes";
import { LoadingStatuses } from "../../types/enums";

export interface AuthState {
  user: IUser | null;
  status: LoadingStatuses;
  authError: string | null;
}

export interface ILoginParams {
  login: string;
  password: string;
}

const initialState: AuthState = {
  user: null,
  status: LoadingStatuses.PENDING,
  authError: null,
};

export const login = createAsyncThunk(
  "auth/login",
  async ({ login, password }: ILoginParams) => {
    return authApi.login(login, password);
  }
);

export const fetchUser = createAsyncThunk("auth/fetchUser", async () => {
  return authApi.fetchuser();
});

export const logout = createAsyncThunk("auth/logout", async () => {
  return authApi.logout();
});

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.status = LoadingStatuses.PENDING;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.status = LoadingStatuses.FULFILED;
        state.authError = null;
        state.user = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        console.log(action.error);
        state.authError = "Неверные данные для входа!";
        state.status = LoadingStatuses.REJECTED;
      })
      .addCase(fetchUser.pending, (state) => {
        state.status = LoadingStatuses.PENDING;
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.status = LoadingStatuses.FULFILED;
        state.authError = null;
        state.user = action.payload;
      })
      .addCase(fetchUser.rejected, (state) => {
        state.status = LoadingStatuses.REJECTED;
      })
      .addCase(logout.pending, (state) => {
        state.status = LoadingStatuses.PENDING;
      })
      .addCase(logout.fulfilled, (state, action) => {
        state.status = LoadingStatuses.FULFILED;
        state.authError = null;
        state.user = null;
      })
      .addCase(logout.rejected, (state) => {
        state.status = LoadingStatuses.REJECTED;
      });
  },
});

export const {} = authSlice.actions;

export const selectUser = (state: RootState) => state.auth.user;

export default authSlice.reducer;
