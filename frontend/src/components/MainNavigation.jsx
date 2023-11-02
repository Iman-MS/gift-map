import React, { useState } from "react";

import Logo from "./Logo";
import LoginButton from "./LoginButton";
import SignUpButton from "./SignUpButton";

import classes from "./MainNavigation.module.css";

const MainNavigation = () => {
  const [hasScrolled, setHasScrolled] = useState(false);

  window.onscroll = function () {
    if (window.scrollY === 0) {
      setHasScrolled(false);
    } else {
      setHasScrolled(true);
    }
  };

  return (
    <div className={`${classes.nav} ${hasScrolled && classes["nav-shadow"]}`}>
      <Logo />
      <div className={classes["nav-buttons"]}>
        <LoginButton />
        <SignUpButton />
      </div>
    </div>
  );
};

export default MainNavigation;
