import React, { useState } from "react";

export const defaultUser =
  window && window.sessionStorage.getItem("user")
    ? JSON.parse(window.sessionStorage.getItem("user"))
    : {
        user: { email: "", expiresIn: "", idToken: "", isLoggedIn: false },
        setUser: () => {},
        resetUser: () => {},
      };

export const UserContext = React.createContext(defaultUser);

const UserStore = ({ children }) => {
  const [user, setUserData] = useState(defaultUser);

  const setUser = (user) => {
    setUserData(user);
    window.sessionStorage.setItem("user", JSON.stringify(user));
  };

  const resetUser = () => {
    setUser(defaultUser);
    window.sessionStorage.removeItem("user");
  };
  return (
    <UserContext.Provider value={{ user, setUser, resetUser }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserStore;
