import axios from "axios";
import { io } from "socket.io-client";
import { parse } from "cookie";

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

export const socket = io(process.env.REACT_APP_SOCKET_URL || "localhost:7778", {
  withCredentials: true,
  transports: ["websocket", "polling", "flashsocket"],
});

const COOKIE_NAME = "Authentication";

socket.io.on("open", () => {
  socket.io.engine.transport.on("pollComplete", () => {
    const request = socket.io.engine.transport.pollXhr.xhr;
    const cookieHeader = request.getResponseHeader("set-cookie");
    if (!cookieHeader) {
      return;
    }
    cookieHeader.forEach((cookieString: string) => {
      if (cookieString.includes(`${COOKIE_NAME}=`)) {
        const cookie = parse(cookieString);
        console.log(cookie);
        socket.io.opts.extraHeaders = {
          cookie: `${COOKIE_NAME}=${cookie[COOKIE_NAME]}`,
        };
      }
    });
  });
});
