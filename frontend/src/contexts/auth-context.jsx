import React, { useState, useEffect } from "react";

import Cookies from "js-cookie";

const AuthContext = React.createContext({
  isLoggedIn: false,
  user: null,
  onLogin: async () => {},
  onLogout: () => {},
  onUserNameChange: async () => {},
});

export const AuthContextProvider = (props) => {
  const [token, setToken] = useState(Cookies.get("frontend-token"));
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      if (token) {
        const response = await fetch("/api/v1/auth/me");
        const responseData = await response.json();
        setUser(responseData.data);
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
        setUser(null);
      }
    };
    fetchUser();
  }, [token, user]);

  const loginHandler = async (token) => {
    setIsLoggedIn(true);

    Cookies.set("frontend-token", token);
    setToken(token);
  };

  const logoutHandler = () => {
    setToken(null);
    Cookies.remove("frontend-token");
    fetch("/api/v1/auth/logout");
  };

  const userNameChangeHandler = async (body) => {
    const response = await fetch("/api/v1/users/", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    const responseData = await response.json();

    setUser(responseData.data);
  };

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        user,
        onLogin: loginHandler,
        onLogout: logoutHandler,
        onUserNameChange: userNameChangeHandler,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
