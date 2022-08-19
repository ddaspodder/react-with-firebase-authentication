import { Link } from "react-router-dom";
import { useContext } from "react";
import { useHistory } from "react-router-dom";
import { SessionContext } from "../../store/SessionStore";
import classes from "./MainNavigation.module.css";

const MainNavigation = () => {
  const {
    session: { isLoggedIn },
    resetSession,
  } = useContext(SessionContext);

  const { push } = useHistory();

  const onLogout = () => {
    resetSession();
    push("/");
  };

  return (
    <header className={classes.header}>
      <Link to="/">
        <div className={classes.logo}>React Auth</div>
      </Link>
      <nav>
        <ul>
          {isLoggedIn ? (
            <>
              <li>
                <Link to="/profile">Profile</Link>
              </li>
              <li>
                <button onClick={onLogout}>Logout</button>
              </li>
            </>
          ) : (
            <li>
              <Link to="/auth">Login</Link>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default MainNavigation;
