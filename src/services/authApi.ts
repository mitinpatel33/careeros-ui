import { api } from "./api";

export type LoginRequest = {
  email: string;
  password: string;
};

export type SignupRequest = {
  registrationType: "Candidate" | "Company";
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  companyName?: string;
  website?: string;
};

export type AuthResponse = {
  success: boolean;
  message: string;
  data: {
    userId: string;
    fullName: string;
    email: string;
    role: "Candidate" | "Company" | "Admin";
    companyId?: string;
    token: string;
  };
};

export const authApi = api.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<AuthResponse, LoginRequest>({
      query: (body) => ({
        url: "/auth/login",
        method: "POST",
        body,
      }),
    }),

    signup: builder.mutation<AuthResponse, SignupRequest>({
      query: (body) => ({
        url: "/auth/signup",
        method: "POST",
        body,
      }),
    }),
  }),
});

export const { useLoginMutation, useSignupMutation } = authApi;