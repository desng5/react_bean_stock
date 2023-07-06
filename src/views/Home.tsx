import { useEffect, useState, FormEvent, ChangeEvent } from "react";
import { CoffeeForm } from "../components/CoffeeForm";
import { CoffeeDisplay } from "../components/CoffeeDisplay";
import { UserType } from "../types/user";
import { CategoryType } from "../types/category";
import { CoffeeType } from "../types/coffee";
import { getAllCoffees, createCoffee } from "../lib/apiWrapper";

type HomeProps = {
  user: UserType | null;
  flashMessage: (message: string | null, category: CategoryType) => void;
};

export const Home = ({ user, flashMessage }: HomeProps) => {
  const [coffees, setCoffees] = useState<CoffeeType[]>([]);
  const [newCoffee, setNewCoffee] = useState<CoffeeType>({
    name: "",
    coffee_type: "",
    price: 0,
    description: "",
    rating: 0,
    brew_method: "",
    roaster: "",
  });
  const [displayCoffee, setDisplayCoffee] = useState(false);
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

  const handleFormSubmit = async (e: FormEvent): Promise<void> => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    const response = await createCoffee(newCoffee, token!);
    if (response.error) {
      flashMessage(response.error, "danger");
    } else {
      setUpdate(!update);
      setNewCoffee({
        name: "",
        coffee_type: "",
        price: 0,
        description: "",
        rating: 0,
        brew_method: "",
        roaster: "",
      });
      setDisplayCoffee(false);
      flashMessage(newCoffee.name + " brewed successfully", "success");
    }
  };
  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>
  ): void => {
    setNewCoffee({ ...newCoffee, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <h1>Welcome {user?.username}</h1>
      {user && (
        <button
          onClick={() => {
            setDisplayCoffee(!displayCoffee);
          }}
        >
          {displayCoffee ? "Close X" : "Brew +"}
        </button>
      )}
      {displayCoffee && user && (
        <CoffeeForm
          handleSubmit={handleFormSubmit}
          handleChange={handleInputChange}
          newCoffee={newCoffee}
        />
      )}
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
      {user && (
        <button
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