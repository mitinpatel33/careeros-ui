import { createSlice } from "@reduxjs/toolkit";

type AuthUser = {
  userId: string;
  fullName: string;
  email: string;
  role: "Candidate" | "Company" | "Admin";
  companyId?: string;
  token: string;
};

type AuthState = {
  user: AuthUser | null;
  token: string | null;
  isAuthenticated: boolean;
};

const user = localStorage.getItem("user");
const token = localStorage.getItem("token");

const initialState: AuthState = {
  user: user ? JSON.parse(user) : null,
  token,
  isAuthenticated: Boolean(token),
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      state.user = action.payload;
      state.token = action.payload.token;
      state.isAuthenticated = true;

      localStorage.setItem("token", action.payload.token);
      localStorage.setItem("user", JSON.stringify(action.payload));
    },

    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    },
  },
});

export const { loginSuccess, logout } = authSlice.actions;
export default authSlice.reducer;