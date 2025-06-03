import employeeBaseApi from "../api.ts";
import type { Department } from "./types.ts";
export const departmentApi = employeeBaseApi.injectEndpoints({
  endpoints: (builder) => ({
    getDepartments: builder.query<Department[], void>({
      query: () => `/department`,
      providesTags: ["EMPLOYEES"],
    }),
  }),
});

export const { useGetDepartmentsQuery } = departmentApi;
