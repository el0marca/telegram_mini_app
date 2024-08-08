import { PATHS } from "@app/router/paths";
import { getCart } from "@entities/cart/cartList";
import { CategoryList } from "@entities/catalog/categoryList";
import { getCategories, getItems, ProductList, useLazyGetCatalogQuery } from "@entities/catalog/productList";
import { Box } from "@mui/material";
import { LoadingIndicator } from "@shared/ui/loadingIndicator";
import { OrderSummary } from "@shared/ui/orderSummary";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";

export const Catalog = () => {
  const [getCatalog, { isFetching }] = useLazyGetCatalogQuery();
  const [searchParams] = useSearchParams();
  const categoryId = searchParams.get("category");

  useEffect(() => {
    getCatalog({ categoryId: categoryId ?? "" });
  }, [categoryId, getCatalog]);

  const cart = useSelector(getCart);
  const navigate = useNavigate();
  const categories = useSelector(getCategories);
  const catalogItems = useSelector(getItems);

  if (isFetching) {
    return <LoadingIndicator />;
  }

  return (
    <Box>
      <CategoryList categories={categories} />
      <ProductList products={catalogItems} />
      <OrderSummary
        onClick={() => {
          navigate(PATHS.CART.INDEX);
        }}
        sum={cart?.total_sum}
        // pledgeSum={cart?.bonus_earn_sum}
        pledgeSum={0}
        disabled={!cart?.items.some(i => i.quantity)}
        buttonTitle={cart?.items.some(i => i.quantity) ? "Перейти в корзину" : "Добавьте товары"}
        bonus_earn_sum={cart?.bonus_earn_sum}
      />
    </Box>
  );
};
