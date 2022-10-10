import axios from "axios";
import { AuthApi } from "./authApi";
import { MenuApi } from "./menuApi";
import { UsersApi } from "./usersApi";

const instance = axios.create({
  baseURL: "/api",
  timeout: 10000,
});

export const authApi = new AuthApi(instance);
export const usersApi = new UsersApi(instance);
export const menuApi = new MenuApi(instance);
