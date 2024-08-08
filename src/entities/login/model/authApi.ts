import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "@entities/catalog/productList";
import { MobileTokenServerResponse } from "@shared/types";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("token");
      if (token) {
        headers.set("mobile-token", token);
      }
      return headers;
    },
  }),
  tagTypes: ["Token"],
  endpoints: (builder) => ({
    getOrUpdateToken: builder.query<MobileTokenServerResponse, void>({
      query: () => ({
        url: "tokens",
        method: "POST",
        body: { token: localStorage.getItem("token") },
      }),
      async onQueryStarted(_, { queryFulfilled }) {
        try {
          const {
            data: {
              mobile_token: { token },
            },
          } = await queryFulfilled;
          if (token) {
            localStorage.setItem("token", token);
          }
        } catch (error) {
          console.error("Failed to get or update token:", error);
        }
      },
      providesTags: ["Token"],
    }),
    sendSmsCode: builder.mutation<void, { companyId: string; phone: string }>({
      query: ({ companyId, phone }) => ({
        url: `${companyId}/v3/tokens/send_code`,
        method: "POST",
        body: { phone },
      }),
    }),
    submitSmsCode: builder.mutation<void, { companyId: string; code: string }>({
      query: ({ companyId, code }) => ({
        url: `${companyId}/v3/tokens/submit_code`,
        method: "POST",
        body: { code },
      }),
    }),
    loginByPhoneCall: builder.mutation<{ phone: string }, { phone: string }>({
      query: ({ phone }) => ({
        url: `/tokens/submit_phone`,
        method: "POST",
        body: { phone },
      }),
      invalidatesTags: ["Token"],
    }),
    setCity: builder.mutation<
      MobileTokenServerResponse,
      { city_brach_id: string }
    >({
      query: ({ city_brach_id }) => ({
        url: `tokens/city`,
        method: "POST",
        body: { token: localStorage.getItem("token"), city_id: city_brach_id },
      }),
      invalidatesTags: ["Token"],
    }),
    logout: builder.mutation<MobileTokenServerResponse, { companyId: string }>({
      query: ({ companyId }) => ({
        url: `${companyId}/v3/tokens/logout`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetOrUpdateTokenQuery,
  useSendSmsCodeMutation,
  useSubmitSmsCodeMutation,
  useLoginByPhoneCallMutation,
  useSetCityMutation,
  useLogoutMutation,
} = authApi;
