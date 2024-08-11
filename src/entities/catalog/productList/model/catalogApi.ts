import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  GetCatalogParams,
  //   ProductDetailsServerResponse,
  //   APIResponse,
} from "./types";
import { Catalog, CategoryItem } from "@shared/types";
const companyId = localStorage.getItem("companyId");

export const BASE_URL = `https://waterapp.ru/api/${companyId}/v3`;

export const catalogApi = createApi({
  reducerPath: "catalogApi",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    prepareHeaders: headers => {
      const mobileToken = localStorage.getItem("mobileToken");
      if (mobileToken) {
        headers.set("mobile-token", mobileToken);
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
