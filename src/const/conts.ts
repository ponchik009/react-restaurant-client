import { Roles } from "../types/enums";

export const RolesNames = {
  [Roles.KITCHEN]: "Кухня",
  [Roles.MANAGER]: "Менеджер",
  [Roles.WAITER]: "Официант",
};

export const AppRoutes = {
  login: {
    name: "Авторизация",
    url: "/login",
  },
  users: {
    name: "Пользователи",
    url: "/users",
  },
  menu: {
    name: "Меню",
    url: "/menu",
  },
  reports: {
    name: "Отчёты",
    url: "/reports",
  },
  orders: {
    name: "Заказы",
    url: "/orders",
  },
  forbidden: {
    name: "Доступ запрещён",
    url: "/forbidden",
  },
};

export const RolesMenu = {
  [Roles.KITCHEN]: {
    main: {
      ...AppRoutes.orders,
      hide: true,
    },
    orders: {
      ...AppRoutes.orders,
      hide: false,
    },
  },
  [Roles.MANAGER]: {
    main: {
      ...AppRoutes.users,
      hide: true,
    },
    users: {
      ...AppRoutes.users,
      hide: false,
    },
    menu: {
      ...AppRoutes.menu,
      hide: false,
    },
    reports: {
      ...AppRoutes.reports,
      hide: false,
    },
  },
  [Roles.WAITER]: {
    main: {
      ...AppRoutes.orders,
      hide: true,
    },
    orders: {
      ...AppRoutes.orders,
      hide: false,
    },
  },
};
