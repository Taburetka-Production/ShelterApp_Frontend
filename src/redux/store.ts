import { configureStore } from "@reduxjs/toolkit";
import searchReducer from "./slices/searchSlice";
import shelterReducer from "./slices/shelterSlice";
import authReducer from "./slices/authSlice";
export const store = configureStore({
  reducer: {
    auth: authReducer,
    search: searchReducer,
    shelter: shelterReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
