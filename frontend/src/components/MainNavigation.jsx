import React from "react";

import Logo from "./Logo";
import LoginButton from "./LoginButton";
import SignUpButton from "./SignUpButton";

import classes from "./MainNavigation.module.css";

const MainNavigation = () => {
  return (
    <div className={classes.nav}>
      <Logo />
      <div>
        <LoginButton />
        <SignUpButton />
      </div>
    </div>
  );
};

export default MainNavigation;
