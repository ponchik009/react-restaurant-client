import axios from "axios";
import { AuthApi } from "./authApi";

const instance = axios.create({
  baseURL: "/api",
  timeout: 10000,
});

export const authApi = new AuthApi(instance);
