import employeeBaseApi from "../api.ts";
import type { LoginPayload, LoginResponse } from "./types.ts";
export const loginApi = employeeBaseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<LoginResponse, LoginPayload>({
      query: (payload) => ({
        url: "/login/auth",
        method: "POST",
        body: payload,
      }),
    }),
  }),
});

export const { useLoginMutation } = loginApi;
