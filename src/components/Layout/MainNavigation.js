import { Link } from "react-router-dom";
import { useContext } from "react";
import { useHistory } from "react-router-dom";
import { UserContext } from "../../store/UserStore";
import classes from "./MainNavigation.module.css";

const MainNavigation = () => {
  const {
    user: { isLoggedIn },
    resetUser,
  } = useContext(UserContext);
  
  const { push } = useHistory();

  const onLogout = () => {
    resetUser();
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
