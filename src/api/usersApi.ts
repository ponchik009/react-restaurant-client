import { AxiosError, AxiosInstance } from "axios";
import { IUser } from "../types/apiTypes";

export class UsersApi {
  private instance: AxiosInstance;

  constructor(instance: AxiosInstance) {
    this.instance = instance;
  }

  public async fetchUsers() {
    return this.instance
      .get<IUser[]>("/user", { withCredentials: true })
      .then((response) => response.data);
  }

  public async blockUser(id: number) {
    return this.instance
      .patch<IUser>(`/user/block/${id}`, { withCredentials: true })
      .then((response) => response.data);
  }

  public async unblockUser(id: number) {
    return this.instance
      .patch<IUser>(`/user/unblock/${id}`, { withCredentials: true })
      .then((response) => response.data);
  }
}
