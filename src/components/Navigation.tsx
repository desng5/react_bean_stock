import { Link, useLocation } from "react-router-dom";

type NavigationProps = {
  loggedIn: boolean;
  logUserOut: () => void;
};

export const Navigation = ({ loggedIn, logUserOut }: NavigationProps) => {
  const location = useLocation().pathname;

  const linkClass = "duration-200 hover:text-amber-500 hover:underline";
  const activeLinkClass = "underline";

  return (
    <div className="flex snap-start justify-center py-4 text-3xl font-bold text-amber-400 underline-offset-4">
      <Link
        className={`${linkClass} mr-10 ${
          location === "/" ? activeLinkClass : ""
        }`}
        to="/"
      >
        Home
      </Link>
      <span className="font-normal">|</span>
      {loggedIn ? (
        <>
          <Link
            className={`${linkClass} ml-10 ${
              location === "/coffees" ? activeLinkClass : ""
            }`}
            to="/coffees"
          >
            Your Brews
          </Link>
          <span className="ml-[1ch] mr-10">☕</span>
          <span className="font-normal">|</span>
          <Link className={`${linkClass} ml-10`} to="/" onClick={logUserOut}>
            Log Out
          </Link>
        </>
      ) : (
        <>
          <Link
            className={`${linkClass} mx-10 ${
              location === "/login" ? activeLinkClass : ""
            }`}
            to="/login"
          >
            Log In
          </Link>
          <span className="font-normal">|</span>
          <Link
            className={`${linkClass} ml-10 ${
              location === "/register" ? activeLinkClass : ""
            }`}
            to="/register"
          >
            Register
          </Link>
        </>
      )}
    </div>
  );
};