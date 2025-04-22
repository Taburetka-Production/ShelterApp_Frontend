export const ROUTES = {
  MAIN: "/",
  SHELTERS_PAGE: "/shelters",
  LOGIN: "/login",
  REGISTER: "/register",
  PROFILE: "/profile",
  SHELTER: "/shelter",
  SUPER_ADMIN_PANEL: "/SuperAdminPanel",
  AUTH: "/auth",
  AUTH_LOGIN: "/auth/login",
  AUTH_REGISTER: "/auth/register",
  SHELTERS_MAP: "/shelters-map",
};

export const PROFILE_NESTED_ROUTES = {
  INFO: "",
  PETS: "pets",
  NOTIFICATION: "notifications",
  FAVORITES: "favorites",
};

export const SHELTER_NESTED_ROUTES = {
  CREATE: "create",
  DETAIL: ":slug",
};

export const SUPER_ADMIN_PANEL_NESTED_ROUTES = {
  USERS: "/SuperAdminPanel/users",
  SHELTERS_LIST: "/SuperAdminPanel/shelters",
  // ANIMALS: "animals",
};
