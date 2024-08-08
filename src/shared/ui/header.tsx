import React from "react";
import { getCompanyInfo } from "@entities/login";
import { useLocation, useNavigate } from "react-router-dom";
import { IMAGES } from "@shared/assets/images";
import { AppBar, Box, IconButton, Typography, styled } from "@mui/material";
import { PATHS } from "@app/router/paths";
import { useSelector } from "react-redux";

const StyledAppBar = styled(AppBar)({
  top: 0,
  left: 0,
  right: 0,
  display: "flex",
  justifyContent: "space-between",
  flexDirection: "row",
  alignItems: "center",
  padding: 10,
  paddingLeft: 20,
  paddingRight: 20,
  backgroundColor: "#f0f0f0",
  boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
  position: "sticky",
});

export const Header: React.FC = () => {
  const navigate = useNavigate();

  const location = useLocation();

  const getPageTitle = (path: string) => {
    switch (path) {
      case PATHS.HOME.INDEX:
        return "Товары";
      case `/${PATHS.CART.INDEX}`:
        return "Корзина";
      case "/cart/order-form":
        return "Оформление заказа";
      default:
        return "Page";
    }
  };
  const hideBackButton = location.pathname === PATHS.HOME.INDEX && !location.search;
  const companyInfo = useSelector(getCompanyInfo);

  return (
    <StyledAppBar>
      <IconButton onClick={() => !hideBackButton && navigate(-1)} sx={{ width: 48, height: 48 }}>
        <img
          src={hideBackButton ? companyInfo?.mobile_logo_url : IMAGES.arrowLeft}
          alt="back"
          style={{ width: "100%", height: "100%" }}
        />
      </IconButton>
      <Typography variant="h6" color="#333" fontWeight={900}>
        {getPageTitle(location.pathname)}
      </Typography>
      <Box sx={{ width: 50, display: "flex", justifyContent: "flex-end" }}></Box>
    </StyledAppBar>
  );
};
