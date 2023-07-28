import React, { useState, useContext } from "react";

import AuthContext from "../contexts/auth-context";
import GiftForm from "./GiftForm";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Button } from "@mui/material";
import Tooltip from "@mui/material/Tooltip";
import Modal from "@mui/material/Modal";
import Zoom from "@mui/material/Zoom";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import DeleteIcon from "@mui/icons-material/Delete";
import CheckIcon from "@mui/icons-material/Check";
import EditIcon from "@mui/icons-material/Edit";
import AddIcon from "@mui/icons-material/Add";

import giftImage from "../static/giftListPlaceholder.png";

import classes from "./GiftItem.module.css";

const GiftItem = ({ gift, setGifts, isLoggedInUser }) => {
  const [isDelete, setIsDelete] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isGiftAddedMessageOpen, setIsGiftAddedMessageOpen] = useState(false);

  const authCtx = useContext(AuthContext);

  const deleteButtonHandler = () => {
    setIsDelete(true);
  };

  const deleteGiftHandler = () => {
    setGifts((gifts) => gifts.filter((giftItem) => giftItem._id !== gift._id));

    fetch(`/api/v1/gifts/${gift._id}`, {
      method: "DELETE",
    });
  };

  const cancelDeleteHandler = () => {
    setIsDelete(false);
  };

  const closeModalHandler = () => {
    setIsModalOpen(false);
  };

  const editClickHandler = () => {
    setIsModalOpen(true);
  };

  const addGiftHandler = async () => {
    const response = await fetch("/api/v1/gifts/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: gift.title,
        description: gift.description,
        price: gift.price,
        link: gift.link,
      }),
    });

    if (response.ok) {
      setIsGiftAddedMessageOpen(true);
    }
  };

  const closeAddGiftMessageHandler = () => {
    setIsGiftAddedMessageOpen(false);
  };

  return (
    <div className={classes["card-shadow"]}>
      <Card
        sx={{
          width: "40rem",
          padding: "0.5rem",
          boxShadow: "none",
          borderRadius: "1.5rem",
        }}
        className={classes.gift}
      >
        <div className={classes["gift-content"]}>
          {gift.photo && (
            <CardMedia
              component="img"
              height="140"
              src={giftImage}
              alt="gift image"
            />
          )}
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {gift.title}
            </Typography>
            {gift.description && (
              <Typography variant="body2" color="text.secondary">
                {gift.description}
              </Typography>
            )}
          </CardContent>
        </div>
        <div className={classes["gift-actions"]}>
          <Typography sx={{ mr: "1rem" }}>{`$${gift.price}`}</Typography>
          {isLoggedInUser && (
            <>
              <Button size="small" color="primary" onClick={editClickHandler}>
                <EditIcon />
              </Button>
              {!isDelete && (
                <Button
                  size="small"
                  color="error"
                  onClick={deleteButtonHandler}
                >
                  <DeleteIcon />
                </Button>
              )}
              {isDelete && (
                <ClickAwayListener onClickAway={cancelDeleteHandler}>
                  <Tooltip open={true} title="Are you sure?" arrow>
                    <Button size="small" onClick={deleteGiftHandler}>
                      <CheckIcon />
                    </Button>
                  </Tooltip>
                </ClickAwayListener>
              )}
            </>
          )}
          {!isLoggedInUser && authCtx.isLoggedIn && (
            <>
              <Tooltip
                arrow
                TransitionComponent={Zoom}
                placement="top"
                title="Add to my gifts"
                onClick={addGiftHandler}
              >
                <Button size="small" color="primary">
                  <AddIcon />
                </Button>
              </Tooltip>
              <Snackbar
                open={isGiftAddedMessageOpen}
                autoHideDuration={4000}
                onClose={closeAddGiftMessageHandler}
              >
                <Alert
                  severity="success"
                  elevation={6}
                  variant="filled"
                  sx={{ width: "100%" }}
                  onClose={closeAddGiftMessageHandler}
                >
                  Added successfully!
                </Alert>
              </Snackbar>
            </>
          )}
        </div>
      </Card>
      <Modal
        onClose={closeModalHandler}
        open={isModalOpen}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div>
          <GiftForm
            setGifts={setGifts}
            closeModalHandler={closeModalHandler}
            method="PUT"
            titleInitialValue={gift.title}
            descriptionInitialValue={gift.description}
            priceInitialValue={gift.price}
            linkInitialValue={gift.link}
            giftID={gift._id}
          />
        </div>
      </Modal>
    </div>
  );
};

export default GiftItem;
