import React, { useContext } from "react";

import { Link } from "react-router-dom";

import AuthContext from "../contexts/auth-context";

import SearchUser from "./SearchUser";
import AvatarIcon from "./AvatarIcon";

import MUILink from "@mui/material/Link";
import Typography from "@mui/material/Typography";

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
      <div className={classes.search}>
        <SearchUser />
      </div>
      <div className={classes["profile-icon"]}>
        {authCtx.isLoggedIn ? (
          <AvatarIcon />
        ) : (
          <Typography color="primary">Test</Typography>
        )}
      </div>
    </div>
  );
};

export default ProfileNavigaion;
