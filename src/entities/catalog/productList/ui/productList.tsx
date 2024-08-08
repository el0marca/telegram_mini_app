import { CartItem, CategoryItem } from "@shared/types";
import { ProductListItem } from "@entities/catalog/productListItem";
import { Box } from "@mui/material";

interface ProductListProps {
  products?: CategoryItem[] | CartItem[];
}

export const ProductList: React.FC<ProductListProps> = ({ products }) => {
  return (
    <Box sx={{ minHeight: "100vh" }}>
      {products?.map(p => (
        <ProductListItem product={p} key={p._id} />
      ))}
    </Box>
  );
};
