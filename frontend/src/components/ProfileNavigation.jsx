import React, { useState, useContext } from "react";

import AuthContext from "../contexts/auth-context";

import Logo from "./Logo";
import SearchUser from "./SearchUser";
import AvatarIcon from "./AvatarIcon";
import LoginButton from "./LoginButton";
import SignUpButton from "./SignUpButton";
import RecentlyAddedGifts from "./RecentlyAddedGiftsButton";

import classes from "./ProfileNavigation.module.css";

const ProfileNavigaion = () => {
  const [hasScrolled, setHasScrolled] = useState(false);
  const authCtx = useContext(AuthContext);

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
      <SearchUser />
      <div className={classes["profile-icon"]}>
        <RecentlyAddedGifts />
        {authCtx.isLoggedIn ? (
          <AvatarIcon />
        ) : (
          // to be implemented(change with login and signup buttons)
          <>
            <LoginButton />
            <SignUpButton />
          </>
        )}
      </div>
    </div>
  );
};

export default ProfileNavigaion;
