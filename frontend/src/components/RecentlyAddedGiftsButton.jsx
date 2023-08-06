import React from "react";

import { Link } from "react-router-dom";

import Button from "@mui/material/Button";

const RecentlyAddedGifts = () => {
  return (
    <>
      <Button
        variant="contained"
        component={Link}
        to="/recently-added-gifts"
        sx={{ fontSize: "1.1rem", margin: "1rem" }}
      >
        recently added gifts
      </Button>
    </>
  );
};

export default RecentlyAddedGifts;
