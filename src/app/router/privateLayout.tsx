import { getMobileToken } from "@entities/login";
import { Box } from "@mui/material";
import { CitySelectModal } from "@shared/ui/citySelectModal";
import { Header } from "@shared/ui/header";
import React from "react";
import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";

const PrivateLayout: React.FC = () => {
  const mobileToken = useSelector(getMobileToken);
  return (
    <Box>
      <CitySelectModal mobileToken={mobileToken} />
      <Header />
      <Outlet />
    </Box>
  );
};

export default PrivateLayout;
