import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web
import { combineReducers } from "@reduxjs/toolkit";
import authSlice from "@features/authSlice";
import postsReducer from "@/lib/features/postsSlice";

// Configuración de persistencia
const persistConfig = {
  key: "root", // clave en localStorage
  storage, // usar localStorage
  whitelist: ["auth", "posts"], // los slice que quiero persistir
};

// Combinar reducers
const rootReducer = combineReducers({
  auth: authSlice,
  posts: postsReducer,
});

// Crear reducer persistido
const persistedReducer = persistReducer(persistConfig, rootReducer);

export const makeStore = () => {
  const store = configureStore({
    reducer: persistedReducer,
    devTools: process.env.NODE_ENV !== "production",
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: false,
      }),
  });
  return store;
};

// Crear persistor
export const store = makeStore();
export const persistor = persistStore(store);

// Tipos para TypeScript
export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
