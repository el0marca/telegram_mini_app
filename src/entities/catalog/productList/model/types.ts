import { Category, CategoryItem } from "@shared/types";

export interface ProductDetailsServerResponse {
  category: Category;
  item: CategoryItem;
}

export interface GetCatalogParams {
  categoryId?: string;
  q?: string;
}
