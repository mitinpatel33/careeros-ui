import { api } from "./api";

export interface CategoryDto {
  _id: string;
  name: string;
  slug: string;
  kind: "professional" | "student";
  skillLabel: string; // "Skill" | "Subject" | "Topic"
  icon?: string;
  color?: string;
}

export interface JobTitleDto {
  _id: string;
  title: string;
  categoryId?: string | null;
  icon?: string;
}

export interface SkillDto {
  _id: string;
  name: string;
}

export interface DashboardStats {
  totalJobTitles: number;
  totalQuestions: number;
  totalMockTests: number;
  successRate: string;
}

export interface JobTitlesResponse {
  success: boolean;
  stats: DashboardStats;
  data: JobTitleDto[];
}

export interface JobTitlesArgs {
  search?: string;
  categoryId?: string;
}

export interface InterviewQuestionDto {
  _id: string;
  jobTitleId: string;
  skillName: string;
  question: string;
  answer: string;
  difficulty: string;
  explanationWithExample?: string;
}

export interface QuestionsRequest {
  jobTitleId: string;
  skillName: string;
  difficulty?: string;
  excludeIds?: string[];
}

export interface MockTestDto {
  _id: string;
  title: string;
  jobTitleId: string;
  skillName?: string;
  difficulty: string;
  questions: { questionText: string; options?: string[] }[];
}

export interface MockTestRequest {
  userId?: string;
  jobTitleId: string;
  skillName?: string;
  difficulty: string;
}

export interface ActivityDto {
  _id: string;
  userId: string;
  activityType: string;
  title: string;
  category?: string;
  status: string;
  createdAt: string;
}

interface ApiEnvelope<T> {
  success: boolean;
  data: T;
}

const unwrap = <T>(res: unknown, fallback: T): T => {
  const body = res as { data?: T } | T | undefined;
  if (
    body &&
    typeof body === "object" &&
    !Array.isArray(body) &&
    "data" in body
  ) {
    return (body as { data: T }).data ?? fallback;
  }
  return (body as T) ?? fallback;
};

export const interviewApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getCategories: builder.query<CategoryDto[], void>({
      query: () => ({ url: "/interview/categories", method: "GET" }),
      transformResponse: (res: unknown) => unwrap<CategoryDto[]>(res, []),
    }),

    getJobTitles: builder.query<JobTitlesResponse, JobTitlesArgs | void>({
      query: (args) => ({
        url: "/interview/job-titles",
        method: "GET",
        params: args ?? undefined,
      }),
      providesTags: ["JobTitles"],
    }),

    createCustomJobTitle: builder.mutation<JobTitleDto, { title: string }>({
      query: (body) => ({
        url: "/interview/job-titles/custom",
        method: "POST",
        body,
      }),
      transformResponse: (res: ApiEnvelope<JobTitleDto>) => res.data,
      invalidatesTags: ["JobTitles"],
    }),

    getSkills: builder.query<SkillDto[], string>({
      query: (jobTitleId) => ({
        url: `/interview/job-titles/${jobTitleId}/skills`,
        method: "GET",
      }),
      transformResponse: (res: unknown) => unwrap<SkillDto[]>(res, []),
    }),

    fetchQuestions: builder.mutation<InterviewQuestionDto[], QuestionsRequest>({
      query: (body) => ({
        url: "/interview/questions/ai",
        method: "POST",
        body,
      }),
      transformResponse: (res: unknown) => unwrap<InterviewQuestionDto[]>(res, []),
    }),

    fetchMockTest: builder.mutation<MockTestDto, MockTestRequest>({
      query: (body) => ({
        url: "/interview/mock-test/ai",
        method: "POST",
        body,
      }),
      transformResponse: (res: unknown) => unwrap<MockTestDto>(res, undefined as unknown as MockTestDto),
      invalidatesTags: ["Activity"],
    }),

    getRecentActivity: builder.query<ActivityDto[], string>({
      query: (userId) => ({
        url: `/interview/activity/${userId}`,
        method: "GET",
      }),
      transformResponse: (res: unknown) => unwrap<ActivityDto[]>(res, []),
      providesTags: ["Activity"],
    }),
  }),
});

export const {
  useGetCategoriesQuery,
  useGetJobTitlesQuery,
  useCreateCustomJobTitleMutation,
  useGetSkillsQuery,
  useFetchQuestionsMutation,
  useFetchMockTestMutation,
  useGetRecentActivityQuery,
} = interviewApi;
