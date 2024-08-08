import React from "react";
import { Box, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { MobileDeliveryType } from "../model/types";

interface DeliveryMethodProps {
  name: MobileDeliveryType.only_delivery | MobileDeliveryType.only_pickup;
}

export const DeliveryMethod: React.FC<DeliveryMethodProps> = ({ name }) => {
  const { t } = useTranslation();
  const { colorScheme } = useSelector((state: RootState) => state.auth);

  const getIconSource = () => {
    if (name === MobileDeliveryType.only_delivery) {
      return "icons/cartScreen/only_delivery.png";
    }
    return "icons/cartScreen/only_pickup.png";
  };

  return (
    <Box display="flex" alignItems="center" mb={2}>
      <img src={getIconSource()} alt={t(name)} style={{ width: 20, height: 20, marginRight: 8 }} />
      <Typography variant="body1" style={{ color: colorScheme.button.primary_background }}>
        {t(name)}
      </Typography>
    </Box>
  );
};
