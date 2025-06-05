import type { Employee } from "../../store/employee/employee.types.ts";
import employeeBaseApi from "../api.ts";
export const employeeApi = employeeBaseApi.injectEndpoints({
  endpoints: (builder) => ({
    getEmployees: builder.query<Employee[], void>({
      query: () => `/employee`,
      providesTags: ["EMPLOYEES"],
    }),
    getSingleEmployee: builder.query<Employee, string>({
      query: (emp_id: string) => `/employee/${emp_id}`,
      providesTags: ["EMPLOYEES"],
    }),

    createEmployee: builder.mutation<void, Employee>({
      query: (employee: Employee) => ({
        url: `/employee`,
        method: "POST",
        body: employee,
      }),
      invalidatesTags: ["EMPLOYEES"],
    }),
    getEmployeeProfile: builder.mutation<void, Employee>({
      query: (token: any) => ({
        url: `/profile`,
        method: "POST",
        body: token,
      }),
      invalidatesTags: ["EMPLOYEES"],
    }),
    updateEmployee: builder.mutation({
      query: ({
        user_id,
        employee,
      }: {
        user_id: string;
        employee: Employee;
      }) => ({
        url: `/employee/${user_id}`,
        method: "PATCH",
        body: employee,
      }),
      invalidatesTags: ["EMPLOYEES"],
    }),
    deleteEmployee: builder.mutation<void, string>({
      query: (employee_id: string) => ({
        url: `/employee/${employee_id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["EMPLOYEES"],
    }),
  }),
});

export const {
  useGetEmployeesQuery,
  useGetSingleEmployeeQuery,
  useGetEmployeeProfileMutation,
  useCreateEmployeeMutation,
  useUpdateEmployeeMutation,
  useDeleteEmployeeMutation,
} = employeeApi;
