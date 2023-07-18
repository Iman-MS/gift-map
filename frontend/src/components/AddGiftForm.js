import React, { useState } from "react";

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

const AddGiftForm = ({ setGifts, closeModalHandler }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [link, setLink] = useState("");

  const [isError, setIsError] = useState(false);

  const titleChangeHandler = (event) => {
    setTitle(event.target.value);
  };
  const descriptionChangeHandler = (event) => {
    setDescription(event.target.value);
  };
  const priceChangeHandler = (event) => {
    setPrice(event.target.value);
  };
  const linkChangeHandler = (event) => {
    setLink(event.target.value);
  };

  const formSubmitHandler = async (event) => {
    event.preventDefault();

    if (!Number(price)) {
      setIsError(true);
      return;
    }

    const response = await fetch("/api/v1/gifts/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title,
        description,
        price,
        link,
      }),
    });
    const responseData = await response.json();
    const addedGift = responseData.data;
    setGifts((gifts) => [...gifts, addedGift]);

    closeModalHandler();
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
              <RedeemIcon />
            </Avatar>
            <Typography component="h1" variant="h5" color="primary">
              New Gift
            </Typography>
            <form onSubmit={formSubmitHandler}>
              <TextField
                onChange={titleChangeHandler}
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
                onChange={descriptionChangeHandler}
                variant="outlined"
                margin="normal"
                fullWidth
                name="description"
                label="Description"
                type="description"
                id="description"
              />
              <TextField
                onChange={priceChangeHandler}
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
                onChange={linkChangeHandler}
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
                sx={{
                  margin: "2rem 0rem 2rem",
                }}
              >
                Add Gift!
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
                    <AlertTitle>Error</AlertTitle>
                    Please enter a number for the price
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
