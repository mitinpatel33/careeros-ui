import { api } from "./api";

export type DropdownOption = {
  label: string;
  value: string;
};

export interface SkillSuggestion {
  title?: string;
  preferredLabel?: { en?: string } | string;
  uri: string;
}

const REST_COUNTRIES_API_KEY = "rc_live_ac49546ec9894eee82bbb585e19f5af0"; // ideally proxied via your backend, not exposed client-side

interface RestCountryV5 {
  names?: { common?: string };
  demonyms?: { eng?: { m?: string; f?: string } };
  codes?: { alpha_2?: string };
}

export const candidateLookupApi = api.injectEndpoints({
  endpoints: (builder) => ({
    // Third-party API call for Nationalities / Countries
    getNationalities: builder.query<DropdownOption[], void>({
      queryFn: async (_arg, _api, _extra, baseQuery) => {
        const allObjects: RestCountryV5[] = [];
        const limit = 100; // free-plan max
        let offset = 0;
        let more = true;

        while (more) {
          const result = await baseQuery({
            url: `https://api.restcountries.com/countries/v5?response_fields=names.common,demonyms,codes.alpha_2&limit=${limit}&offset=${offset}`,
            headers: { Authorization: `Bearer ${REST_COUNTRIES_API_KEY}` },
          });

          if (result.error) return { error: result.error };

          const payload = result.data as {
            data: { objects: RestCountryV5[]; meta: { more: boolean } };
          };

          allObjects.push(...payload.data.objects);
          more = payload.data.meta.more;
          offset += limit;
        }

        const options = allObjects
          .map((country) => {
            const nationalityLabel =
              country.demonyms?.eng?.m || country.names?.common || "";
            return {
              label: nationalityLabel,
              value: country.codes?.alpha_2 || nationalityLabel,
            };
          })
          .filter((item) => item.label !== "")
          .sort((a, b) => a.label.localeCompare(b.label));

        return { data: options };
      },
    }),

    getDegrees: builder.query<DropdownOption[], void>({
      query: () =>
        "https://datausa.io/api/data?measures=SubgroupId&drilldowns=Degree",
      transformResponse: (res: { data: Array<{ Degree: string }> }) => {
        if (!res?.data || !Array.isArray(res.data)) return [];

        // Remove duplicates and extract degree titles
        const uniqueDegrees = Array.from(
          new Set(res.data.map((item) => item.Degree)),
        );

        return uniqueDegrees.map((degree) => ({
          label: degree,
          value: degree,
        }));
      },
    }),

    // ─── Skills (ESCO API) ──────────────────────────────────────────────────────
    getSkillOptions: builder.query<DropdownOption[], string>({
      query: (search: string) => {
        if (!search || search.trim().length < 2) {
          return { url: "", skip: true };
        }
        return {
          url: `suggest2?text=${encodeURIComponent(search.trim())}&language=en&type=skill`,
        };
      },
      transformResponse: (res: {
        _embedded?: { result?: SkillSuggestion[] };
      }): DropdownOption[] => {
        const items = res?._embedded?.result;
        if (!Array.isArray(items)) return [];

        return items.map((item) => {
          // Extract a human‑readable label
          let label = item.title || "";
          if (!label) {
            if (typeof item.preferredLabel === "string") {
              label = item.preferredLabel;
            } else if (item.preferredLabel?.en) {
              label = item.preferredLabel.en;
            }
          }
          const displayLabel = label || "Unnamed Skill";

          return {
            label: displayLabel,
            // ✅ FIX: store the skill name, not the URI
            value: displayLabel,
          };
        });
      },
      keepUnusedDataFor: 300, // 5 minutes cache
    }),
  }),
});

export const {
  useGetNationalitiesQuery,
  useGetDegreesQuery,
  useGetSkillOptionsQuery,
} = candidateLookupApi;
