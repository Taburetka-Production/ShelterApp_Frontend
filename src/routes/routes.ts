export const ROUTES = {
  MAIN: "/",
  SHELTERS_PAGE: "/shelters",
  LOGIN: "/login",
  REGISTER: "/register",
  PROFILE: "/profile",
  SHELTER: "/shelter",
  SUPER_ADMIN: "/SuperAdminPanel",
};

export const PROFILE_ROUTES = {
  BASE: ROUTES.PROFILE,
  INFO: `${ROUTES.PROFILE}`,
  PETS: `${ROUTES.PROFILE}/pets`,
  TRANSACTIONS: `${ROUTES.PROFILE}/transactions`,
  TRACKED: `${ROUTES.PROFILE}/tracked`,
};

export const SHELTER_ROUTES = {
  BASE: ROUTES.SHELTER,
  CREATE: `${ROUTES.SHELTER}/create`,
  DETAIL: (id: string) => `${ROUTES.SHELTER}/${id}`,
};

export const SUPER_ADMIN_ROUTES = {
  BASE: ROUTES.SUPER_ADMIN,
  SHELTERS: `${ROUTES.SUPER_ADMIN}/shelters`,
};
