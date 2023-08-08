import { useState, useContext } from "react";

import { Link as RouterLink, useNavigate } from "react-router-dom";

import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import CircularProgress from "@mui/material/CircularProgress";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";

import AuthContext from "../contexts/auth-context";

import Copyright from "./Copyright";

import classes from "./LoginForm.module.css";

const LoginForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const authCtx = useContext(AuthContext);

  const emailChangeHandler = (event) => {
    setEmail(event.target.value);
  };
  const passwordChangeHandler = (event) => {
    setPassword(event.target.value);
  };

  const submitHandler = async (event) => {
    event.preventDefault();

    setIsLoading(true);

    const response = await fetch("/api/v1/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });
    const responseData = await response.json();

    if (!responseData.success) setIsError(true);
    else {
      authCtx.onLogin(responseData.token);
      navigate("/profile");
    }

    setIsLoading(false);
  };

  return (
    <div className={classes.signIn__container}>
      <Container component="main" maxWidth="xs" className={classes.signInForm}>
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar
            sx={{
              margin: "1rem",
              backgroundColor: "secondary.main",
            }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign In
          </Typography>
          <form className={classes.form} onSubmit={submitHandler}>
            <TextField
              onChange={emailChangeHandler}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              onChange={passwordChangeHandler}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}>
              Sign In
            </Button>
            {/* error */}
            {isError && (
              <Grid
                container
                direction="column"
                justify="center"
                alignItems="center"
                style={{ marginBottom: ".5rem" }}>
                <Alert
                  severity="error"
                  variant="outlined"
                  style={{ backgroundColor: "#ff000012" }}>
                  <AlertTitle>Error</AlertTitle>
                  Invalid credentials
                </Alert>
              </Grid>
            )}
            {/* loading */}
            {isLoading && (
              <Grid
                container
                direction="column"
                justify="center"
                alignItems="center">
                <CircularProgress></CircularProgress>
              </Grid>
            )}
            <Grid container justifyContent="center">
              <Grid item>
                <Button
                  variant="text"
                  color="primary"
                  component={RouterLink}
                  to="/signup"
                  sx={{ mt: "1rem" }}>
                  Don't have an account? Sign Up
                </Button>
              </Grid>
            </Grid>
          </form>
        </div>
        <Box mt={8}>
          <Copyright />
        </Box>
      </Container>
    </div>
  );
};

export default LoginForm;
