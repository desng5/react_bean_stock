import { FormEvent, ChangeEvent } from "react";
import { CoffeeType } from "../types/coffee";

type CoffeeFormProps = {
  handleSubmit: (e: FormEvent) => void;
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
  newCoffee: CoffeeType;
};

export const CoffeeForm = ({
  handleSubmit,
  handleChange,
  newCoffee,
}: CoffeeFormProps) => {
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>Name</label>
        <input
          name="name"
          value={newCoffee.name}
          onChange={handleChange}
          type="text"
        />
        <label>Coffee Type</label>
        <input
          name="coffee_type"
          value={newCoffee.coffee_type}
          onChange={handleChange}
          type="text"
        />
        <label>Price</label>
        <input
          name="price"
          value={newCoffee.price}
          onChange={handleChange}
          type="text"
        />
        <label>Description</label>
        <input
          name="description"
          value={newCoffee.description}
          onChange={handleChange}
          type="text"
        />
        <label>Rating</label>
        <input
          name="rating"
          value={newCoffee.rating}
          onChange={handleChange}
          type="text"
        />
        <label>Brew Method</label>
        <input
          name="brew_method"
          value={newCoffee.brew_method}
          onChange={handleChange}
          type="text"
        />
        <label>Roaster</label>
        <input
          name="roaster"
          value={newCoffee.roaster}
          onChange={handleChange}
          type="text"
        />
        <button type="submit">Create Coffee</button>
      </form>
    </div>
  );
};