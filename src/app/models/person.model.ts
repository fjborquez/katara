import { NutritionalProfileDetail } from './nutritional-profile-detail.model';
import { House } from "./house.model";

export type Person = {
  id: number;
  name: string;
  lastname: string;
  date_of_birth: Date;
  nutritional_profile: NutritionalProfileDetail[];
  houses: House[];
}
