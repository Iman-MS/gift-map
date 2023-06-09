import React from "react";

import { Link } from "react-router-dom";

import Typography from "@mui/material/Typography";
import MUILink from "@mui/material/Link";

const Copyright = () => {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <MUILink component={Link} color="inherit" to="/">
        GiftMap
      </MUILink>
      {` ${new Date().getFullYear()}`}
      {"."}
    </Typography>
  );
};

export default Copyright;
