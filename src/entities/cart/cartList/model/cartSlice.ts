import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { cartApi } from "./cartApi";
import { authApi } from "@entities/login";
import { Cart } from "@shared/types";
import { RootState } from "@app/store";

interface CartState {
  cart: Cart | null;
}

const initialState: CartState = {
  cart: null,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setCart: (state, action: PayloadAction<Cart>) => {
      state.cart = action.payload;
    },
    clearCart: state => {
      state.cart = null;
    },
  },
  extraReducers: builder => {
    builder.addMatcher(authApi.endpoints.getOrUpdateToken.matchFulfilled, (state, { payload }) => {
      state.cart = payload.mobile_token.cart;
    });
    builder.addMatcher(cartApi.endpoints.addProductToCart.matchFulfilled, (state, { payload }) => {
      state.cart = payload;
    });
    builder.addMatcher(cartApi.endpoints.removeProductFromCart.matchFulfilled, (state, { payload }) => {
      state.cart = payload;
    });
    builder.addMatcher(cartApi.endpoints.addCoupled.matchFulfilled, (state, { payload }) => {
      state.cart = payload;
    });
    builder.addMatcher(cartApi.endpoints.repeatOrder.matchFulfilled, (state, { payload }) => {
      state.cart = payload;
    });
    builder.addMatcher(cartApi.endpoints.cleanCart.matchFulfilled, (state, { payload }) => {
      state.cart = payload;
    });
  },
});

export const { setCart, clearCart } = cartSlice.actions;

export const getCart = (state: RootState) => state.cart.cart;

export default cartSlice.reducer;
