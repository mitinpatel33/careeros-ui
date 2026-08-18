import { api } from "./api";

export const profileApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getProfile: builder.query<any, string>({
      query: (section) => ({
        url: `/candidate/profile/${section}`,
        method: "GET",
      }),
      providesTags: ["Candidate"],
    }),

    updateProfile: builder.mutation<any, { section: string; data: any }>({
      query: ({ section, data }) => ({
        url: `/candidate/profile/${section}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Candidate"],
    }),

    getCompletion: builder.query<any, void>({
      query: () => ({
        url: "/candidate/profile/completion",
        method: "GET",
      }),
      providesTags: ["Candidate"],
    }),

    saveProfileCollection: builder.mutation<
      any,
      {
        section: string;
        data: any;
        id?: string;
      }
    >({
      query: ({ section, data, id }) => ({
        url: id
          ? `/candidate/profile/${section}/${id}`
          : `/candidate/profile/${section}`,

        method: id ? "PUT" : "POST",

        body: data,
      }),

      invalidatesTags: ["Candidate"],
    }),

    getProfileCollection: builder.query<any[], string>({
      query: (section) => ({
        url: `/candidate/profile/${section}`,
        method: "GET",
      }),

      providesTags: ["Candidate"],
    }),

    deleteProfileSection: builder.mutation<any, string>({
      query: (section) => ({
        url: `/candidate/profile/${section}`,
        method: "DELETE",
      }),

      invalidatesTags: ["Candidate"],
    }),

    deleteProfileCollection: builder.mutation<
      any,
      {
        section: string;
        id: string;
      }
    >({
      query: ({ section, id }) => ({
        url: `/candidate/profile/${section}/${id}`,
        method: "DELETE",
      }),

      invalidatesTags: ["Candidate"],
    }),

    checkSlug: builder.query<{ available: boolean }, string>({
      query: (slug) => `/candidate/profile/check-slug?slug=${slug}`,
    }),

    publishProfile: builder.mutation<{ url: string }, { slug: string }>({
      query: ({ slug }) => ({
        url: "/candidate/profile/publish",
        method: "POST",
        body: { slug },
      }),
      invalidatesTags: ["Candidate"],
    }),

    getProfileSections: builder.query<{ success: boolean; data: any }, void>({
      query: () => ({
        url: `/candidate/profile/sections`,
        method: "GET",
      }),
      providesTags: ["Candidate"],
    }),

    // Add these endpoints to your existing candidateProfileApi slice
    getPublishedUrl: builder.query<
      {
        data: {
          profileSlug: string;
          publishedUrl: string;
          isPublished: boolean;
        };
      },
      void
    >({
      query: () => "/published-url",
      providesTags: ["Candidate"],
    }),
    unpublishProfile: builder.mutation<{ success: boolean }, void>({
      query: () => ({
        url: "/unpublish",
        method: "POST",
      }),
      invalidatesTags: ["Candidate"],
    }),
  }),
});

export const {
  useGetProfileQuery,
  useUpdateProfileMutation,
  useSaveProfileCollectionMutation,
  useGetCompletionQuery,
  useGetProfileCollectionQuery,
  useDeleteProfileCollectionMutation,
  useDeleteProfileSectionMutation,
  useCheckSlugQuery,
  usePublishProfileMutation,
  useLazyGetProfileSectionsQuery,
} = profileApi;
