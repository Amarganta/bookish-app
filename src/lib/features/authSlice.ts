import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AuthUser } from "@/types/types";
import { store } from "@/lib/store";

export interface AuthState {
  user: AuthUser | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    loginSuccess: (state, action: PayloadAction<AuthUser>) => {
      state.loading = false;
      state.user = action.payload;
      state.isAuthenticated = true;
      state.error = null;

      // Forzar persistencia manual después del registro
      setTimeout(() => {
        // Capturar el estado correct del usuario recien creado
        const correctAuthState = {
          user: action.payload,
          isAuthenticated: true,
          loading: false,
          error: null,
        };

        // Forzar que Redux Persist guarde el estado correcto
        const currentState = store.getState();
        const persistData = {
          auth: JSON.stringify(correctAuthState),
          posts: JSON.stringify(currentState.posts),
          _persist: JSON.stringify({ version: -1, rehydrated: true }),
        };
        localStorage.setItem("persist:root", JSON.stringify(persistData));
      }, 1000);
    },
    loginFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
      state.isAuthenticated = false;
      state.user = null;
    },
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.loading = false;
      state.error = null;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
});

export const { loginStart, loginSuccess, loginFailure, logout, clearError } =
  authSlice.actions;

// Exportar reducer sin persistencia (se maneja en store.ts)
export default authSlice.reducer;
