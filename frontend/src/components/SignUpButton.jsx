import React from "react";

import { Link } from "react-router-dom";

import Button from "@mui/material/Button";

const SignUpButton = () => {
  return (
    <>
      <Button
        variant="contained"
        component={Link}
        to="/signup"
        sx={{ fontSize: "1.1rem", margin: "1rem" }}
      >
        Sign Up
      </Button>
    </>
  );
};

export default SignUpButton;
