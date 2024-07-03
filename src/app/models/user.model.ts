import { Person } from "./person.model";

export type User = {
  id: number;
  email: string;
  person: Person;
  password: string;
}
