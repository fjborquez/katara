export type House = {
  id: number;
  description: string;
  city_id: number;
  is_active: boolean;
  pivot: {
    is_default: boolean;
  }
}
