import React from "react";

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

import classes from "./AddGiftForm.module.css";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  // width: 400,
  bgcolor: "background.paper",
  border: "1px solid #000",
  boxShadow: 24,
  p: 4,
  borderRadius: "2rem",
};

const AddGiftForm = () => {
  return (
    <>
      <Box className={classes.container}>
        <Container
          component="main"
          maxWidth="xs"
          className={classes["form-container"]}
        >
          <CssBaseline />
          <div className={classes.form}>
            <Avatar
              sx={{
                margin: "1rem",
                backgroundColor: "secondary.main",
              }}
            >
              <RedeemIcon />
            </Avatar>
            <Typography component="h1" variant="h5" color="primary">
              New Gift
            </Typography>
            <form>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="title"
                label="Title"
                name="title"
                autoFocus
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="description"
                label="Description"
                type="description"
                id="description"
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="price"
                label="Price"
                type="price"
                id="price"
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="link"
                label="Link"
                type="link"
                id="link"
              />

              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
              >
                Add Gift!
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
                    Invalid credentials
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
            </form>
          </div>
        </Container>
      </Box>
    </>
  );
};

export default AddGiftForm;
