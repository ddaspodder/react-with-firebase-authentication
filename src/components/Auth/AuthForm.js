import { useState, useContext } from "react";
import { UserContext } from "../../store/UserStore";
import classes from "./AuthForm.module.css";

const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(true);
  let emailRef = null;
  let passwordRef = null;

  const { setUser } = useContext(UserContext);

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  const onSubmitHandler = (event) => {
    event.preventDefault();
    console.log("payload", emailRef.value, passwordRef.value);

    let url = "";
    let errMessage = "";

    if (isLogin) {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyB8ohul70IyWBlUJfwMaswqpu2nkPewseg";
      errMessage = "Authentication Failed.";
    } else {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyB8ohul70IyWBlUJfwMaswqpu2nkPewseg";
      errMessage = "Server Error.";
    }

    if (emailRef && passwordRef) {
      fetch(url, {
        method: "POST",
        body: JSON.stringify({
          email: emailRef.value,
          password: passwordRef.value,
          returnSecureToken: true,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => {
          if (response.ok) {
            response.json().then((data) => {
              const { email, expiresIn, idToken } = data;
              setUser({ email, expiresIn, idToken, isLoggedIn: true });
              console.log("authentication", data);
            });
          } else {
            alert(errMessage);
          }
        })
        .catch((err) => console.log(err));
    }
  };

  return (
    <section className={classes.auth}>
      <h1>{isLogin ? "Login" : "Sign Up"}</h1>
      <form onSubmit={onSubmitHandler}>
        <div className={classes.control}>
          <label htmlFor="email">Your Email</label>
          <input
            type="email"
            id="email"
            required
            ref={(ref) => {
              emailRef = ref;
            }}
          />
        </div>
        <div className={classes.control}>
          <label htmlFor="password">Your Password</label>
          <input
            type="password"
            id="password"
            required
            ref={(ref) => {
              passwordRef = ref;
            }}
          />
        </div>
        <div className={classes.actions}>
          <button type="submit">{isLogin ? "Login" : "Create Account"}</button>
          <button
            type="button"
            className={classes.toggle}
            onClick={switchAuthModeHandler}
          >
            {isLogin ? "Create new account" : "Login with existing account"}
          </button>
        </div>
      </form>
    </section>
  );
};

export default AuthForm;
