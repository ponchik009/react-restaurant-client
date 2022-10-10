import { AxiosError, AxiosInstance } from "axios";
import {
  ICreateUser,
  IDish,
  IRole,
  IUpdateUser,
  IUser,
} from "../types/apiTypes";

export class MenuApi {
  private instance: AxiosInstance;

  constructor(instance: AxiosInstance) {
    this.instance = instance;
  }

  public async fetchMenu() {
    return this.instance
      .get<IDish[]>("/dish", { withCredentials: true })
      .then((response) => response.data);
  }

  public async fetchDishById(id: number) {
    return this.instance
      .get<IDish>(`/dish/${id}`, { withCredentials: true })
      .then((response) => response.data);
  }

  public async createDish(formData: FormData) {
    return this.instance
      .post<IDish>(`/dish/`, formData, { withCredentials: true })
      .then((response) => response.data);
  }

  public async updateDish(id: number, formData: FormData) {
    return this.instance
      .patch<IDish>(`/dish/${id}`, formData, { withCredentials: true })
      .then((response) => response.data);
  }
}
