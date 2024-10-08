import { ConsumptionLevel } from "./consumption-level.model";

export type NutritionalProfileDetail = {
  product_category_id: number;
  product_category_name: string;
  consumption_level_id: number;
  consumption_level: ConsumptionLevel;
}
