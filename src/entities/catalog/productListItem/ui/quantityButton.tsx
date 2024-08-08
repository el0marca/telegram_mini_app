import React from "react";
import { Box, IconButton, Typography } from "@mui/material";
import { styled } from "@mui/system";

type Props = {
  quantity: number;
  onIncrement: () => void;
  onDecrement: () => void;
};

const QuantityButton: React.FC<Props> = ({ quantity, onIncrement, onDecrement }) => {
  return (
    <StyledQuantityButton>
      <StyledIconButton onClick={onDecrement} disabled={quantity <= 0}>
        −
      </StyledIconButton>
      <Typography variant="h6" className="quantity" color="#fff" paddingLeft={1} paddingRight={1}>
        {quantity}
      </Typography>
      <StyledIconButton onClick={onIncrement}>+</StyledIconButton>
    </StyledQuantityButton>
  );
};

const StyledQuantityButton = styled(Box)`
  display: flex;
  align-items: center;
  background-color: #ffc107;
  border-radius: 10px;
  padding: 5px 10px;
  justify-content: center;
`;

const StyledIconButton = styled(IconButton)`
  background-color: transparent;
  border: none;
  font-size: 18px;
  padding: 5px 10px;
  cursor: pointer;
  color: #fff;
  font-weight: bold;

  &:disabled {
    color: #ccc;
  }
`;

export default QuantityButton;
