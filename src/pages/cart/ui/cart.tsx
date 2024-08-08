import { PATHS } from "@app/router/paths";
import { getCart } from "@entities/cart/cartList";
import { ProductList } from "@entities/catalog/productList";
import { Box } from "@mui/material";
import { OrderSummary } from "@shared/ui/orderSummary";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export const Cart = () => {
  const cart = useSelector(getCart);
  const navigate = useNavigate();

  return (
    <Box>
      <ProductList products={cart?.items} />
      <OrderSummary
        onClick={() => {
          navigate(PATHS.CART.ORDER_FORM);
        }}
        sum={cart?.total_sum}
        // pledgeSum={cart?.bonus_earn_sum}
        pledgeSum={0}
        disabled={!cart?.items.some(i => i.quantity)}
        buttonTitle={cart?.items.some(i => i.quantity) ? "Оформить заказ" : "Добавьте товары"}
        bonus_earn_sum={cart?.bonus_earn_sum}
      />
    </Box>
  );
};
