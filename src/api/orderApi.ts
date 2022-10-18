import { AxiosError, AxiosInstance } from "axios";

import { ICreateOrder, IOrder } from "../types/apiTypes";
import { socket } from "./api";

export class OrderApi {
  private instance: AxiosInstance;

  constructor(instance: AxiosInstance) {
    this.instance = instance;
  }

  // public async createOrder2(order: ICreateOrder) {
  //   return this.instance
  //     .post<IOrder>(`/order`, order, { withCredentials: true })
  //     .then((response) => response.data);
  // }

  public async createOrder(order: ICreateOrder) {
    socket.emit("createOrder", order);
  }
}
