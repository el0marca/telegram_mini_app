import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Catalog } from "@shared/types";
import { catalogApi } from "./catalogApi";

type CatalogState = {
  catalog: Catalog | null;
};

const initialState: CatalogState = {
  catalog: null,
};

const catalogSlice = createSlice({
  name: "catalog",
  initialState,
  reducers: {
    setCatalog: (state, action: PayloadAction<Catalog>) => {
      state.catalog = action.payload;
    },
  },
  extraReducers: builder => {
    builder.addMatcher(catalogApi.endpoints.getCatalog.matchFulfilled, (state, { payload }) => {
      state.catalog = payload;
    });
  },
});

export const getCategories = (state: { catalog: CatalogState }) => state.catalog.catalog?.categories;
export const getCategory = (state: { catalog: CatalogState }) => state.catalog.catalog?.category;
export const getItems = (state: { catalog: CatalogState }) => state.catalog.catalog?.items;

export default catalogSlice.reducer;
