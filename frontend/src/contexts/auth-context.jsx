import React, { useState, useEffect } from "react";

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

  const fetchUser = async () => {
    const response = await fetch("/api/v1/auth/me");
    const responseData = await response.json();

    if (response.ok) {
      setIsLoggedIn(true);
      setUser(responseData.data);
    } else {
      setIsLoggedIn(false);
      setUser(null);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const loginHandler = async () => {
    fetchUser();
  };

  const logoutHandler = async () => {
    await fetch("/api/v1/auth/logout");
    fetchUser();
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
