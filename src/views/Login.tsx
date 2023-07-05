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
    <div>
      <h1>Login Here</h1>
      <form onSubmit={handleFormSubmit}>
        <label>Email</label>
        <input
          name="email"
          value={user.email}
          onChange={handleInputChange}
          type="email"
        />
        <label>Password</label>
        <input
          name="password"
          value={user.password}
          onChange={handleInputChange}
          type="password"
        />
        <button type="submit">Log In</button>
      </form>
    </div>
  );
};
