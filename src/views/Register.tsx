import { useState, ChangeEvent, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { UserType } from "../types/user";
import { CategoryType } from "../types/category";
import { register } from "../lib/apiWrapper";

type RegisterProps = {
  logUserIn: (user: UserType) => void;
  flashMessage: (message: string | null, category: CategoryType) => void;
};

export const Register = ({ logUserIn, flashMessage }: RegisterProps) => {
  const [newUser, setNewUser] = useState<UserType>({
    username: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setNewUser({ ...newUser, [e.target.name]: e.target.value });
  };
  const handleFormSubmit = async (
    e: FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();

    const response = await register(newUser);
    if (response.error) {
      flashMessage(response.error, "danger");
    } else {
      flashMessage(response.data?.username + " has been created", "success");
      logUserIn(response.data!);
      navigate("/");
    }
  };

  return (
    <div className="mx-auto flex w-fit flex-col items-center justify-center rounded-2xl border-4 border-double border-amber-50 bg-gradient-to-b from-amber-700 to-amber-950 px-6 py-20">
      <h1 className="mb-16 text-3xl text-amber-50">Register Here</h1>
      <form
        className="grid place-items-end gap-y-8 text-xl text-amber-50"
        onSubmit={handleFormSubmit}
      >
        <div>
          <label className="mr-4">Username:</label>
          <input
            className="rounded-md px-4 py-1 text-amber-950"
            name="username"
            value={newUser.username}
            onChange={handleInputChange}
            type="text"
          />
        </div>
        <div>
          <label className="mr-4">Email:</label>
          <input
            className="rounded-md px-4 py-1 text-amber-950"
            name="email"
            value={newUser.email}
            onChange={handleInputChange}
            type="email"
          />
        </div>
        <div>
          <label className="mr-4">Password:</label>
          <input
            className="rounded-md px-4 py-1 text-amber-950"
            name="password"
            value={newUser.password}
            onChange={handleInputChange}
            type="password"
          />
        </div>
        <button
          className="mt-16 place-self-center rounded-full border-2 border-amber-50 px-8 py-2 duration-200 hover:bg-amber-50 hover:text-amber-950"
          type="submit"
        >
          Register
        </button>
      </form>
    </div>
  );
};