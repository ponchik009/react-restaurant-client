import axios from "axios";
import { io } from "socket.io-client";
import { AuthApi } from "./authApi";
import { MenuApi } from "./menuApi";
import { OrderApi } from "./orderApi";
import { UsersApi } from "./usersApi";

const instance = axios.create({
  baseURL: "/api",
  timeout: 10000,
});

export const authApi = new AuthApi(instance);
export const usersApi = new UsersApi(instance);
export const menuApi = new MenuApi(instance);
export const orderApi = new OrderApi(instance);

export const socket = io("ws://localhost:7778");
