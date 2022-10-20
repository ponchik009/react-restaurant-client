import {
  DishTypes,
  OrderDishStatuses,
  OrderStatuses,
  Roles,
} from "../types/enums";

import { ReactComponent as IconOrders } from "../assets/icons/IconOrders.svg";
import { ReactComponent as IconAddOrder } from "../assets/icons/IconAddOrder.svg";
import { ReactComponent as IconMenu } from "../assets/icons/IconMenu.svg";
import { ReactComponent as IconProfile } from "../assets/icons/IconProfile.svg";
import { ReactComponent as IconOrdersHistory } from "../assets/icons/IconOrdersHistory.svg";

export const RolesNames = {
  [Roles.KITCHEN]: "Кухня",
  [Roles.MANAGER]: "Менеджер",
  [Roles.WAITER]: "Официант",
};

export const AppRoutes = {
  login: {
    name: "Авторизация",
    url: "/login",
    icon: null,
    withBack: false,
  },
  users: {
    name: "Пользователи",
    url: "/users",
    icon: null,
    withBack: false,
  },
  menu: {
    name: "Меню",
    url: "/menu",
    icon: null,
    withBack: false,
  },
  reports: {
    name: "Отчёты",
    url: "/reports",
    icon: null,
    withBack: false,
  },
  orders: {
    name: "Заказы",
    url: "/orders",
    icon: <IconOrders />,
    withBack: false,
  },
  waiterMenu: {
    name: "Меню",
    url: "/waiterMenu",
    icon: <IconMenu />,
    withBack: false,
  },
  addOrder: {
    name: "Создать заказ",
    url: "/addOrder",
    icon: <IconAddOrder />,
    withBack: false,
  },
  ordersHistory: {
    name: "История заказов",
    url: "/ordersHistory",
    icon: <IconOrdersHistory />,
    withBack: false,
  },
  waiterProfile: {
    name: "Профиль",
    url: "/waiterProfile",
    icon: <IconProfile />,
    withBack: false,
  },
  dish: {
    name: "Блюдо Меню",
    url: "/dish/:id",
    icon: null,
    withBack: true,
  },
  kitchenOrders: {
    name: "Активные заказы",
    url: "/kitchenOrders",
    icon: null,
    withBack: false,
  },
  forbidden: {
    name: "Доступ запрещён",
    url: "/forbidden",
    icon: null,
    withBack: false,
  },
  notFound: {
    name: "Страница не найдена",
    url: "/not_found",
    icon: null,
    withBack: false,
  },
};

export const RolesMenu = {
  [Roles.KITCHEN]: {
    main: {
      ...AppRoutes.kitchenOrders,
      hide: true,
    },
    orders: {
      ...AppRoutes.kitchenOrders,
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
    dish: {
      ...AppRoutes.dish,
      hide: true,
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

export const DishStatusesNames = {
  [OrderDishStatuses.SENT]: {
    name: "В ожидании",
    color: "red",
  },
  [OrderDishStatuses.COOKING]: {
    name: "Готовится",
    color: "yellow",
  },
  [OrderDishStatuses.READY]: {
    name: "Готово",
    color: "green",
  },
  [OrderDishStatuses.DELIVERED]: {
    name: "Доставлено",
    color: "green",
  },
  [OrderDishStatuses.CANCELED]: {
    name: "Отменено",
    color: "red",
  },
};
