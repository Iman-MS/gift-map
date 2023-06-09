import { Link as RouterLink } from "react-router-dom";

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

import Copyright from "./Copyright";

import classes from "./LoginForm.module.css";

const LoginForm = () => {
  return (
    <div className={classes.signIn__container}>
      <Container component="main" maxWidth="xs" className={classes.signInForm}>
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar
            sx={{
              margin: "1rem",
              backgroundColor: "secondary.main",
            }}
          >
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign In
          </Typography>
          <form className={classes.form}>
            <TextField
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
              className={classes.submit}
            >
              Sign In
            </Button>
            {/* error */}
            {false && (
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
                  <AlertTitle>Error</AlertTitle>
                  {/* {loginError} */}
                </Alert>
              </Grid>
            )}
            {/* loading */}
            {false && (
              <Grid
                container
                direction="column"
                justify="center"
                alignItems="center"
              >
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
                  sx={{ mt: "1rem" }}
                >
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
