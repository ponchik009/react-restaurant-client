import { DishTypes, Roles } from "../types/enums";

import {ReactComponent as IconOrders} from '../assets/icons/IconOrders.svg';
import {ReactComponent as IconAddOrder} from '../assets/icons/IconAddOrder.svg';
import {ReactComponent as IconMenu} from '../assets/icons/IconMenu.svg';
import {ReactComponent as IconProfile} from '../assets/icons/IconProfile.svg';
import {ReactComponent as IconOrdersHistory} from '../assets/icons/IconOrdersHistory.svg';

export const RolesNames = {
  [Roles.KITCHEN]: "Кухня",
  [Roles.MANAGER]: "Менеджер",
  [Roles.WAITER]: "Официант",
};

export const AppRoutes = {
  login: {
    name: "Авторизация",
    url: "/login",
    icon: null
  },
  users: {
    name: "Пользователи",
    url: "/users",
    icon: null
  },
  menu: {
    name: "Меню",
    url: "/menu",
    icon: null
  },
  reports: {
    name: "Отчёты",
    url: "/reports",
    icon: null
  },
  orders: {
    name: "Заказы",
    url: "/orders",
    icon: <IconOrders />
  },
  waiterMenu: {
    name: "Меню",
    url: "/waiterMenu",
    icon: <IconMenu />
  },
  addOrder: {
    name: "Создать заказ",
    url: "/addOrder",
    icon: <IconAddOrder />
  },
  ordersHistory: {
    name: "История заказов",
    url: "/ordersHistory",
    icon: <IconOrdersHistory />
  },
  waiterProfile: {
    name: "Профиль",
    url: "/waiterProfile",
    icon: <IconProfile />
  },
  forbidden: {
    name: "Доступ запрещён",
    url: "/forbidden",
    icon: null
  },
  notFound: {
    name: "Страница не найдена",
    url: "/not_found",
    icon: null
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
    waiterMenu: {
      ...AppRoutes.waiterMenu,
      hide: false,
    },
    addOrder: {
      ...AppRoutes.addOrder,
      hide: false,
    },
    ordersHistory: {
      ...AppRoutes.ordersHistory,
      hide: false,
    },
    waiterProfile: {
      ...AppRoutes.waiterProfile,
      hide: false,
    },
  },
};

export const DishTypesNames = {
  [DishTypes.DRINK]: "Напитки",
  [DishTypes.HOTTER]: "Горячее",
  [DishTypes.SALAD]: "Салаты",
  [DishTypes.SNACK]: "Закуски",
  [DishTypes.SOUP]: "Супы",
};
