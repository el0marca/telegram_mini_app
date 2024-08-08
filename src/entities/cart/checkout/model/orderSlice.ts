import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Order, FieldsToUpdateOrder, OrderPeriodResponse, DeliveryType } from "./types";
import { orderAPI } from "./orderApi";

const FIELDS_TO_UPDATE_ORDER: FieldsToUpdateOrder = {
  address_id: "",
  address: { id: "" },
  delivery_type: DeliveryType.delivery,
  pay_type_id: "",
  date: "",
  fio: "",
  comment: "",
  promo_code_text: "",
  promo_sum: "",
  time_from: "",
  time_to: "",
  time_gap: null,
  store_id: "",
  bonus_sum: 0,
  card_id: "",
  additional_fields_collected: [],
};

interface OrderState {
  order: Order | null;
  orders: Order[];
  selectedAddressDistrictId: string;
  orderDatePeriod: OrderPeriodResponse | null;
  minDateForOrder: string;
  linkForPay: string;
  fieldsToUpdateOrder: FieldsToUpdateOrder;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: OrderState = {
  order: null,
  orders: [],
  selectedAddressDistrictId: "",
  orderDatePeriod: null,
  minDateForOrder: "",
  linkForPay: "",
  fieldsToUpdateOrder: FIELDS_TO_UPDATE_ORDER,
  status: "idle",
  error: null,
};

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    setOrder(state, action: PayloadAction<Order>) {
      state.order = action.payload;
    },
    setOrders(state, action: PayloadAction<Order[]>) {
      state.orders = action.payload;
    },
    setSelectedAddressDistrictId(state, action: PayloadAction<string>) {
      state.selectedAddressDistrictId = action.payload;
    },
    resetFieldsToUpdateOrder(state) {
      state.fieldsToUpdateOrder = FIELDS_TO_UPDATE_ORDER;
    },
    setLinkForPay(state, action: PayloadAction<string>) {
      state.linkForPay = action.payload;
    },
    setMinDateForOrder(state, action: PayloadAction<string>) {
      state.minDateForOrder = action.payload;
    },
    setFieldsToUpdateOrder(state, action: PayloadAction<Partial<FieldsToUpdateOrder>>) {
      state.fieldsToUpdateOrder = { ...state.fieldsToUpdateOrder, ...action.payload };
    },
    setOrderDatePeriod(state, action: PayloadAction<OrderPeriodResponse>) {
      state.orderDatePeriod = action.payload;
      state.fieldsToUpdateOrder.time_from = action.payload.period.period[0];
      state.fieldsToUpdateOrder.time_to = action.payload.period.period[1];
    },
  },
  extraReducers: builder => {
    builder
      .addMatcher(orderAPI.endpoints.convertCartToOrder.matchPending, state => {
        state.status = "loading";
      })
      .addMatcher(orderAPI.endpoints.convertCartToOrder.matchFulfilled, (state, { payload }) => {
        state.status = "succeeded";
        state.order = payload.order;
      })
      .addMatcher(orderAPI.endpoints.convertCartToOrder.matchRejected, (state, { error }) => {
        state.status = "failed";
        // state.error = error.message;
      })
      .addMatcher(orderAPI.endpoints.updateTimePeriods.matchPending, state => {
        state.status = "loading";
      })
      .addMatcher(orderAPI.endpoints.updateTimePeriods.matchFulfilled, (state, { payload }) => {
        state.status = "succeeded";
        state.orderDatePeriod = payload;
        state.minDateForOrder = payload.date;
        state.fieldsToUpdateOrder.date = payload.date;
      })
      .addMatcher(orderAPI.endpoints.updateTimePeriods.matchRejected, (state, { error }) => {
        state.status = "failed";
        // state.error = error.message;
      })
      .addMatcher(orderAPI.endpoints.updateCommonParams.matchPending, state => {
        state.status = "loading";
      })
      .addMatcher(orderAPI.endpoints.updateCommonParams.matchFulfilled, (state, { payload }) => {
        state.status = "succeeded";
        state.order = payload.order;
      })
      .addMatcher(orderAPI.endpoints.updateCommonParams.matchRejected, (state, { error }) => {
        state.status = "failed";
        // state.error = error.message;
      })
      .addMatcher(orderAPI.endpoints.applyPromoCode.matchPending, state => {
        state.status = "loading";
      })
      .addMatcher(orderAPI.endpoints.applyPromoCode.matchFulfilled, (state, { payload }) => {
        state.status = "succeeded";
        state.order = payload.order;
      })
      .addMatcher(orderAPI.endpoints.applyPromoCode.matchRejected, (state, { error }) => {
        state.status = "failed";
        // state.error = error.message;
      })
      .addMatcher(orderAPI.endpoints.makeOrder.matchPending, state => {
        state.status = "loading";
      })
      .addMatcher(orderAPI.endpoints.makeOrder.matchFulfilled, (state, { payload }) => {
        state.status = "succeeded";
        state.order = null; // assuming order is reset after making an order
      })
      .addMatcher(orderAPI.endpoints.makeOrder.matchRejected, (state, { error }) => {
        state.status = "failed";
        // state.error = error.message;
      })
      .addMatcher(orderAPI.endpoints.payOrder.matchPending, state => {
        state.status = "loading";
      })
      .addMatcher(orderAPI.endpoints.payOrder.matchFulfilled, (state, { payload }) => {
        state.status = "succeeded";
        state.linkForPay = payload.redirect;
      })
      .addMatcher(orderAPI.endpoints.payOrder.matchRejected, (state, { error }) => {
        state.status = "failed";
        // state.error = error.message;
      })
      .addMatcher(orderAPI.endpoints.getOrders.matchPending, state => {
        state.status = "loading";
      })
      .addMatcher(orderAPI.endpoints.getOrders.matchFulfilled, (state, { payload }) => {
        state.status = "succeeded";
        state.orders = payload.orders;
      })
      .addMatcher(orderAPI.endpoints.getOrders.matchRejected, (state, { error }) => {
        state.status = "failed";
        // state.error = error.message;
      })
      .addMatcher(orderAPI.endpoints.submitReview.matchPending, state => {
        state.status = "loading";
      })
      .addMatcher(orderAPI.endpoints.submitReview.matchFulfilled, state => {
        state.status = "succeeded";
      })
      .addMatcher(orderAPI.endpoints.submitReview.matchRejected, (state, { error }) => {
        state.status = "failed";
        // state.error = error.message;
      })
      .addMatcher(orderAPI.endpoints.cancelOrder.matchPending, state => {
        state.status = "loading";
      })
      .addMatcher(orderAPI.endpoints.cancelOrder.matchFulfilled, (state, { payload }) => {
        state.status = "succeeded";
        state.order = payload.order;
      })
      .addMatcher(orderAPI.endpoints.cancelOrder.matchRejected, (state, { error }) => {
        state.status = "failed";
        // state.error = error.message;
      });
  },
});

export const {
  setOrder,
  setOrders,
  setSelectedAddressDistrictId,
  resetFieldsToUpdateOrder,
  setLinkForPay,
  setMinDateForOrder,
  setFieldsToUpdateOrder,
  setOrderDatePeriod,
} = orderSlice.actions;

export default orderSlice.reducer;
