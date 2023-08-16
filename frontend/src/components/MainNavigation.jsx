import React from "react";

import { Link } from "react-router-dom";

import LoginButton from "./LoginButton";
import SignUpButton from "./SignUpButton";

import MUILink from "@mui/material/Link";
import Typography from "@mui/material/Typography";

import classes from "./MainNavigation.module.css";
import logo from "../static/gift-icon.png";

const MainNavigation = () => {
  return (
    <div className={classes.nav}>
      <div>
        <MUILink
          component={Link}
          to="/"
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
      <div>
        <LoginButton />
        <SignUpButton />
      </div>
    </div>
  );
};

export default MainNavigation;
