import React, { useState, useEffect } from "react";

import { useCookies } from "react-cookie";

const AuthContext = React.createContext({
  isLoggedIn: false,
  user: null,
  onLogin: () => {},
  onLogout: () => {},
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
    removeCookie("token");
  };

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: isLoggedIn,
        user,
        onLogin: loginHandler,
        onLogout: logoutHandler,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
