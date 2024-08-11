import React from "react";
import { styled } from "@mui/system";
import { useFormatBonus } from "@shared/lib";
import { CartItem, CategoryItem } from "@shared/types";
import { useGetOrUpdateTokenQuery } from "@entities/login";

interface BonusInfoProps {
  item: CategoryItem | CartItem;
}

const BonusInfo: React.FC<BonusInfoProps> = ({ item }) => {
  const { data } = useGetOrUpdateTokenQuery(undefined, { skip: true });
  const bonuses = useFormatBonus({ bonuses: item.bonus_sum });

  if (!data?.mobile_token.company_info.is_bonus_avaliable) {
    return null;
  }

  return (
    <StyledBonusInfo>
      <StyledText>{bonuses}</StyledText>
    </StyledBonusInfo>
  );
};

const StyledBonusInfo = styled("div")`
  background-color: #13bbff;
  border-top-right-radius: 20px;
  border-bottom-right-radius: 20px;
  position: absolute;
  top: 2px;
  left: 0;
  padding: 5px;
  z-index: 99000;
`;

const StyledText = styled("span")`
  font-weight: 600;
  font-size: 14px;
  color: #fff;
`;

export default BonusInfo;
