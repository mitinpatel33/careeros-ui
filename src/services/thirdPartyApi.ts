import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export type ThirdPartyCountry = {
  name: { common: string; official: string };
  cca2: string;
  cca3: string;
  languages?: Record<string, string>;
  flags?: { png: string; svg: string };
};

export type DropdownOption = {
  label: string;
  value: string;
  code?: string;
};

export const thirdPartyApi = createApi({
  reducerPath: "thirdPartyApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://restcountries.com/v3.1" }),
  endpoints: (builder) => ({
    // Fetch all countries in real-time from REST Countries API
    getRealTimeCountries: builder.query<DropdownOption[], void>({
      query: () => "/all?fields=name,cca2",
      transformResponse: (response: ThirdPartyCountry[]): DropdownOption[] => {
        if (!Array.isArray(response)) return [];
        return response
          .map((item) => ({
            label: item.name.common,
            value: item.name.common,
            code: item.cca2,
          }))
          .sort((a, b) => a.label.localeCompare(b.label));
      },
      keepUnusedDataFor: 86400, // Cache for 24h
    }),

    // Fetch all unique languages in real-time from REST Countries API
    getRealTimeLanguages: builder.query<DropdownOption[], void>({
      query: () => "/all?fields=languages",
      transformResponse: (response: Array<{ languages?: Record<string, string> }>): DropdownOption[] => {
        if (!Array.isArray(response)) return [];
        const languageMap = new Map<string, string>();
        response.forEach((item) => {
          if (item.languages) {
            Object.entries(item.languages).forEach(([_code, name]) => {
              languageMap.set(name, name);
            });
          }
        });
        return Array.from(languageMap.values())
          .map((lang) => ({ label: lang, value: lang }))
          .sort((a, b) => a.label.localeCompare(b.label));
      },
      keepUnusedDataFor: 86400,
    }),

    // Fetch nationalities in real-time
    getRealTimeNationalities: builder.query<DropdownOption[], void>({
      query: () => "/all?fields=name,demonyms",
      transformResponse: (response: any[]): DropdownOption[] => {
        if (!Array.isArray(response)) return [];
        const set = new Set<string>();
        response.forEach((item) => {
          const nat = item.demonyms?.eng?.m || item.name?.common;
          if (nat) set.add(nat);
        });
        return Array.from(set)
          .map((nat) => ({ label: nat, value: nat }))
          .sort((a, b) => a.label.localeCompare(b.label));
      },
      keepUnusedDataFor: 86400,
    }),
  }),
});

export const {
  useGetRealTimeCountriesQuery,
  useGetRealTimeLanguagesQuery,
  useGetRealTimeNationalitiesQuery,
} = thirdPartyApi;
