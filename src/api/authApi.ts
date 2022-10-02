import { AxiosError, AxiosInstance } from "axios";
import { IUser } from "../types/apiTypes";

export class AuthApi {
  private instance: AxiosInstance;

  constructor(instance: AxiosInstance) {
    this.instance = instance;
  }

  public async login(login: string, password: string) {
    return this.instance
      .post<IUser>(
        "/auth/login",
        {
          login,
          password,
        },
        { withCredentials: true }
      )
      .then((response) => response.data);
  }

  public async fetchuser() {
    return this.instance
      .get<IUser>("/auth/", { withCredentials: true })
      .then((response) => response.data);
  }

  public async logout() {
    return this.instance
      .post("/auth/logout", { withCredentials: true })
      .then((response) => response.data);
  }
}
