import { api } from "./api";

export const companyProfileApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getCompanyProfile: builder.query<any, string | void>({
      query: (userId) => ({
        url: "/company-profile" + (userId ? `?user_id=${encodeURIComponent(userId)}` : ""),
        method: "GET",
      }),
      transformResponse: (response: any) => response.data,
      providesTags: ["Company"],
    }),

    saveCompanyProfile: builder.mutation<any, any>({
      query: (data) => ({
        url: "/company-profile",
        method: "PUT",
        body: data,
      }),
      transformResponse: (response: any) => response.data,
      invalidatesTags: ["Company"],
    }),

    deleteCompanyProfile: builder.mutation<any, void>({
      query: () => ({
        url: "/company-profile",
        method: "DELETE",
      }),
      invalidatesTags: ["Company"],
    }),

    uploadCompanyLogo: builder.mutation<any, FormData>({
      query: (formData) => ({
        url: "/company-profile/logo",
        method: "POST",
        body: formData,
      }),
      transformResponse: (response: any) => response.data,
      invalidatesTags: ["Company"],
    }),
  }),
});

export const {
  useGetCompanyProfileQuery,
  useSaveCompanyProfileMutation,
  useDeleteCompanyProfileMutation,
  useUploadCompanyLogoMutation,
} = companyProfileApi;