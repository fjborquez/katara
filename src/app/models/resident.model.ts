import { House } from "./house.model";
import { NutritionalProfileDetail } from "./nutritional-profile-detail.model";

export type Resident = {
  id: number;
  name: string;
  lastname: string;
  date_of_birth: string;
  nutritional_profile: NutritionalProfileDetail[];
  houses: House[]
}
