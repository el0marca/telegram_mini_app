import React, { useMemo } from "react";
import { Card, CardContent, CardMedia, Typography, Box, IconButton } from "@mui/material";
import { styled } from "@mui/system";
import { IMAGES } from "@shared/assets/images";
import { useFormatPrice } from "@shared/lib";
import { CartItem, CategoryItem } from "@shared/types";
import BonusInfo from "./bonusInfo";
import { useSelector } from "react-redux";
import { RootState } from "@app/store";
import QuantityButton from "./quantityButton";
import { useAddProductToCartMutation } from "@entities/cart/cartList";

type Props = {
  product: CategoryItem | CartItem;
};

export const ProductListItem: React.FC<Props> = ({ product }) => {
  const price = useFormatPrice(product.price);
  const cart = useSelector((state: RootState) => state.cart.cart);
  const [addToCart] = useAddProductToCartMutation();

  const currentProductInCart = useMemo(() => {
    return cart?.items?.find(item => item._id === product._id);
  }, [cart?.items, product._id]);

  return (
    <StyledCard>
      <BonusInfo item={product} />
      <StyledCardMedia image={product.icon_url ?? IMAGES.noImage} />
      <CardContent>
        <Typography variant="h6">{product.title}</Typography>
        <Box display="flex" justifyContent="space-between" alignItems="center" mt={2}>
          <Typography variant="body1" fontWeight="bold">
            {price}
          </Typography>
          <StyledBox>
            {currentProductInCart?.quantity ? (
              <QuantityButton
                quantity={currentProductInCart.quantity}
                onIncrement={() => addToCart({ item_id: product._id, quantity: currentProductInCart.quantity + 1 })}
                onDecrement={() => addToCart({ item_id: product._id, quantity: currentProductInCart.quantity - 1 })}
              />
            ) : (
              <IconButton
                onClick={() => addToCart({ item_id: product._id, quantity: 1 })}
                sx={{ backgroundColor: "primary.main", padding: 2 }}>
                <StyledCartIcon src={IMAGES.addToCart} alt="add to cart" />
              </IconButton>
            )}
          </StyledBox>
        </Box>
      </CardContent>
    </StyledCard>
  );
};

const StyledBox = styled(Box)({
  width: 100,
  height: 50,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
});

const StyledCard = styled(Card)({
  display: "flex",
  alignItems: "center",
  backgroundColor: "#fff",
  marginBottom: "10px",
  borderRadius: "10px",
  padding: "10px",
  position: "relative",
  boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
});

const StyledCardMedia = styled(CardMedia)({
  width: "100px",
  height: "100px",
  objectFit: "cover",
});

const StyledCartIcon = styled("img")({
  width: "32px",
  height: "32px",
});
