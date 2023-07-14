import React, { useState } from "react";

import { useCookies } from "react-cookie";

const AuthContext = React.createContext({
  isLoggedIn: false,
  user: null,
  onLogin: () => {},
});

export const AuthContextProvider = (props) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  const [, setCookie] = useCookies();

  const loginHandler = async (token) => {
    setIsLoggedIn(true);

    setCookie("token", token, { path: "/" });

    const response = await fetch("/api/v1/auth/me");
    const responseData = await response.json();
    setUser(responseData.data);
  };

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: isLoggedIn,
        user,
        onLogin: loginHandler,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
