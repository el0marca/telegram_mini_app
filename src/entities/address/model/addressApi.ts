import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { BASE_URL } from "@entities/catalog/productList";
import {
  GetAddressesResponse,
  InputAddress,
  Location,
  ProcessedAddress,
  ReversGeocodeResponse,
  UpdateAddressResponse,
} from "./types";

export const addressAPI = createApi({
  reducerPath: "addressAPI",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    prepareHeaders: headers => {
      const token = localStorage.getItem("token");
      if (token) {
        headers.set("mobile-token", token);
      }
      return headers;
    },
  }),
  endpoints: builder => ({
    getAddresses: builder.query<ProcessedAddress[], void>({
      query: () => "/addresses",
      transformResponse: (response: GetAddressesResponse) => response.addresses,
    }),
    reverseGeocode: builder.mutation<ReversGeocodeResponse, Location>({
      query: ({ lat, lng }) => ({
        url: "/addresses/reverse_geocode",
        method: "POST",
        body: { lat, lng },
      }),
    }),
    createAddress: builder.mutation<ProcessedAddress, InputAddress>({
      query: addressData => ({
        url: "/addresses",
        method: "POST",
        body: { address: addressData },
      }),
      transformResponse: (response: UpdateAddressResponse) => response.address,
    }),
    deleteAddress: builder.mutation<ProcessedAddress[], string>({
      query: id => ({
        url: `/addresses/${id}`,
        method: "DELETE",
      }),
      transformResponse: (response: GetAddressesResponse) => response.addresses,
    }),
    updateAddress: builder.mutation<ProcessedAddress, { id: string; address: Partial<InputAddress> }>({
      query: ({ id, address }) => ({
        url: `/addresses/${id}`,
        method: "PUT",
        body: { address },
      }),
      transformResponse: (response: UpdateAddressResponse) => response.address,
    }),
  }),
});

export const {
  useGetAddressesQuery,
  useReverseGeocodeMutation,
  useCreateAddressMutation,
  useDeleteAddressMutation,
  useUpdateAddressMutation,
} = addressAPI;
