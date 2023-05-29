import React from "react";

import classes from "./MainNavigation.module.css";

import { Link } from "react-router-dom";

import Button from "@mui/material/Button";

const MainNavigation = () => {
  const buttonStyle = {
    fontSize: "1.2rem",
    margin: "1rem",
    textTransform: "unset !important",
  };

  return (
    <div className={classes.nav}>
      <div>
        <Button component={Link} to="/" sx={buttonStyle}>
          GiftMap
        </Button>
      </div>
      <div>
        <Button variant="text" component={Link} to="/login" sx={buttonStyle}>
          Login
        </Button>
        <Button
          variant="contained"
          component={Link}
          to="/sign-up"
          sx={buttonStyle}
        >
          Sign Up
        </Button>
      </div>
    </div>
  );
};

export default MainNavigation;
