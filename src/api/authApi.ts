import { AxiosError, AxiosInstance } from "axios";
import { IUser } from "../types/apiTypes";

export class AuthApi {
  private instance: AxiosInstance;

  constructor(instance: AxiosInstance) {
    this.instance = instance;
  }

  public async login(login: string, password: string) {
    return this.instance
      .post<IUser>("/auth/login", {
        login,
        password,
      })
      .then((response) => response.data);
  }

  public async fetchuser() {
    return this.instance.get<IUser>("/auth/").then((response) => response.data);
  }
}
