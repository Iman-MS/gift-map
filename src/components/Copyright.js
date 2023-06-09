import React from "react";

import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";

const Copyright = () => {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://material-ui.com/">
        GiftMap
      </Link>
      {` ${new Date().getFullYear()}`}
      {"."}
    </Typography>
  );
};

export default Copyright;
