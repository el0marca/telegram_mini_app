import { addressAPI, addressSlice } from "@entities/address";
import { cartApi, cartReducer } from "@entities/cart/cartList";
import { orderAPI } from "@entities/cart/checkout";
import { orderSlice } from "@entities/cart/checkout";
import { catalogApi, catalogReducer } from "@entities/catalog/productList";
import { authApi, authReducer } from "@entities/login";
import { configureStore } from "@reduxjs/toolkit";

export const store = configureStore({
  reducer: {
    [catalogApi.reducerPath]: catalogApi.reducer,
    catalog: catalogReducer,
    [authApi.reducerPath]: authApi.reducer,
    auth: authReducer,
    [cartApi.reducerPath]: cartApi.reducer,
    cart: cartReducer,
    [orderAPI.reducerPath]: orderAPI.reducer,
    order: orderSlice,
    [addressAPI.reducerPath]: addressAPI.reducer,
    address: addressSlice,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware()
      .concat(catalogApi.middleware)
      .concat(authApi.middleware)
      .concat(cartApi.middleware)
      .concat(addressAPI.middleware)
      .concat(orderAPI.middleware),
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
