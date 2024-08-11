import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { authApi } from "@entities/login";
import { MobileToken } from "@shared/types";

interface AuthState {
  mobile_token: MobileToken | null;
}

const initialState: AuthState = {
  mobile_token: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setMobileToken: (state, action: PayloadAction<MobileToken>) => {
      state.mobile_token = action.payload;
    },
  },
  extraReducers: builder => {
    builder.addMatcher(authApi.endpoints.getOrUpdateToken.matchFulfilled, (state, { payload }) => {
      state.mobile_token = payload.mobile_token;
    });
  },
});

export const getCompanyInfo = (state: { auth: AuthState }) => state.auth.mobile_token?.company_info;

export const getMobileToken = (state: { auth: AuthState }) => state.auth.mobile_token;

export const getDeliveryZones = (state: { auth: AuthState }) => {
  const deliveryZones = state.auth.mobile_token?.districts.map(d => d.zones);
  const polygons = [];
  if (deliveryZones) {
    for (const zones of deliveryZones) {
      for (const zone of zones) {
        const polygon = [];
        for (const coords of zone.coords) {
          if (coords[0] && coords[1]) polygon.push({ latitude: coords[0], longitude: coords[1] });
        }
        if (polygon.length) {
          polygons.push(polygon);
        }
      }
    }
  }
  return polygons;
};

export const getCompanyCurrencySymbol = (state: { auth: AuthState }) =>
  state.auth.mobile_token?.company_info.currency_hash.symbol_html;

export default authSlice.reducer;
