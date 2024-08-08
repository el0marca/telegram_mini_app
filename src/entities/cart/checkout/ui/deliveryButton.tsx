import React from "react";
import { Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { setFieldsToUpdateOrder } from "./orderSlice";
import { RootState } from "./store";
import { DeliveryType } from "./types";

export const DeliveryButton: React.FC<{ type: DeliveryType; children: string }> = ({ type, children }) => {
  const dispatch = useDispatch();
  const { fieldsToUpdateOrder } = useSelector((state: RootState) => state.order);

  const handleSelectDeliveryType = async (delivery_type: DeliveryType) => {
    dispatch(setFieldsToUpdateOrder({ delivery_type }));
  };

  return (
    <Button
      onClick={() => handleSelectDeliveryType(type)}
      variant={fieldsToUpdateOrder.delivery_type === type ? "contained" : "outlined"}
      fullWidth>
      {children}
    </Button>
  );
};