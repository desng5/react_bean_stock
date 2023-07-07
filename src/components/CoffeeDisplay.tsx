import { Dispatch, SetStateAction, MouseEvent } from "react";
import Rating from "@mui/material/Rating/Rating";
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
    <div className="flex flex-col">
      <div className="z-30 -mb-6 -mr-2 text-right">
        {coffee.user_id === user?.id ? (
          <button
            className="h-8 w-8 rounded-full border border-amber-50 bg-red-600 font-bold text-amber-50 hover:animate-ping"
            onClick={handleDelete}
          >
            ❌
          </button>
        ) : null}
      </div>
      <div className="flex snap-center items-center rounded-2xl bg-[#A0D5D3]">
        <div
          style={{
            backgroundImage: "url('/src/assets/coffee-cup.webp')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
          className="flex h-72 w-72 items-center justify-center rounded-2xl"
        >
          <img
            className="absolute h-28 w-28 rounded-full"
            src={coffee.image_url}
            alt={coffee.name}
          />
        </div>
        <div className="mx-4">
          <div className="text-3xl">{coffee.name}</div>
          <div>Type: {coffee.coffee_type}</div>
          <div>${coffee.price}</div>
          <div>"{coffee.description}"</div>
          <div>Method: {coffee.brew_method}</div>
          <div>Roaster: {coffee.roaster}</div>
          <div className="grid grid-cols-2 gap-4">
            <Rating
              name="read-only"
              value={Number(coffee.rating)}
              precision={0.5}
              readOnly
            />
            {coffee.rating}/5
          </div>
        </div>
      </div>
      <div className="flex w-full justify-between px-8 text-amber-500">
        <div>Created by: {user?.username}</div>
        <div>on {date.toString().split(" ").slice(0, 5).join(" ")}</div>
      </div>
    </div>
  );
};