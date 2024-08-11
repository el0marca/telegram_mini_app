import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ProcessedAddress, InputAddress, Location } from "./types";
import { RootState } from "@app/store";

interface AddressState {
  addresses: ProcessedAddress[];
  inputAddress: InputAddress;
  district_id: string | null;
  addressCoordinates: Location | null;
  markerPosition: Location | null;
}

const initialState: AddressState = {
  addresses: [],
  inputAddress: {
    city: "",
    street: "",
    dom: "",
    kv: "",
    entrance: "",
    floor: "",
    korp: "",
    client_comment: "",
    location: { lat: null, lng: null },
    is_dirty: false,
  },
  district_id: null,
  addressCoordinates: null,
  markerPosition: null,
};

const addressSlice = createSlice({
  name: "address",
  initialState,
  reducers: {
    setAddresses(state, action: PayloadAction<ProcessedAddress[]>) {
      state.addresses = action.payload;
    },
    setInputAddress(state, action: PayloadAction<Partial<InputAddress>>) {
      state.inputAddress = { ...state.inputAddress, ...action.payload };
    },
    setDistrictId(state, action: PayloadAction<string | null>) {
      state.district_id = action.payload;
    },
    setAddressCoordinates(state, action: PayloadAction<Location | null>) {
      state.addressCoordinates = action.payload;
    },
    setMarkerPosition(state, action: PayloadAction<Location | null>) {
      state.markerPosition = action.payload;
    },
    resetInputAddress(state) {
      state.inputAddress = initialState.inputAddress;
    },
    resetDistrictId(state) {
      state.district_id = null;
    },
  },
});

export const getInputAddress = (state: RootState) => state.address.inputAddress;
export const getAddressCoordinates = (state: RootState) => state.address.addressCoordinates;

export const {
  setAddresses,
  setInputAddress,
  setDistrictId,
  setAddressCoordinates,
  setMarkerPosition,
  resetInputAddress,
  resetDistrictId,
} = addressSlice.actions;

export default addressSlice.reducer;
