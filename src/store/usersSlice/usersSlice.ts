import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { usersApi } from "../../api/api";
import { RootState, AppThunk } from "../../store/store";
import { ICreateUser, IRole, IUpdateUser, IUser } from "../../types/apiTypes";
import { LoadingStatuses } from "../../types/enums";

export interface UsersSlice {
  users: IUser[] | null;
  currentUser: IUser | null;
  fetchUsersStatus: LoadingStatuses;
  fetchUsersError: string | null;
  fetchUserStatus: LoadingStatuses;
  fetchUserError: string | null;
  roles: IRole[] | null;
}

const initialState: UsersSlice = {
  users: null,
  currentUser: null,
  fetchUsersStatus: LoadingStatuses.PENDING,
  fetchUsersError: null,
  fetchUserStatus: LoadingStatuses.PENDING,
  fetchUserError: null,
  roles: null,
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

export const fetchUserById = createAsyncThunk(
  "users/fetchUserById",
  async (id: number) => {
    return usersApi.getById(id);
  }
);

export const fetchRoles = createAsyncThunk("users/fetchRoles", async () => {
  return usersApi.getRoles();
});

export const createUser = createAsyncThunk(
  "users/createUser",
  async (user: ICreateUser) => {
    return usersApi.createUser(user);
  }
);

export const updateUser = createAsyncThunk(
  "users/updateUser",
  async (user: IUpdateUser) => {
    return usersApi.updateUser(user);
  }
);

export const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    resetUser: (state) => {
      state.currentUser = null;
    },
  },
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
        state.fetchUsersStatus = LoadingStatuses.REJECTED;
      })

      .addCase(blockUser.fulfilled, (state, action) => {
        state.users =
          state.users?.map((user) =>
            user.id === action.payload.id ? action.payload : user
          ) || null;
      })

      .addCase(unblockUser.fulfilled, (state, action) => {
        state.users =
          state.users?.map((user) =>
            user.id === action.payload.id ? action.payload : user
          ) || null;
      })
      .addCase(fetchUserById.pending, (state, action) => {
        state.fetchUserStatus = LoadingStatuses.PENDING;
      })
      .addCase(fetchUserById.fulfilled, (state, action) => {
        state.fetchUserStatus = LoadingStatuses.FULFILED;
        state.fetchUserError = null;
        state.currentUser = action.payload;
      })
      .addCase(fetchUserById.rejected, (state, action) => {
        state.fetchUserError = "Произошла ошибка при загрузке пользователя";
        state.fetchUserStatus = LoadingStatuses.REJECTED;
      })
      .addCase(fetchRoles.fulfilled, (state, action) => {
        state.roles = action.payload;
      })
      .addCase(createUser.pending, (state, action) => {
        state.fetchUserStatus = LoadingStatuses.PENDING;
      })
      .addCase(createUser.fulfilled, (state, action) => {
        state.fetchUserError = LoadingStatuses.FULFILED;
        state.users?.push(action.payload);
      })
      .addCase(updateUser.pending, (state, action) => {
        state.fetchUserStatus = LoadingStatuses.PENDING;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.fetchUserError = LoadingStatuses.FULFILED;
        state.users =
          state.users?.map((user) =>
            user.id === action.payload.id ? action.payload : user
          ) || null;
      });
  },
});

export const { resetUser } = usersSlice.actions;

export default usersSlice.reducer;
