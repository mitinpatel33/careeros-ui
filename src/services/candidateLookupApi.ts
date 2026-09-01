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

// Indian standard qualifications and degrees
const INDIAN_DEGREES: DropdownOption[] = [
  "10th Standard (SSC / CBSE / ICSE)",
  "12th Standard (HSC / CBSE / ISC)",
  "Diploma in Engineering",
  "Bachelor of Technology (B.Tech)",
  "Bachelor of Engineering (B.E.)",
  "Bachelor of Computer Applications (BCA)",
  "Bachelor of Science (B.Sc)",
  "Bachelor of Commerce (B.Com)",
  "Bachelor of Business Administration (BBA)",
  "Bachelor of Arts (B.A.)",
  "Bachelor of Architecture (B.Arch)",
  "Bachelor of Pharmacy (B.Pharm)",
  "Bachelor of Design (B.Des)",
  "Bachelor of Medicine, Bachelor of Surgery (MBBS)",
  "Bachelor of Laws (LL.B.)",
  "Master of Technology (M.Tech)",
  "Master of Computer Applications (MCA)",
  "Master of Science (M.Sc)",
  "Master of Business Administration (MBA)",
  "Master of Commerce (M.Com)",
  "Master of Arts (M.A.)",
  "Master of Pharmacy (M.Pharm)",
  "Master of Laws (LL.M.)",
  "Doctor of Philosophy (Ph.D.)",
].map((degree) => ({ label: degree, value: degree }));

const REST_COUNTRIES_API_KEY = "rc_live_ac49546ec9894eee82bbb585e19f5af0";

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
        const limit = 100;
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

    // ✅ FIXED: Returns Indian degrees instantly without hitting external APIs or CORS
    getDegrees: builder.query<DropdownOption[], void>({
      queryFn: () => {
        return { data: INDIAN_DEGREES };
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
            value: displayLabel,
          };
        });
      },
      keepUnusedDataFor: 300,
    }),
  }),
});

export const {
  useGetNationalitiesQuery,
  useGetDegreesQuery,
  useGetSkillOptionsQuery,
} = candidateLookupApi;
