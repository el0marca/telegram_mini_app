import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Order, FieldsToUpdateOrder, OrderPeriodResponse, SubmitReviewProps, OrderResponse } from "./types";
import { BASE_URL } from "@entities/catalog/productList";

export const orderAPI = createApi({
  reducerPath: "orderAPI",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    prepareHeaders: headers => {
      const token = localStorage.getItem("mobileToken");
      if (token) {
        headers.set("mobile-token", token);
      }
      return headers;
    },
  }),
  endpoints: builder => ({
    convertCartToOrder: builder.query<{ order: Order }, void>({
      query: () => ({
        url: "/orders/start",
        method: "POST",
        body: {},
      }),
    }),
    updateTimePeriods: builder.mutation<
      OrderPeriodResponse,
      { district_id?: string; date?: string; period_id?: string }
    >({
      query: ({ district_id, date, period_id }) => ({
        url: "/time_periods",
        method: "POST",
        body: { district_id, date, period_id },
      }),
    }),
    updateCommonParams: builder.mutation<OrderResponse, Partial<FieldsToUpdateOrder>>({
      query: params => ({
        url: "/orders/update_common_params",
        method: "POST",
        body: { order: { ...params } },
      }),
    }),
    applyPromoCode: builder.mutation<{ order: Order; errors: { promo_code_text: string } }, FieldsToUpdateOrder>({
      query: order => ({
        url: "/orders/apply_promo_code",
        method: "POST",
        body: { order },
      }),
    }),
    makeOrder: builder.mutation<{ message: string }, void>({
      query: () => ({
        url: "/orders/make",
        method: "POST",
      }),
    }),
    payOrder: builder.mutation<{ redirect: string; status: string }, void>({
      query: () => ({
        url: "/orders/pay",
        method: "POST",
      }),
    }),
    getOrders: builder.query<{ orders: Order[] }, void>({
      query: () => "/orders/list",
    }),
    submitReview: builder.mutation<{ status: string }, SubmitReviewProps>({
      query: props => ({
        url: "/orders/review",
        method: "POST",
        body: props,
      }),
    }),
    cancelOrder: builder.mutation<{ order: Order }, string>({
      query: order_id => ({
        url: `/orders/${order_id}/cancel`,
        method: "POST",
      }),
    }),
  }),
});

export const {
  useConvertCartToOrderQuery,
  useUpdateTimePeriodsMutation,
  useUpdateCommonParamsMutation,
  useApplyPromoCodeMutation,
  useMakeOrderMutation,
  usePayOrderMutation,
  useGetOrdersQuery,
  useSubmitReviewMutation,
  useCancelOrderMutation,
} = orderAPI;
