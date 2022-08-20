import classes from "./ProfileForm.module.css";
import { useContext } from "react";
import { useHistory } from "react-router-dom";
import { SessionContext } from "../../store/SessionStore";

const ProfileForm = () => {
  let passwordRef = null;

  const {
    session: { idToken },
    resetSession,
  } = useContext(SessionContext);

  const { push } = useHistory();

  const onSubmitHandler = (event) => {
    event.preventDefault();

    if (passwordRef.value) {
      const payload = {
        idToken,
        password: passwordRef.value,
        returnSecureToken: true,
      };

      console.log("payload", payload);
      fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyB8ohul70IyWBlUJfwMaswqpu2nkPewseg",
        {
          method: "POST",
          body: JSON.stringify(payload),
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
        .then((response) => {
          if (response.ok) {
            response.json().then((data) => {
              console.log("authentication", data);
              alert("Please login again with the new password!");
              resetSession();
              push("/");
            });
          } else {
            alert("Server Error!");
          }
        })
        .catch((e) => {
          console.log(e);
        });
    }
  };

  return (
    <form className={classes.form} onSubmit={onSubmitHandler}>
      <div className={classes.control}>
        <label htmlFor="new-password">New Password</label>
        <input
          type="password"
          id="new-password"
          required
          ref={(ref) => {
            passwordRef = ref;
          }}
        />
      </div>
      <div className={classes.action}>
        <button type="submit">Change Password</button>
      </div>
    </form>
  );
};

export default ProfileForm;
