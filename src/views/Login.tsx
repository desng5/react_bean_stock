import { useState, ChangeEvent, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { UserType } from "../types/user";
import { CategoryType } from "../types/category";
import { login, getMe } from "../lib/apiWrapper";

type LoginProps = {
  logUserIn: (user: UserType) => void;
  flashMessage: (message: string | null, category: CategoryType) => void;
};

export const Login = ({ logUserIn, flashMessage }: LoginProps) => {
  const [user, setUser] = useState<UserType>({
    id: 1,
    username: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };
  const handleFormSubmit = async (
    e: FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();
    const response = await login(user.email!, user.password!);
    if (response.error) {
      flashMessage(response.error, "danger");
    } else {
      localStorage.setItem("token", response.data?.token as string);
      localStorage.setItem("tokenExp", response.data?.tokenExp as string);
      const token = localStorage.getItem("token");
      const userResponse = await getMe(token as string);
      if (userResponse.error) {
        flashMessage(userResponse.error, "danger");
      } else {
        logUserIn(userResponse.data!);
        navigate("/");
      }
    }
  };

  return (
    <div className="mx-auto flex w-fit flex-col items-center justify-center rounded-2xl border-4 border-double border-amber-50 bg-gradient-to-b from-amber-700 to-amber-950 px-6 py-20">
      <h1 className="mb-16 text-3xl text-amber-50">Login Here</h1>
      <form
        className="grid place-items-end gap-y-8 text-xl text-amber-50"
        onSubmit={handleFormSubmit}
      >
        <div>
          <label className="mr-4">Email:</label>
          <input
            className="rounded-md px-4 py-1 text-amber-950"
            name="email"
            value={user.email}
            onChange={handleInputChange}
            type="email"
          />
        </div>
        <div>
          <label className="mr-4">Password:</label>
          <input
            className="rounded-md px-4 py-1 text-amber-950"
            name="password"
            value={user.password}
            onChange={handleInputChange}
            type="password"
          />
        </div>
        <button
          className="mt-16 place-self-center rounded-full border-2 border-amber-50 px-8 py-2 duration-200 hover:bg-amber-50 hover:text-amber-950"
          type="submit"
        >
          Log In
        </button>
      </form>
    </div>
  );
};
