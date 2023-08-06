import React, { useContext } from "react";

import { Link } from "react-router-dom";

import AuthContext from "../contexts/auth-context";

import SearchUser from "./SearchUser";
import AvatarIcon from "./AvatarIcon";
import LoginButton from "./LoginButton";
import SignUpButton from "./SignUpButton";
import RecentlyAddedGifts from "./RecentlyAddedGiftsButton";

import MUILink from "@mui/material/Link";

import logo from "../static/logo-transparent-png.png";

import classes from "./ProfileNavigation.module.css";

const ProfileNavigaion = () => {
  const authCtx = useContext(AuthContext);

  const buttonStyle = {
    fontSize: "1.1rem",
    margin: "1rem",
  };

  return (
    <div className={classes.nav}>
      <div>
        <MUILink
          component={Link}
          to={`${authCtx.isLoggedIn ? "/profile" : "/"}`}
          sx={buttonStyle}
        >
          <img src={logo} alt="GiftMap Logo" className={classes.logo} />
        </MUILink>
      </div>
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
