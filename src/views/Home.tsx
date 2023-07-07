import { useState, FormEvent, ChangeEvent } from "react";
import { CoffeeForm } from "../components/CoffeeForm";
import { UserType } from "../types/user";
import { CategoryType } from "../types/category";
import { CoffeeType } from "../types/coffee";
import { createCoffee } from "../lib/apiWrapper";

type HomeProps = {
  user: UserType | null;
  flashMessage: (message: string | null, category: CategoryType) => void;
};

export const Home = ({ user, flashMessage }: HomeProps) => {
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
      flashMessage(newCoffee.name + " brewed successfully! Check 'Your Brews'", "success");
    }
  };
  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>
  ): void => {
    setNewCoffee({ ...newCoffee, [e.target.name]: e.target.value });
  };
  const handleRatingChange = (value: number) => {
    setNewCoffee({ ...newCoffee, rating: value });
  };

  return (
    <div className="flex flex-col items-center justify-center">
      {user ? (
        <h1 className="text-3xl text-amber-50">
          Welcome <span className="text-amber-400">{user?.username}</span>
        </h1>
      ) : (
        <h1 className="text-3xl text-amber-50">
          Hello, please log in to continue!
        </h1>
      )}
      {user && (
        <button
          className="mt-8 rounded-full border-4 border-amber-50 px-6 py-1 text-amber-50 duration-200 hover:border-amber-400 hover:text-amber-400"
          onClick={() => {
            setDisplayCoffee(!displayCoffee);
          }}
        >
          {displayCoffee ? "Close" : "Brew"}
        </button>
      )}
      {displayCoffee && user && (
        <CoffeeForm
          handleSubmit={handleFormSubmit}
          handleChange={handleInputChange}
          handleRatingChange={handleRatingChange}
          newCoffee={newCoffee}
        />
      )}
    </div>
  );
};