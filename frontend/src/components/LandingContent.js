import React from "react";

import { Link } from "react-router-dom";

import GiftImage from "./GiftImage";

import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

import classes from "./LandingContent.module.css";

const LandingContent = () => {
  return (
    <div className={classes.landing_container}>
      <div className={classes.gift}>
        <GiftImage />
      </div>
      <div className={classes.text}>
        <Typography variant="h2" sx={{ fontWeight: "200" }}>
          Discover Perfect Gifts with{" "}
          <span className={classes.giftmap}>GiftMap</span>
        </Typography>
        <Typography variant="h6" sx={{ fontWeight: "500" }}>
          No more guessing or generic presents. Join us on GiftMap and make
          gift-giving a delightful and personalized experience for everyone
          involved.
        </Typography>
        <div className={classes.btn}>
          <Button
            variant="contained"
            component={Link}
            to="/signup"
            sx={{
              fontSize: "1.1rem",
              margin: "1rem",
              width: "fit-content",
            }}
          >
            Try Now!
          </Button>
        </div>
      </div>
    </div>
  );
};

export default LandingContent;
