import React from "react";

import { Link } from "react-router-dom";

import Button from "@mui/material/Button";

const LoginButton = () => {
  return (
    <>
      <Button
        variant="text"
        component={Link}
        to="/login"
        sx={{ fontSize: "1.1rem", margin: "1rem" }}
      >
        Login
      </Button>
    </>
  );
};

export default LoginButton;
