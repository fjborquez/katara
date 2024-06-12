import { House } from "./house.model";
import { NutritionalRestriction } from "./nutritional-restriction.model";

export type Resident = {
  id: number;
  name: string;
  lastname: string;
  date_of_birth: string;
  nutritional_profile: NutritionalRestriction[];
  houses: House[]
}
