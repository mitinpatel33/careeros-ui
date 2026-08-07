import { api } from "./api";

// Shape of the raw API envelope every endpoint here returns
interface ApiEnvelope<T> {
  success: boolean;
  message: string;
  data: T;
  meta?: { timestamp: string };
}

interface CompanyProfile {
  _id: string;
  userId: string;
  logoUrl?: string;
  verificationStatus: string;
  aboutCompany: string;
  companyEmail: string;
  companyName: string;
  companySize: string;
  industry: string;
  location: string;
  website: string;
  createdAt: string;
  updatedAt: string;
}

export const companyProfileApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getCompanyProfile: builder.query<CompanyProfile, string | void>({
      query: (userId) => ({
        url: "/company-profile" + (userId ? `?user_id=${encodeURIComponent(userId)}` : ""),
        method: "GET",
      }),
      // Unwrap the envelope so consumers get the profile object directly
      transformResponse: (response: ApiEnvelope<CompanyProfile>) => response.data,
      providesTags: ["Company"],
    }),

    saveCompanyProfile: builder.mutation<CompanyProfile, any>({
      query: (data) => ({
        url: "/company-profile",
        method: "PUT",
        body: data,
      }),
      transformResponse: (response: ApiEnvelope<CompanyProfile>) => response.data,
      invalidatesTags: ["Company"],
    }),

    deleteCompanyProfile: builder.mutation<any, void>({
      query: () => ({
        url: "/company-profile",
        method: "DELETE",
      }),
      invalidatesTags: ["Company"],
    }),

    uploadCompanyLogo: builder.mutation<CompanyProfile, FormData>({
      query: (formData) => ({
        url: "/company-profile/logo",
        method: "POST",
        body: formData,
      }),
      transformResponse: (response: ApiEnvelope<CompanyProfile>) => response.data,
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