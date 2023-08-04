import React, { useState, useContext } from "react";

import AuthContext from "../contexts/auth-context";

import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import CircularProgress from "@mui/material/CircularProgress";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import SettingsIcon from "@mui/icons-material/Settings";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";

import classes from "./SettingsModalForm.module.css";

const SettingsModalForm = ({ closeSettingsModalHandler }) => {
  const authCtx = useContext(AuthContext);

  const [name, setName] = useState(authCtx.user.name);

  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const nameChangeHandler = (event) => {
    setName(event.target.value);
  };

  const formSubmitHandler = (event) => {
    event.preventDefault();
    setIsLoading(true);

    if (!name) {
      setIsError(true);
      return;
    }

    fetch("/api/v1/users/", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
      }),
    });

    closeSettingsModalHandler();
    setIsLoading(false);
  };

  return (
    <>
      <Box className={classes.container}>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <div className={classes.form}>
            <Avatar
              sx={{
                margin: "1rem",
                backgroundColor: "secondary.main",
              }}
            >
              <SettingsIcon />
            </Avatar>
            <Typography component="h1" variant="h5" color="primary">
              Settings
            </Typography>
            <form onSubmit={formSubmitHandler}>
              <TextField
                onChange={nameChangeHandler}
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="name"
                label="name"
                name="name"
                autoFocus
                value={name}
              />
              <TextField
                disabled
                variant="outlined"
                margin="normal"
                fullWidth
                name="email"
                type="email"
                id="email"
                value={authCtx.user.email}
              />

              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                sx={{
                  margin: "2rem 0rem 2rem",
                }}
              >
                Save
              </Button>
              {/* error */}
              {isError && (
                <Grid
                  container
                  direction="column"
                  justify="center"
                  alignItems="center"
                  style={{ marginBottom: ".5rem" }}
                >
                  <Alert
                    severity="error"
                    variant="outlined"
                    style={{ backgroundColor: "#ff000012" }}
                  >
                    <AlertTitle>Error</AlertTitle>- Please enter a number for
                    the price
                    <br /> - Please enter a valid link for the link and image
                    link
                  </Alert>
                </Grid>
              )}
              {/* loading */}
              {isLoading && (
                <Grid
                  container
                  direction="column"
                  justify="center"
                  alignItems="center"
                >
                  <CircularProgress></CircularProgress>
                </Grid>
              )}
            </form>
          </div>
        </Container>
      </Box>
    </>
  );
};

export default SettingsModalForm;
