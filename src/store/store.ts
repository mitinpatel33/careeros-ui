import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../store/auth/authSlice";
import { api } from "../services/api";
import { thirdPartyApi } from "../services/thirdPartyApi";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    [api.reducerPath]: api.reducer,
    [thirdPartyApi.reducerPath]: thirdPartyApi.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware, thirdPartyApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;