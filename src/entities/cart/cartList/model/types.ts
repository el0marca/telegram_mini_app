import { Cart } from "@shared/types";

export interface AddProductToCartParams {
  topping_ids?: string[];
  quantity: number;
  item_id: string;
}

export interface CartResponse {
  cart: Cart;
}
