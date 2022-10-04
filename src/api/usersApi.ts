import { AxiosError, AxiosInstance } from "axios";
import { ICreateUser, IRole, IUpdateUser, IUser } from "../types/apiTypes";

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

  public async getById(id: number) {
    return this.instance
      .get<IUser>(`/user/${id}`, { withCredentials: true })
      .then((response) => response.data);
  }

  public async getRoles() {
    return this.instance
      .get<IRole[]>(`/user/roles`, { withCredentials: true })
      .then((response) => response.data);
  }

  public async createUser(user: ICreateUser) {
    return this.instance
      .post<IUser>(`/auth/register`, user, { withCredentials: true })
      .then((response) => response.data);
  }

  public async updateUser(user: IUpdateUser) {
    return this.instance
      .patch<IUser>(`/user/${user.id}`, user, { withCredentials: true })
      .then((response) => response.data);
  }
}
