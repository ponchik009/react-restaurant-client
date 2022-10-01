import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { authApi } from "../../api/api";
import { RootState, AppThunk } from "../../store/store";
import { IUser } from "../../types/apiTypes";

export interface AuthState {
  user: IUser | null;
  status: "success" | "loading" | "failed";
  authError: string | null;
}

export interface ILoginParams {
  login: string;
  password: string;
}

const initialState: AuthState = {
  user: null,
  status: "success",
  authError: null,
};

export const login = createAsyncThunk(
  "auth/login",
  async ({ login, password }: ILoginParams) => {
    return authApi.login(login, password);
  }
);

export const fetchUser = createAsyncThunk("auth/fetchUser", async () => {});

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.status = "loading";
      })
      .addCase(login.fulfilled, (state, action) => {
        state.status = "success";
        state.user = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        state.authError = (action.error as AxiosError).message;
        state.status = "failed";
      })
      .addCase(fetchUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.status = "success";
        state.user = null;
      })
      .addCase(fetchUser.rejected, (state) => {
        state.status = "failed";
      });
  },
});

export const {} = authSlice.actions;

export const selectUser = (state: RootState) => state.auth.user;

export default authSlice.reducer;
