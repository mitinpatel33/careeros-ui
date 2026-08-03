import { api } from "./api";

export const aiApi = api.injectEndpoints({
  endpoints: (builder) => ({
    generateSummary: builder.mutation({
      query: (userData) => ({
        url: "/ai/generate-summary",
        method: "POST",
        body: userData,
      }),
    }),

    suggestSkills: builder.mutation({
      query: (jobTitle) => ({
        url: "/ai/suggest-skills",
        method: "POST",
        body: { jobTitle },
      }),
    }),

    enhanceDescription: builder.mutation({
      query: (text) => ({
        url: "/ai/enhance-description",
        method: "POST",
        body: { text },
      }),
    }),

    suggectSocial: builder.mutation({
      query: (jobTitle) => ({
        url: "/ai/suggest-social",
        method: "POST",
        body: { jobTitle },
      }),
    }),

    suggestCertificates: builder.mutation({
      query: ({ jobTitle, skills }) => ({
        url: "/ai/suggest-certificate",
        method: "POST",
        body: { jobTitle, skills },
      }),
    }),
  }),
});

export const {
  useGenerateSummaryMutation,
  useSuggestSkillsMutation,
  useEnhanceDescriptionMutation,
  useSuggectSocialMutation,
  useSuggestCertificatesMutation,
} = aiApi;
