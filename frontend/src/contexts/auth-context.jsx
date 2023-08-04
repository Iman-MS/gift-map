import React, { useState, useEffect } from "react";

import { useCookies } from "react-cookie";

const AuthContext = React.createContext({
  isLoggedIn: false,
  user: null,
  onLogin: async () => {},
  onLogout: () => {},
  onUserNameChange: async () => {},
});

export const AuthContextProvider = (props) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  const [cookie, setCookie, removeCookie] = useCookies();

  useEffect(() => {
    const fetchUser = async () => {
      if (cookie.token) {
        const response = await fetch("/api/v1/auth/me");
        const responseData = await response.json();
        setUser(responseData.data);
        setIsLoggedIn(true);
      }
    };
    fetchUser();
  }, [cookie]);

  const loginHandler = async (token) => {
    setIsLoggedIn(true);

    setCookie("token", token, { path: "/" });

    // const response = await fetch("/api/v1/auth/me");
    // const responseData = await response.json();
    // setUser(responseData.data);
  };

  const logoutHandler = () => {
    setIsLoggedIn(false);
    setUser(null);
    removeCookie("token", { path: "/" });
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
