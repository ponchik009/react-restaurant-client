export enum LoadingStatuses {
  PENDING = "pending",
  FULFILED = "fulfiled",
  REJECTED = "rejected",
}

export enum Roles {
  MANAGER = "manager",
  WAITER = "waiter",
  KITCHEN = "kitchen",
}

export enum OrderStatuses {
  SENT = "sent",
  COOKING = "cooking",
  READY = "ready",
  DELIVERED = "delivered",
  CANCELED = "canceled",
}

export enum OrderDishStatuses {
  SENT = "sent",
  COOKING = "cooking",
  READY = "ready",
  DELIVERED = "delivered",
  CANCELED = "canceled",
}

export enum DishTypes {
  SNACK = "snack",
  SALAD = "salad",
  SOUP = "soup",
  HOTTER = "hotter",
  DRINK = "drink",
}
