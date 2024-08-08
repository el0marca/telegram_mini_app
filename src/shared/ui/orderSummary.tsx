import React from "react";
import { Button, Typography, Box, Container, styled } from "@mui/material";
import { useFormatBonus, useFormatPrice } from "@shared/lib";
import { IMAGES } from "@shared/assets/images";

type OrderSummaryProps = {
  pledgeSum: number | undefined;
  sum: number | undefined;
  onClick: () => void;
  buttonTitle: string;
  disabled: boolean;
  showPledge?: boolean;
  bonus_earn_sum?: number;
};

const SummaryContainer = styled(Container)({
  position: "sticky",
  bottom: 0,
  left: 0,
  right: 0,
  paddingRight: 0,
  paddingLeft: 0,
});

const OrderSummaryBox = styled(Box)({
  backgroundColor: "#fff",
  padding: "10px",
  borderRadius: "10px",
  borderTopLeftRadius: "20px",
  borderTopRightRadius: "20px",
  boxShadow: "0 -4px 10px rgba(0, 0, 0, 0.1)",
});

const SummaryItem = styled(Box)({
  display: "flex",
  justifyContent: "space-between",
  marginBottom: "10px",
  fontSize: "16px",
});

const SummaryItemTotal = styled(SummaryItem)({
  fontWeight: "bold",
  fontSize: "18px",
});

const OrderButton = styled(Button)({
  backgroundColor: "#13bbff",
  color: "#fff",
  border: "none",
  padding: "10px",
  fontSize: "16px",
  borderRadius: "30px",
  width: "100%",
  cursor: "pointer",
  "&:hover": {
    backgroundColor: "#13bbff",
  },
  "&.disabled": {
    backgroundColor: "#c5c5c5",
    cursor: "not-allowed",
  },
});

const AttentionContainer = styled(Box)({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  textAlign: "center",
});

const AttentionIcon = styled("img")({
  width: 24,
  height: 24,
});

export const OrderSummary: React.FC<OrderSummaryProps> = ({
  pledgeSum,
  sum,
  onClick,
  buttonTitle,
  disabled,
  showPledge,
  bonus_earn_sum,
}) => {
  const formattedPledgeSum = useFormatPrice(pledgeSum || 0);
  const formattedProductSum = useFormatPrice((sum || 0) - (pledgeSum || 0) || 0);
  const formattedOrderSum = useFormatPrice(sum || 0);
  const formattedBonusSum = useFormatBonus({ bonuses: bonus_earn_sum || 0 });

  return (
    <SummaryContainer>
      {showPledge && (
        <AttentionContainer>
          <AttentionIcon src={IMAGES.attention} />
          <Typography variant="body2" sx={{ padding: "0px 20px", fontSize: 14 }}>
            Залог вернем на карту, как только проверим состояние бутылей - они должны быть наши или в хорошем состоянии,
            аналогичные нашим. Вы можете не положить возвратные бутыли в ячейки, тогда залог не будет возвращен.
          </Typography>
        </AttentionContainer>
      )}
      <OrderSummaryBox>
        {!!pledgeSum && (
          <SummaryItem>
            <Typography variant="body1" sx={{ fontSize: 17 }}>
              Сумма залога за тару:
            </Typography>
            <Typography variant="body1" sx={{ fontWeight: 700 }}>
              {formattedPledgeSum}
            </Typography>
          </SummaryItem>
        )}
        {!!sum && (
          <>
            <SummaryItem>
              <Typography variant="body1">Сумма товаров:</Typography>
              <Typography variant="body1" sx={{ fontWeight: 700 }}>
                {formattedProductSum}
              </Typography>
            </SummaryItem>
            <SummaryItemTotal>
              <Typography variant="body1" sx={{ fontWeight: 900 }}>
                Общая сумма:
              </Typography>
              <Box sx={{ display: "flex" }}>
                <Typography sx={{ fontWeight: 900 }}>{formattedOrderSum}</Typography>
                {bonus_earn_sum && (
                  <Typography sx={{ fontWeight: 700, color: "#13bbff", ml: 1 }}>{` ${formattedBonusSum}`}</Typography>
                )}
              </Box>
            </SummaryItemTotal>
          </>
        )}
        <OrderButton disabled={disabled} onClick={onClick} className={disabled ? "disabled" : ""}>
          {buttonTitle}
        </OrderButton>
      </OrderSummaryBox>
    </SummaryContainer>
  );
};
