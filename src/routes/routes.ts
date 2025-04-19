export const ROUTES = {
  MAIN: "/",
  SHELTERS_PAGE: "/shelters",
  LOGIN: "/login",
  REGISTER: "/register",
  PROFILE: "/profile",
  SHELTER: "/shelter",
  SUPER_ADMIN: "/SuperAdminPanel",
  AUTH: "/auth",
  AUTH_LOGIN: "/auth/login",
  AUTH_REGISTER: "/auth/register",

  SHELTERS_MAP: "/shelters-map",
};

// export const PROFILE_ROUTES = {
//   BASE: ROUTES.PROFILE, // "/profile"
// };

export const PROFILE_NESTED_ROUTES = {
  INFO: "",
  PETS: "pets",
  TRANSACTIONS: "transactions",
  TRACKED: "tracked",
};

export const SHELTER_NESTED_ROUTES = {
  CREATE: "create",
  DETAIL: ":slug",
};

// export const SUPER_ADMIN_ROUTES = {
//   BASE: ROUTES.SUPER_ADMIN,
//   SHELTERS: `${ROUTES.SUPER_ADMIN}/shelters`,
// };
