import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./features/authSlice";
import feedSlice from "./features/feedSlice";

export const makeStore = () => {
  return configureStore({
    reducer: {
      auth: authSlice,
      feed: feedSlice,
    },
    devTools: process.env.NODE_ENV !== "production",
  });
};

// Tipos para TypeScript
export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
