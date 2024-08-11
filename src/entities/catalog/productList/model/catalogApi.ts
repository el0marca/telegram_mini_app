import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  GetCatalogParams,
  //   ProductDetailsServerResponse,
  //   APIResponse,
} from "./types";
import { Catalog, CategoryItem } from "@shared/types";

export const BASE_URL = "https://waterapp.ru/api/5e44ebb1c32dab714548a832/v3";

export const catalogApi = createApi({
  reducerPath: "catalogApi",
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
  tagTypes: ["Catalog", "Product"],
  endpoints: builder => ({
    getCatalog: builder.query<Catalog, GetCatalogParams>({
      query: ({ categoryId, q }) => ({
        url: "catalog",
        method: "POST",
        // headers: { "mobile-token": localStorage.getItem("token") || "" },
        body: {
          category_id: categoryId ?? "",
          q: q ?? "",
        },
      }),
      providesTags: ["Catalog"],
    }),
    getProductDetails: builder.query<CategoryItem, string>({
      query: id => `catalog/items/${id}`,
      providesTags: (_result, _error, id) => [{ type: "Product", id }],
    }),
  }),
});

export const { useLazyGetCatalogQuery, useGetProductDetailsQuery } = catalogApi;
