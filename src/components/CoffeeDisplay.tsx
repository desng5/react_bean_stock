import { Dispatch, SetStateAction, MouseEvent } from "react";
import { CoffeeType } from "../types/coffee";
import { UserType } from "../types/user";
import { deleteCoffee } from "../lib/apiWrapper";

type CoffeeDisplayProps = {
  coffee: CoffeeType;
  user: UserType | null;
  setUpdate: Dispatch<SetStateAction<boolean>>;
  update: boolean;
};

export const CoffeeDisplay = ({
  coffee,
  user,
  setUpdate,
  update,
}: CoffeeDisplayProps) => {
  const date = new Date(coffee.date_created as string);
  const handleDelete = (_: MouseEvent): void => {
    const token = localStorage.getItem("token");
    deleteCoffee(coffee.id!, token!);
    setTimeout(() => {
      setUpdate(!update);
    }, 1000);
  };

  return (
    <div>
      <div className="text-3xl">{coffee.name}</div>
      <div>{coffee.coffee_type}</div>
      <div>{coffee.price}</div>
      <div>{coffee.description}</div>
      <div>{coffee.rating}</div>
      <div>{coffee.brew_method}</div>
      <div>{coffee.roaster}</div>
      <div>{coffee.image_url}</div>
      <div className="w-48">
        <img src={coffee.image_url} alt={coffee.name} />
      </div>
      <div>Created by: {coffee.brewer?.username}</div>
      <div>on {date.toString()}</div>
      <div>
        {coffee.brewer?.username === user?.username ? (
          <button onClick={handleDelete}>Delete Coffee</button>
        ) : null}
      </div>
    </div>
  );
};