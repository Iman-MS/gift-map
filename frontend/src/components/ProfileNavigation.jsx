import React, { useContext } from "react";

import AuthContext from "../contexts/auth-context";

import Logo from "./Logo";
import SearchUser from "./SearchUser";
import AvatarIcon from "./AvatarIcon";
import LoginButton from "./LoginButton";
import SignUpButton from "./SignUpButton";
import RecentlyAddedGifts from "./RecentlyAddedGiftsButton";

import classes from "./ProfileNavigation.module.css";

const ProfileNavigaion = () => {
  const authCtx = useContext(AuthContext);

  return (
    <div className={classes.nav}>
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
