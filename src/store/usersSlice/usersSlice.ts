import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { usersApi } from "../../api/api";
import { RootState, AppThunk } from "../../store/store";
import { ICreateUser, IRole, IUpdateUser, IUser } from "../../types/apiTypes";
import { LoadingStatuses } from "../../types/enums";

export interface UsersSlice {
  users: IUser[] | null;
  fetchAllUsersStatus: LoadingStatuses;
  fetchAllUsersError: string | null;
  currentUser: IUser | null;
  fetchOneUserStatus: LoadingStatuses;
  fetchOneUserError: string | null;
  roles: IRole[] | null;
  fetchSaveUserStatus: LoadingStatuses;
  fetchSaveUserError: string | null;
}

const initialState: UsersSlice = {
  users: null,
  currentUser: null,
  fetchAllUsersStatus: LoadingStatuses.PENDING,
  fetchAllUsersError: null,
  fetchOneUserStatus: LoadingStatuses.FULFILED,
  fetchOneUserError: null,
  roles: null,
  fetchSaveUserStatus: LoadingStatuses.FULFILED,
  fetchSaveUserError: null,
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
        state.fetchAllUsersStatus = LoadingStatuses.PENDING;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.fetchAllUsersStatus = LoadingStatuses.FULFILED;
        state.fetchAllUsersError = null;
        state.users = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.fetchAllUsersError =
          "Произошла ошибка при загрузке пользователей";
        state.fetchAllUsersStatus = LoadingStatuses.REJECTED;
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
        state.fetchOneUserStatus = LoadingStatuses.PENDING;
      })
      .addCase(fetchUserById.fulfilled, (state, action) => {
        state.fetchOneUserStatus = LoadingStatuses.FULFILED;
        state.fetchOneUserError = null;
        state.currentUser = action.payload;
      })
      .addCase(fetchUserById.rejected, (state, action) => {
        state.fetchOneUserError = "Произошла ошибка при загрузке пользователя";
        state.fetchOneUserStatus = LoadingStatuses.REJECTED;
      })
      .addCase(fetchRoles.fulfilled, (state, action) => {
        state.roles = action.payload;
      })
      .addCase(createUser.pending, (state, action) => {
        state.fetchSaveUserStatus = LoadingStatuses.PENDING;
      })
      .addCase(createUser.rejected, (state, action) => {
        state.fetchSaveUserStatus = LoadingStatuses.REJECTED;
      })
      .addCase(createUser.fulfilled, (state, action) => {
        state.fetchSaveUserStatus = LoadingStatuses.FULFILED;
        state.users?.push(action.payload);
      })
      .addCase(updateUser.pending, (state, action) => {
        state.fetchSaveUserStatus = LoadingStatuses.PENDING;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.fetchSaveUserStatus = LoadingStatuses.REJECTED;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.fetchSaveUserStatus = LoadingStatuses.FULFILED;
        state.users =
          state.users?.map((user) =>
            user.id === action.payload.id ? action.payload : user
          ) || null;
      });
  },
});

export const { resetUser } = usersSlice.actions;

export default usersSlice.reducer;
