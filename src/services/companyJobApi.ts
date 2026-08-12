import { api } from "./api";
import type { JobItem, JobStats } from "../types/company.types";

export type GetCompanyJobsParams = {
  page?: number;
  limit?: number;
  status?: string;
  search?: string;
  department?: string;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
};

export type GetCompanyJobsResponse = {
  jobs: JobItem[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
};

export const companyJobApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getCompanyJobs: builder.query<GetCompanyJobsResponse, GetCompanyJobsParams | void>({
      query: (params) => {
        const searchParams = new URLSearchParams();
        if (params?.page) searchParams.append("page", String(params.page));
        if (params?.limit) searchParams.append("limit", String(params.limit));
        if (params?.status && params.status !== "All") searchParams.append("status", params.status);
        if (params?.search) searchParams.append("search", params.search);
        if (params?.department && params.department !== "All") searchParams.append("department", params.department);
        if (params?.sortBy) searchParams.append("sortBy", params.sortBy);
        if (params?.sortOrder) searchParams.append("sortOrder", params.sortOrder);

        const queryString = searchParams.toString();
        return {
          url: `/company/jobs${queryString ? `?${queryString}` : ""}`,
          method: "GET",
        };
      },
      transformResponse: (response: { success: boolean; data: GetCompanyJobsResponse }) => response.data,
      providesTags: ["Job"],
    }),

    getCompanyJobStats: builder.query<JobStats, void>({
      query: () => ({
        url: "/company/jobs/stats",
        method: "GET",
      }),
      transformResponse: (response: { success: boolean; data: JobStats }) => response.data,
      providesTags: ["Job"],
    }),

    getCompanyJobById: builder.query<JobItem, string>({
      query: (id) => ({
        url: `/company/jobs/${id}`,
        method: "GET",
      }),
      transformResponse: (response: { success: boolean; data: JobItem }) => response.data,
      providesTags: (_result, _error, id) => [{ type: "Job", id }],
    }),

    createCompanyJob: builder.mutation<JobItem, Partial<JobItem>>({
      query: (data) => ({
        url: "/company/jobs",
        method: "POST",
        body: data,
      }),
      transformResponse: (response: { success: boolean; data: JobItem }) => response.data,
      invalidatesTags: ["Job"],
    }),

    updateCompanyJob: builder.mutation<JobItem, { id: string; data: Partial<JobItem> }>({
      query: ({ id, data }) => ({
        url: `/company/jobs/${id}`,
        method: "PUT",
        body: data,
      }),
      transformResponse: (response: { success: boolean; data: JobItem }) => response.data,
      invalidatesTags: ["Job"],
    }),

    updateCompanyJobStatus: builder.mutation<JobItem, { id: string; status: string }>({
      query: ({ id, status }) => ({
        url: `/company/jobs/${id}/status`,
        method: "PATCH",
        body: { status },
      }),
      transformResponse: (response: { success: boolean; data: JobItem }) => response.data,
      invalidatesTags: ["Job"],
    }),

    deleteCompanyJob: builder.mutation<void, string>({
      query: (id) => ({
        url: `/company/jobs/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Job"],
    }),
  }),
});

export const {
  useGetCompanyJobsQuery,
  useGetCompanyJobStatsQuery,
  useGetCompanyJobByIdQuery,
  useCreateCompanyJobMutation,
  useUpdateCompanyJobMutation,
  useUpdateCompanyJobStatusMutation,
  useDeleteCompanyJobMutation,
} = companyJobApi;
