import { Link as RouterLink } from "react-router-dom";

import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import CircularProgress from "@mui/material/CircularProgress";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import RedeemIcon from "@mui/icons-material/Redeem";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";

import Copyright from "./Copyright";

import classes from "./SignUpForm.module.css";

const SignUpForm = () => {
  return (
    <div className={classes.signUp__container}>
      <Container component="main" maxWidth="xs" className={classes.signUpForm}>
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar
            sx={{
              margin: "1rem",
              backgroundColor: "secondary.main",
            }}
          >
            <RedeemIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign Up
          </Typography>
          <form className={classes.form}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="name"
              label="Name"
              name="name"
              autoComplete="name"
              autoFocus
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
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
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Sign Up
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
                  to="/login"
                  sx={{ mt: "1rem" }}
                >
                  Already have an account? Sign In
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

export default SignUpForm;
