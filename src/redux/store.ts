import { configureStore } from "@reduxjs/toolkit";
import searchReducer from "./slices/searchSlice";
import shelterReducer from "./slices/shelterSlice";

export const store = configureStore({
  reducer: {
    search: searchReducer,
    shelter: shelterReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
