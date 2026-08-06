import { api } from "./api";

export type DropdownOption = {
  label: string;
  value: string;
};

export const candidateLookupApi = api.injectEndpoints({
  endpoints: (builder) => ({
    // Dynamic Gender options
    getGenders: builder.query<DropdownOption[], void>({
      query: () => "/candidate/lookups/genders",
      transformResponse: (res: any) =>
        res?.data || [
          { label: "Male", value: "Male" },
          { label: "Female", value: "Female" },
          { label: "Other", value: "Other" },
          { label: "Prefer not to say", value: "Prefer not to say" },
        ],
    }),

    // Dynamic Marital Status options
    getMaritalStatuses: builder.query<DropdownOption[], void>({
      query: () => "/candidate/lookups/marital-status",
      transformResponse: (res: any) =>
        res?.data || [
          { label: "Single", value: "Single" },
          { label: "Married", value: "Married" },
          { label: "Divorced", value: "Divorced" },
          { label: "Widowed", value: "Widowed" },
        ],
    }),

    // Dynamic Employment Type options
    getEmploymentTypes: builder.query<DropdownOption[], void>({
      query: () => "/candidate/lookups/employment-types",
      transformResponse: (res: any) =>
        res?.data || [
          { label: "Full-Time", value: "Full-Time" },
          { label: "Part-Time", value: "Part-Time" },
          { label: "Contract", value: "Contract" },
          { label: "Freelance", value: "Freelance" },
          { label: "Internship", value: "Internship" },
          { label: "Remote", value: "Remote" },
        ],
    }),

    // Dynamic Academic Degrees
    getDegrees: builder.query<DropdownOption[], void>({
      query: () => "/candidate/lookups/degrees",
      transformResponse: (res: any) =>
        res?.data || [
          { label: "High School Diploma", value: "High School Diploma" },
          { label: "Associate Degree", value: "Associate Degree" },
          { label: "Bachelor of Science (B.S.)", value: "Bachelor of Science (B.S.)" },
          { label: "Bachelor of Arts (B.A.)", value: "Bachelor of Arts (B.A.)" },
          { label: "Bachelor of Technology (B.Tech)", value: "Bachelor of Technology (B.Tech)" },
          { label: "Master of Science (M.S.)", value: "Master of Science (M.S.)" },
          { label: "Master of Business Administration (MBA)", value: "Master of Business Administration (MBA)" },
          { label: "Doctor of Philosophy (Ph.D.)", value: "Doctor of Philosophy (Ph.D.)" },
        ],
    }),

    // Dynamic Skill Proficiency Levels
    getProficiencyLevels: builder.query<DropdownOption[], void>({
      query: () => "/candidate/lookups/proficiency-levels",
      transformResponse: (res: any) =>
        res?.data || [
          { label: "Beginner", value: "Beginner" },
          { label: "Intermediate", value: "Intermediate" },
          { label: "Advanced", value: "Advanced" },
          { label: "Expert", value: "Expert" },
          { label: "Native / Bilingual", value: "Native / Bilingual" },
        ],
    }),

    // Dynamic Skill Suggestions
    getSkillOptions: builder.query<DropdownOption[], string | void>({
      query: (search) => `/candidate/lookups/skills${search ? `?q=${search}` : ""}`,
      transformResponse: (res: any) =>
        res?.data || [
          { label: "JavaScript", value: "JavaScript" },
          { label: "TypeScript", value: "TypeScript" },
          { label: "React", value: "React" },
          { label: "Node.js", value: "Node.js" },
          { label: "Python", value: "Python" },
          { label: "Java", value: "Java" },
          { label: "SQL", value: "SQL" },
          { label: "Docker", value: "Docker" },
          { label: "AWS", value: "AWS" },
        ],
    }),

    // Dynamic Resume Template Categories
    getTemplateCategories: builder.query<DropdownOption[], void>({
      query: () => "/candidate/lookups/template-categories",
      transformResponse: (res: any) =>
        res?.data || [
          { label: "All Categories", value: "All" },
          { label: "ATS Friendly", value: "ATS" },
          { label: "Professional", value: "Professional" },
          { label: "Modern", value: "Modern" },
          { label: "Creative", value: "Creative" },
          { label: "Minimal", value: "Minimal" },
          { label: "Sidebar", value: "Sidebar" },
          { label: "Two Column", value: "Two Column" },
        ],
    }),

    // Dynamic Font Family Options
    getFontOptions: builder.query<DropdownOption[], void>({
      query: () => "/candidate/lookups/font-families",
      transformResponse: (res: any) =>
        res?.data || [
          { label: "Inter", value: "Inter" },
          { label: "Roboto", value: "Roboto" },
          { label: "Open Sans", value: "Open Sans" },
          { label: "Lato", value: "Lato" },
          { label: "Montserrat", value: "Montserrat" },
          { label: "Poppins", value: "Poppins" },
        ],
    }),

    // Dynamic Paper Size Options
    getPaperSizes: builder.query<DropdownOption[], void>({
      query: () => "/candidate/lookups/paper-sizes",
      transformResponse: (res: any) =>
        res?.data || [
          { label: "A4 (210 x 297 mm)", value: "A4" },
          { label: "Letter (8.5 x 11 in)", value: "Letter" },
          { label: "Legal (8.5 x 14 in)", value: "Legal" },
        ],
    }),
  }),
});

export const {
  useGetGendersQuery,
  useGetMaritalStatusesQuery,
  useGetEmploymentTypesQuery,
  useGetDegreesQuery,
  useGetProficiencyLevelsQuery,
  useGetSkillOptionsQuery,
  useGetTemplateCategoriesQuery,
  useGetFontOptionsQuery,
  useGetPaperSizesQuery,
} = candidateLookupApi;
