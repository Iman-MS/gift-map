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

const AddGiftForm = ({
  setGifts,
  closeModalHandler,
  method,
  titleInitialValue,
  descriptionInitialValue,
  priceInitialValue,
  linkInitialValue,
  giftID,
}) => {
  const [title, setTitle] = useState(titleInitialValue || "");
  const [description, setDescription] = useState(descriptionInitialValue || "");
  const [price, setPrice] = useState(priceInitialValue || "");
  const [link, setLink] = useState(linkInitialValue || "");

  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

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

    setIsLoading(true);

    if (!Number(price)) {
      setIsError(true);
      setIsLoading(false);
      return;
    }

    const response = await fetch(`/api/v1/gifts/${giftID || "create"}`, {
      method,
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

    if (giftID) {
      const editedGift = responseData.data;
      setGifts((gifts) =>
        gifts.map((gift) => (gift._id === giftID ? editedGift : gift))
      );
    } else {
      const addedGift = responseData.data;
      setGifts((gifts) => [...gifts, addedGift]);
    }

    setIsLoading(false);
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
              {`${giftID ? "Edit" : "New"} Gift`}
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
                value={title}
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
                value={description}
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
                value={price}
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
                value={link}
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
                {giftID ? "Save" : "Add"}
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

export default AddGiftForm;
