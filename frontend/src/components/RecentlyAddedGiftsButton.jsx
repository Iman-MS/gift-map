import React from "react";

import { Link } from "react-router-dom";

import Button from "@mui/material/Button";

const RecentlyAddedGiftsButton = () => {
  return (
    <>
      <Button
        variant="contained"
        component={Link}
        to="/recently-added-gifts"
        sx={{
          fontSize: "1.1rem",
          margin: `${window.innerWidth <= 700 ? "0rem" : "1rem"}`,
        }}
      >
        Recently Added Gifts
      </Button>
    </>
  );
};

export default RecentlyAddedGiftsButton;
