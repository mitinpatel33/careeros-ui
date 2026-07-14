import type { CandidateProfileRequest, CandidateProfileResponse, CompletionResponse, PublishProfileResponse } from "../types/candidateProfile.types";
import { api } from "./api";


export const profileApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getProfile: builder.query<CandidateProfileResponse, void>({
      query: () => ({
        url: "/candidate/profile",
        method: "GET",
      }),
      providesTags: ["Candidate"],
    }),

    updateProfile: builder.mutation<
      CandidateProfileResponse,
      CandidateProfileRequest
    >({
      query: (body) => ({
        url: "/candidate/profile",
        method: "PUT",
        body,
      }),
      invalidatesTags: ["Candidate"],
    }),

    publishProfile: builder.mutation<
      PublishProfileResponse,
      void
    >({
      query: () => ({
        url: "/candidate/publish",
        method: "POST",
      }),
      invalidatesTags: ["Candidate"],
    }),

    getCompletion: builder.query<
      CompletionResponse,
      void
    >({
      query: () => ({
        url: "/profile/completion",
      }),
      providesTags: ["Candidate"],
    }),
  }),
});

export const {
  useGetProfileQuery,
  useUpdateProfileMutation,
  usePublishProfileMutation,
  useGetCompletionQuery,
} = profileApi;