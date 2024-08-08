import React from "react";
import { Box, CardMedia, Typography } from "@mui/material";
import { styled } from "@mui/system";
import { useSearchParams } from "react-router-dom";
import { Category } from "@shared/types";
import { IMAGES } from "@shared/assets/images";

const StyledBox = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  maxWidth: "50vw",
  borderRadius: 10,
  padding: theme.spacing(1),
  margin: 1,
  backgroundColor: "#fff",
  boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
}));

const StyledTitle = styled(Typography)(({ theme }) => ({
  marginTop: theme.spacing(1),
  fontWeight: "bold",
  textAlign: "center",
}));

const StyledCardMedia = styled(CardMedia)`
  width: 100px;
  height: 100px;
  object-fit: cover;
`;

export const CategoryListItem: React.FC<{ category: Category }> = ({ category }) => {
  const [, setSearchParams] = useSearchParams();

  return (
    <StyledBox
      onClick={() => {
        setSearchParams({ category: category._id });
      }}>
      <StyledCardMedia image={category.icon_url || IMAGES.noImage} />
      <StyledTitle>{category.title}</StyledTitle>
    </StyledBox>
  );
};
