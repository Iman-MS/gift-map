import React from "react";

import { Link } from "react-router-dom";

import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

import classes from "./RouteError.module.css";

const RouteError = () => {
  return (
    <div className={classes["error-container"]}>
      <Typography variant="h1" color="primary">
        Oops...!
      </Typography>
      <Typography variant="h4" color="secondary">
        Looks like this route that you're trying to access doesn't exist
      </Typography>
      <Button variant="contained" component={Link} to="/">
        GO TO HOMEPAGE
      </Button>
    </div>
  );
};

export default RouteError;
