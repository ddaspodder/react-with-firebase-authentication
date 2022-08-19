import React, { useState } from "react";

export const defaultSession =
  window && window.sessionStorage.getItem("auth")
    ? JSON.parse(window.sessionStorage.getItem("auth"))
    : {
        user: { email: "", expiresIn: "", idToken: "", isLoggedIn: false },
        setUser: () => {},
        resetUser: () => {},
      };

export const SessionContext = React.createContext(defaultSession);

const SessionStore = ({ children }) => {
  const [session, setSessionData] = useState(defaultSession);

  const setSession = (session) => {
    setSessionData(session);
    window.sessionStorage.setItem("auth", JSON.stringify(session));
  };

  const resetSession = () => {
    setSession(defaultSession);
    window.sessionStorage.removeItem("auth");
  };
  return (
    <SessionContext.Provider value={{ session, setSession, resetSession }}>
      {children}
    </SessionContext.Provider>
  );
};

export default SessionStore;
