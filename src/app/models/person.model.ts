import { House } from "./house.model";
import { NutritionalRestriction } from "./nutritional-restriction.model";

export type Person = {
  id: number;
  name: string;
  lastname: string;
  date_of_birth: Date;
  nutritional_profile: NutritionalRestriction[];
  houses: House[];
}
