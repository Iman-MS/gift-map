import React, { useContext } from "react";

import { Link } from "react-router-dom";

import MUILink from "@mui/material/Link";
import TextField from "@mui/material/TextField";
import Avatar from "@mui/material/Avatar";

import logo from "../static/logo-transparent-png.png";

import AuthContext from "../contexts/auth-context";

import classes from "./ProfileNavigation.module.css";

const ProfileNavigaion = () => {
  const authCtx = useContext(AuthContext);

  const buttonStyle = {
    fontSize: "1.1rem",
    margin: "1rem",
  };

  // finding the name initials for the avatar
  let nameInitials;
  if (authCtx.user) {
    nameInitials = authCtx.user.name
      .split(" ")
      .map((word) => word[0])
      .slice(0, 2)
      .join("");
  }

  return (
    <div className={classes.nav}>
      <div>
        <MUILink component={Link} to="/profile" sx={buttonStyle}>
          <img src={logo} alt="GiftMap Logo" className={classes.logo} />
        </MUILink>
      </div>
      <div className={classes.search}>
        <TextField
          id="standard-basic"
          label="search users"
          variant="standard"
          color="primary"
          sx={{ width: "20rem" }}
        />
      </div>
      <div className={classes["profile-icon"]}>
        <Avatar color="primary">{nameInitials}</Avatar>
      </div>
    </div>
  );
};

export default ProfileNavigaion;
