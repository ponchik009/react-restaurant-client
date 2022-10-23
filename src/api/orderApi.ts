import { AxiosError, AxiosInstance } from "axios";

import {
  ICreateOrder,
  IOrder,
  IReportByDishesItem,
  IUser,
} from "../types/apiTypes";
import { socket } from "./api";

export class OrderApi {
  private instance: AxiosInstance;

  constructor(instance: AxiosInstance) {
    this.instance = instance;
  }

  public async createOrder(order: ICreateOrder, waiter: IUser) {
    const response = socket.emit("createOrder", order, waiter);
    if (!response.connected) throw new Error("Нет соеднения с сервером");
  }

  public async getOrdersForKitchen() {
    return this.instance
      .get<IOrder[]>("/order/for_kitchen", { withCredentials: true })
      .then((response) => response.data);
  }

  public async getOrdersByWaiter() {
    return this.instance
      .get<IOrder[]>("/order/by_waiter", { withCredentials: true })
      .then((response) => response.data);
  }

  public async getReportByDishes(
    ids: number[],
    dateStart?: Date,
    dateEnd?: Date
  ) {
    let query = "?dish_ids=" + ids.join(",");
    if (dateStart) query += "&date_start=" + dateStart;
    if (dateEnd) query += "&date_end=" + dateEnd;
    return this.instance
      .get<IReportByDishesItem[]>(`/order/reportByDishes${query}`, {
        withCredentials: true,
      })
      .then((response) => response.data);
  }
}
