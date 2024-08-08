import React, { useState, useEffect } from "react";
import { Modal, Typography, List, ListItem, ListItemText } from "@mui/material";
import { CityBranch, MobileToken } from "@shared/types";
import { useSetCityMutation } from "@entities/login";
import { styled } from "@mui/system";

interface CitySelectModalProps {
  mobileToken: MobileToken | null;
  opened?: boolean;
}

export const CitySelectModal: React.FC<CitySelectModalProps> = ({ mobileToken, opened }) => {
  const [open, setOpen] = useState(opened ?? !mobileToken?.city_branch);
  const [setCity, { isSuccess }] = useSetCityMutation();

  const handleSelect = (city: CityBranch) => {
    setCity({ city_brach_id: city.id });
  };

  useEffect(() => {
    if (isSuccess) {
      setOpen(false);
    }
  }, [isSuccess]);

  return (
    <StyledModal open={open} onClose={() => setOpen(false)}>
      <StyledBox>
        <Typography variant="h6" component="h2" textAlign="center">
          Выберите город
        </Typography>
        <List>
          {mobileToken?.company_info.city_branches.map(branch => (
            <StyledListItem
              key={branch.id}
              onClick={() => handleSelect(branch)}
              selected={mobileToken.city_branch?.id === branch.id}>
              <ListItemText primary={branch.title} />
            </StyledListItem>
          ))}
        </List>
      </StyledBox>
    </StyledModal>
  );
};

const StyledModal = styled(Modal)`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StyledBox = styled("div")`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 50vw;
  background-color: white;
  box-shadow: 24;
  padding: 16px;
  border-radius: 8px;
`;

const StyledListItem = styled(ListItem)<{ selected: boolean }>`
  background-color: ${({ selected }) => (selected ? "lightgray" : "transparent")};
  &:hover {
    background-color: lightblue;
  }
`;
