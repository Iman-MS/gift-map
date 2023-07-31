import React from "react";

import CircularProgress from "@mui/material/CircularProgress";

import classes from "./Loading.module.css";

const Loading = () => {
  return (
    <div className={classes.loading}>
      <CircularProgress size="100px" />
    </div>
  );
};

export default Loading;
