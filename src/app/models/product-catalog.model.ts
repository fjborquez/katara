import { ProductPresentation } from './product-presentation.model';
import { ProductType } from './product-type.model';
import { ProductBrand } from './product-brand.model';
import { ProductCategory } from "./product-category.model";

export type ProductCatalog = {
  id: number;
  category_id: number;
  brand_id: number;
  type_id: number;
  presentation_id: number;
  created_at: Date;
  updated_at: Date;
  category: ProductCategory;
  brand: ProductBrand;
  type: ProductType;
  presentation: ProductPresentation;
}
