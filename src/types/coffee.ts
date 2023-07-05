import { UserType } from "./user";

export type CoffeeType = {
  id?: number;
  name?: string;
  coffee_type?: string;
  price?: number;
  description?: string;
  rating?: number;
  brew_method?: string;
  roaster?: string;
  image_url?: string;
  brewer?: UserType;
  date_created?: string;
};
