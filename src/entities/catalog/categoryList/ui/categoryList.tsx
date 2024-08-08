import React from "react";
import { Box, Grid } from "@mui/material";
import { Category } from "@shared/types";
import { CategoryListItem } from "./categoryListItem";

interface CategoryListProps {
  categories?: Category[];
}

export const CategoryList: React.FC<CategoryListProps> = ({ categories }) => {
  return (
    <Box sx={{ mb: 1 }}>
      <Grid container>
        {categories?.map((category, index) => (
          <Grid item xs={6} sm={6} key={index}>
            <CategoryListItem category={category} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};
