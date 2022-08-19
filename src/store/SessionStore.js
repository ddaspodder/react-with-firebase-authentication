import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

export const defaultSession = {
  user: {
    email: "",
    expiresIn: "",
    expiresAt: "",
    idToken: "",
    isLoggedIn: false,
  },
  setUser: () => {},
  resetUser: () => {},
};

export const initialSession =
  window && window.sessionStorage.getItem("auth")
    ? JSON.parse(window.sessionStorage.getItem("auth"))
    : defaultSession;

export const SessionContext = React.createContext(initialSession);

const SessionStore = ({ children }) => {
  const { push } = useHistory();
  const [session, setSessionData] = useState(initialSession);

  let timer;

  const autoLogout = () => {
    const { expiresAt } = session;

    if (expiresAt) {
      const duration = new Date(expiresAt) - new Date().getTime();

      timer = setTimeout(() => {
        resetSession();
        push("/");
      }, duration);
    }
  };

  const setSession = (session) => {
    setSessionData(session);
    window.sessionStorage.setItem("auth", JSON.stringify(session));
  };

  const resetSession = () => {
    setSessionData(defaultSession);
    window.sessionStorage.removeItem("auth");
    clearTimeout(timer);
  };

  useEffect(() => {
    autoLogout();
    return () => {
      clearTimeout(timer);
    };
  }, [session]);

  return (
    <SessionContext.Provider value={{ session, setSession, resetSession }}>
      {children}
    </SessionContext.Provider>
  );
};

export default SessionStore;
