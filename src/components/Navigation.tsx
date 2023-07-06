import { Link } from 'react-router-dom'

type NavigationProps = {
  loggedIn: boolean;
  logUserOut: () => void;
};

export const Navigation = ({ loggedIn, logUserOut }: NavigationProps) => {
  return (
    <div>
      { loggedIn ? (
        <>
          <Link to='/' onClick={logUserOut}>Log Out</Link>
          <Link to='/coffees'>Create Coffee</Link>
        </>
      ) : (
        <>
          <Link to='/login'>Log In</Link>
          <Link to='/register'>Register</Link>
        </>
      )}
    </div>
  )
};
