import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "@entities/catalog/productList";
import { AddProductToCartParams, CartResponse } from "./types";
import { Cart } from "@shared/types";

export const cartApi = createApi({
  reducerPath: "cartApi",
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
    addProductToCart: builder.mutation<Cart, AddProductToCartParams>({
      query: ({ topping_ids, quantity, item_id }) => ({
        url: "/carts",
        method: "POST",
        body: { topping_ids, quantity, item_id },
      }),
      transformResponse: (response: CartResponse) => response.cart,
    }),
    removeProductFromCart: builder.mutation<Cart, AddProductToCartParams>({
      query: ({ quantity, item_id, topping_ids }) => ({
        url: "/carts",
        method: "POST",
        body: { quantity, item_id, topping_ids },
      }),
      transformResponse: (response: CartResponse) => response.cart,
    }),
    addCoupled: builder.mutation<Cart, void>({
      query: () => ({
        url: "/carts/coupled",
        method: "POST",
        body: {},
      }),
      transformResponse: (response: CartResponse) => response.cart,
    }),
    repeatOrder: builder.mutation<Cart, { $oid: string }>({
      query: order_id => ({
        url: "/carts/repeat",
        method: "POST",
        body: { order_id },
      }),
      transformResponse: (response: CartResponse) => response.cart,
    }),
    cleanCart: builder.mutation<Cart, void>({
      query: () => ({
        url: "/carts/clean",
        method: "POST",
        body: {},
      }),
      transformResponse: (response: CartResponse) => response.cart,
    }),
  }),
});

export const {
  useAddProductToCartMutation,
  useRemoveProductFromCartMutation,
  useAddCoupledMutation,
  useRepeatOrderMutation,
  useCleanCartMutation,
} = cartApi;
