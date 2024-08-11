import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import axios from "axios";
import { BASE_URL } from "@entities/catalog/productList";
import {
  GetAddressesResponse,
  InputAddress,
  Location,
  ProcessedAddress,
  ReversGeocodeResponse,
  UpdateAddressResponse,
  YandexSuggestResponse,
  YandexGeocodeResponse,
  GeoObjectCollection,
} from "./types";

const yandex_suggest_api = "3a6c0fad-f6b1-4435-a6f8-ed532ada9e7d";
const yandex_geocode_api = "06dbeb62-7f3c-43a4-87da-b0cf0f60a1f6";

export const addressAPI = createApi({
  reducerPath: "addressAPI",
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
  tagTypes: ["Addresses"],
  endpoints: builder => ({
    getAddresses: builder.query<ProcessedAddress[], void>({
      query: () => "/addresses",
      transformResponse: (response: GetAddressesResponse) => response.addresses,
      providesTags: ["Addresses"],
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
      invalidatesTags: ["Addresses"],
    }),
    deleteAddress: builder.mutation<ProcessedAddress[], string>({
      query: id => ({
        url: `/addresses/${id}`,
        method: "DELETE",
      }),
      transformResponse: (response: GetAddressesResponse) => response.addresses,
      invalidatesTags: ["Addresses"],
    }),
    updateAddress: builder.mutation<ProcessedAddress, { id: string; address: Partial<InputAddress> }>({
      query: ({ id, address }) => ({
        url: `/addresses/${id}`,
        method: "PUT",
        body: { address },
      }),
      transformResponse: (response: UpdateAddressResponse) => response.address,
      invalidatesTags: ["Addresses"],
    }),
    getYandexSuggestions: builder.mutation<YandexSuggestResponse, string>({
      queryFn: async query => {
        try {
          const response = await axios.get<YandexSuggestResponse>(
            `https://suggest-maps.yandex.ru/v1/suggest?apikey=${yandex_suggest_api}&text=${query}&lang=ru`
          );
          return { data: response.data };
        } catch (error) {
          console.error("Error fetching suggestions:", error);
          return { error: { status: 500, data: "Error fetching suggestions" } };
        }
      },
    }),
    getYandexGeocode: builder.mutation<GeoObjectCollection, string>({
      queryFn: async query => {
        try {
          const response = await axios.get<YandexGeocodeResponse>(
            `https://geocode-maps.yandex.ru/1.x/?apikey=${yandex_geocode_api}&geocode=${query}&format=json`
          );
          return { data: response.data.response.GeoObjectCollection };
        } catch (error) {
          console.error("Error fetching geocode:", error);
          return { error: { status: 500, data: "Error fetching geocode" } };
        }
      },
    }),
  }),
});

export const {
  useGetAddressesQuery,
  useReverseGeocodeMutation,
  useCreateAddressMutation,
  useDeleteAddressMutation,
  useUpdateAddressMutation,
  useGetYandexSuggestionsMutation,
  useGetYandexGeocodeMutation,
} = addressAPI;
