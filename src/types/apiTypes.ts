import { DishTypes, Roles } from "./enums";

export interface IUser {
  id: number;
  name: string;
  login: string;
  role: IRole;
  deletedAt: null | Date;
}

export interface ICreateUser {
  name: string;
  login: string;
  password: string;
  roleId: number;
}

export interface IUpdateUser {
  id: number;
  name?: string;
  login?: string;
  password?: string;
  role?: IRoleId;
}

export interface IRoleId {
  id: number;
}

export interface IRole {
  id: number;
  name: Roles;
}

export interface IDish {
  id: number;
  name: string;
  description: string;
  ingredients: string;
  price: number;
  cookingTime: number;
  image: string;
  weight: number;
  calories: number;
  isVegan: boolean;
  isAlcoholic: boolean;
  dishType: DishTypes;
}
