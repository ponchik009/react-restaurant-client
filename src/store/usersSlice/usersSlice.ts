import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { usersApi } from "../../api/api";
import { RootState, AppThunk } from "../../store/store";
import { IUser } from "../../types/apiTypes";
import { LoadingStatuses } from "../../types/enums";

export interface UsersSlice {
  users: IUser[] | null;
  currentUser: IUser | null;
  fetchUsersStatus: LoadingStatuses;
  fetchUsersError: string | null;
  fetchUserStatus: LoadingStatuses;
  fetchUserError: string | null;
}

const initialState: UsersSlice = {
  users: null,
  currentUser: null,
  fetchUsersStatus: LoadingStatuses.PENDING,
  fetchUsersError: null,
  fetchUserStatus: LoadingStatuses.PENDING,
  fetchUserError: null,
};

export const fetchUsers = createAsyncThunk("users/fetchUsers", async () => {
  return usersApi.fetchUsers();
});

export const blockUser = createAsyncThunk(
  "users/blockUser",
  async (id: number) => {
    return usersApi.blockUser(id);
  }
);

export const unblockUser = createAsyncThunk(
  "users/unblockUser",
  async (id: number) => {
    return usersApi.unblockUser(id);
  }
);

export const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.fetchUserStatus = LoadingStatuses.PENDING;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.fetchUserStatus = LoadingStatuses.FULFILED;
        state.fetchUsersError = null;
        state.users = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.fetchUsersError = "Произошла ошибка при загрузке пользователей";
        state.fetchUserStatus = LoadingStatuses.REJECTED;
      })
      .addCase(blockUser.pending, (state) => {
        // state.fetchUserStatus = LoadingStatuses.PENDING;
      })
      .addCase(blockUser.fulfilled, (state, action) => {
        state.users =
          state.users?.map((user) =>
            user.id === action.payload.id ? action.payload : user
          ) || null;
        // state.fetchUserStatus = LoadingStatuses.FULFILED;
        // state.fetchUsersError = null;
        // state.users = action.payload;
      })
      .addCase(blockUser.rejected, (state, action) => {
        // state.fetchUsersError = "Произошла ошибка при загрузке пользователей";
        // state.fetchUserStatus = LoadingStatuses.REJECTED;
      })
      .addCase(unblockUser.pending, (state) => {
        // state.fetchUserStatus = LoadingStatuses.PENDING;
      })
      .addCase(unblockUser.fulfilled, (state, action) => {
        state.users =
          state.users?.map((user) =>
            user.id === action.payload.id ? action.payload : user
          ) || null;
        // state.fetchUserStatus = LoadingStatuses.FULFILED;
        // state.fetchUsersError = null;
        // state.users = action.payload;
      })
      .addCase(unblockUser.rejected, (state, action) => {
        // state.fetchUsersError = "Произошла ошибка при загрузке пользователей";
        // state.fetchUserStatus = LoadingStatuses.REJECTED;
      });
  },
});

export const {} = usersSlice.actions;

export default usersSlice.reducer;
