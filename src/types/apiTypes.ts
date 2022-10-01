import { Roles } from "./enums";

export interface IUser {
  id: number;
  name: string;
  login: string;
  role: IRole;
}

export interface IRole {
  id: number;
  name: Roles;
}
