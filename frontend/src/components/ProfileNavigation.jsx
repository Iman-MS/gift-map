import React, { useContext } from "react";

import { Link } from "react-router-dom";

import AuthContext from "../contexts/auth-context";

import SearchUser from "./SearchUser";
import AvatarIcon from "./AvatarIcon";
import LoginButton from "./LoginButton";
import SignUpButton from "./SignUpButton";
import RecentlyAddedGifts from "./RecentlyAddedGiftsButton";

import MUILink from "@mui/material/Link";
import Typography from "@mui/material/Typography";

import logo from "../static/gift-icon.png";

import classes from "./ProfileNavigation.module.css";

const ProfileNavigaion = () => {
  const authCtx = useContext(AuthContext);

  return (
    <div className={classes.nav}>
      <div>
        <MUILink
          component={Link}
          to={`${authCtx.isLoggedIn ? "/profile" : "/"}`}
          sx={{ fontSize: "1.1rem", margin: "1rem", textDecoration: "none" }}
        >
          <div className={classes["logo-content"]}>
            <img src={logo} alt="GiftMap Logo" className={classes.logo} />
            <Typography
              variant="h1"
              fontSize="30px"
              color="#5A189A"
              sx={{
                mt: "0.7rem",
                ml: "0.1rem",
                fontWeight: "500",
                textDecoration: "none",
              }}
            >
              GiftMap
            </Typography>
          </div>
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
