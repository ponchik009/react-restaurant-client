import axios from "axios";
import { AuthApi } from "./authApi";

const instance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  timeout: 10000,
});

export const authApi = new AuthApi(instance);
