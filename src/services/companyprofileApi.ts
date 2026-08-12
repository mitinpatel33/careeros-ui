import { api } from "./api";
import type { CompanyProfile } from "../types/company.types";

export const companyProfileApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getCompanyProfile: builder.query<CompanyProfile, void>({
      query: () => ({
        url: "/company/profile",
        method: "GET",
      }),
      transformResponse: (response: { success: boolean; data: CompanyProfile }) => response.data,
      providesTags: ["Company"],
    }),

    saveCompanyProfile: builder.mutation<CompanyProfile, Partial<CompanyProfile>>({
      query: (data) => ({
        url: "/company/profile",
        method: "PUT",
        body: data,
      }),
      transformResponse: (response: { success: boolean; data: CompanyProfile }) => response.data,
      invalidatesTags: ["Company"],
    }),

    uploadCompanyLogo: builder.mutation<CompanyProfile, FormData>({
      query: (formData) => ({
        url: "/company/profile/logo",
        method: "POST",
        body: formData,
      }),
      transformResponse: (response: { success: boolean; data: CompanyProfile }) => response.data,
      invalidatesTags: ["Company"],
    }),

    deleteCompanyProfile: builder.mutation<null, void>({
      query: () => ({
        url: "/company/profile",
        method: "DELETE",
      }),
      invalidatesTags: ["Company"],
    }),
  }),
});

export const {
  useGetCompanyProfileQuery,
  useSaveCompanyProfileMutation,
  useUploadCompanyLogoMutation,
  useDeleteCompanyProfileMutation,
} = companyProfileApi;