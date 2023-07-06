import { Link } from "react-router-dom";

type NavigationProps = {
  loggedIn: boolean;
  logUserOut: () => void;
};

export const Navigation = ({ loggedIn, logUserOut }: NavigationProps) => {
  return (
    <div className="my-4 flex justify-center text-3xl font-bold text-amber-400">
      {loggedIn ? (
        <>
          <Link className="mr-10" to="/" onClick={logUserOut}>
            Log Out
          </Link>
          <span className="font-normal">|</span>
          <Link className="ml-10" to="/coffees">
            Create Coffee
          </Link>
        </>
      ) : (
        <>
          <Link className="mr-10" to="/login">
            Log In
          </Link>
          <span className="font-normal">|</span>
          <Link className="ml-10" to="/register">
            Register
          </Link>
        </>
      )}
    </div>
  );
};