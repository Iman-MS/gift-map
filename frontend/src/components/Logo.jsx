import React, { useState, useContext } from "react";

import { Link } from "react-router-dom";

import AuthContext from "../contexts/auth-context";

import MUILink from "@mui/material/Link";
import Typography from "@mui/material/Typography";

import logo from "../static/gift-icon.png";

import classes from "./Logo.module.css";

const Logo = () => {
  const [viewportWidth, setViewportWidth] = useState(window.innerWidth);

  const authCtx = useContext(AuthContext);

  window.onresize = () => {
    setViewportWidth(window.innerWidth);
  };

  return (
    <div className={classes["logo-container"]}>
      <MUILink
        component={Link}
        to={`${authCtx.isLoggedIn ? "/profile" : "/"}`}
        sx={{ fontSize: "1.1rem", textDecoration: "none" }}
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
              display: viewportWidth <= 700 ? "none" : "block",
            }}
          >
            GiftMap
          </Typography>
        </div>
      </MUILink>
    </div>
  );
};

export default Logo;
