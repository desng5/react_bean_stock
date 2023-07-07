import { CoffeeDisplay } from "../components/CoffeeDisplay";
import { useState, useEffect } from "react";
import { UserType } from "../types/user";
import { CoffeeType } from "../types/coffee";
import { getAllCoffees } from "../lib/apiWrapper";

type CoffeesProps = {
  user: UserType | null;
};

export const Coffees = ({ user }: CoffeesProps) => {
  const [coffees, setCoffees] = useState<CoffeeType[]>([]);
  const [update, setUpdate] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const response = await getAllCoffees();
      if (response.data) {
        setCoffees(response.data);
      }
    };
    fetchData();
  }, [update]);

  return (
    <div className="flex justify-center">
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 xl:grid-cols-3">
        {user &&
          coffees
            .filter((coffee) => coffee.user_id === user.id)
            .map((coffee) => (
              <CoffeeDisplay
                key={coffee.id}
                coffee={coffee}
                user={user}
                setUpdate={setUpdate}
                update={update}
              />
            ))}
      </div>
      {user && (
        <button
          className="hover:animate-pulse fixed bottom-1.5 rounded-full bg-red-600 px-4 py-2"
          onClick={() => {
            setCoffees([]);
          }}
        >
          Dump All Coffees
        </button>
      )}
    </div>
  );
};