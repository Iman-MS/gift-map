import React from "react";

import LoginButton from "./LoginButton";
import SignUpButton from "./SignUpButton";

import { Link } from "react-router-dom";

import MUILink from "@mui/material/Link";

import classes from "./MainNavigation.module.css";
import logo from "../static/logo-transparent-png.png";

const MainNavigation = () => {
  return (
    <div className={classes.nav}>
      <div>
        <MUILink
          component={Link}
          to="/"
          sx={{ fontSize: "1.1rem", margin: "1rem" }}
        >
          <img src={logo} alt="GiftMap Logo" className={classes.logo} />
        </MUILink>
      </div>
      <div>
        <LoginButton />
        <SignUpButton />
      </div>
    </div>
  );
};

export default MainNavigation;
