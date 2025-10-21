import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web
import { combineReducers } from "@reduxjs/toolkit";
import authSlice from "@/lib/features/authSlice";
import postsReducer from "@/lib/features/postsSlice";

const persistConfig = {
  key: "root", // clave en localStorage
  storage, // usar localStorage
  whitelist: ["auth", "posts"], // los slice que quiero persistir
  blacklist: [], // no excluir nada
  debug: process.env.NODE_ENV === "development", // debug en desarrollo
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

// Función para forzar rehidratación (mantenida por compatibilidad)
export const forceRehydrate = () => {
  persistor.purge().then(() => {
    persistor.flush();
  });
};

// Guardar en localStorage manual como respaldo
if (typeof window !== "undefined") {
  store.subscribe(() => {
    const state = store.getState();

    // Guardar en localStorage manual como respaldo (array de usuarios)
    if (state.auth.isAuthenticated && state.auth.user) {
      const existingUsers = localStorage.getItem("mockUsers");
      let users = existingUsers ? JSON.parse(existingUsers) : [];

      // Verificar si el usuario ya existe
      const userExists = users.some((u: any) => u.id === state.auth.user!.id);
      if (!userExists) {
        users.push(state.auth.user);
        localStorage.setItem("mockUsers", JSON.stringify(users));
      }
    }
  });
}

// Tipos para TypeScript
export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
