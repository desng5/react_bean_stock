import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { Home } from "./views/Home";
import { Login } from "./views/Login";
import { Register } from "./views/Register";
import { Coffees } from "./views/Coffees";
import { Navigation } from "./components/Navigation";
import { AlertMessage } from "./components/AlertMessage";
import { UserType } from "./types/user";
import { CategoryType } from "./types/category";
import { getMe } from "./lib/apiWrapper";

export const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [loggedIn, setLoggedIn] = useState(
    (localStorage.getItem("token") &&
      new Date(localStorage.getItem("tokenExp") as string) > new Date()) ||
      false
  );
  const [loggedInUser, setLoggedInUser] = useState<UserType | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [category, setCategory] = useState<CategoryType>(null);

  useEffect(() => {
    const getLoggedInUser = async () => {
      setIsLoading(true);
      const token = localStorage.getItem("token");
      const response = await getMe(token!);
      setLoggedInUser(response.data!);
      setIsLoading(false);
    };
    if (loggedIn) {
      getLoggedInUser();
    } else {
      setIsLoading(false);
    }
  }, []);

  const flashMessage = (
    message: string | null,
    category: CategoryType
  ): void => {
    setMessage(message);
    setCategory(category);
  };

  const logUserIn = (user: UserType): void => {
    setLoggedIn(true);
    setLoggedInUser(user);
    flashMessage("You have successfully logged in", "success");
  };

  const logUserOut = (): void => {
    setLoggedIn(false);
    setLoggedInUser(null);
    localStorage.removeItem("token");
    localStorage.removeItem("tokenExp");
    flashMessage("You are now logged out", "info");
  };

  if (isLoading) {
    return <div>Loading...</div>; // Loading screen
  }

  return (
    <div className="h-screen font-roboto">
      <Navigation loggedIn={loggedIn} logUserOut={logUserOut} />
      {message && (
        <AlertMessage
          message={message}
          category={category}
          flashMessage={flashMessage}
        />
      )}
      <Routes>
        <Route
          path="/"
          element={<Home user={loggedInUser} flashMessage={flashMessage} />}
        />
        <Route
          path="/login"
          element={<Login logUserIn={logUserIn} flashMessage={flashMessage} />}
        />
        <Route
          path="/register"
          element={
            <Register logUserIn={logUserIn} flashMessage={flashMessage} />
          }
        />
        <Route path="/coffees" element={<Coffees user={loggedInUser} />} />
      </Routes>
    </div>
  );
};