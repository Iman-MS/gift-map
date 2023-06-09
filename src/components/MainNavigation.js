import React from "react";

import classes from "./MainNavigation.module.css";

import { Link } from "react-router-dom";

import Button from "@mui/material/Button";
import MUILink from "@mui/material/Link";

import logo from "../static/logo-transparent-png.png";

const MainNavigation = () => {
  const buttonStyle = {
    fontSize: "1.2rem",
    margin: "1rem",
    textTransform: "unset !important",
  };

  return (
    <div className={classes.nav}>
      <div>
        <MUILink component={Link} to="/" sx={buttonStyle}>
          <img src={logo} alt="GiftMap Logo" className={classes.logo} />
        </MUILink>
      </div>
      <div>
        <Button variant="text" component={Link} to="/login" sx={buttonStyle}>
          Login
        </Button>
        <Button
          variant="contained"
          component={Link}
          to="/signup"
          sx={buttonStyle}
        >
          Sign Up
        </Button>
      </div>
    </div>
  );
};

export default MainNavigation;
