import React, { useState, useContext } from "react";

import { useParams } from "react-router-dom";

import AuthContext from "../contexts/auth-context";
import GiftForm from "./GiftForm";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import Modal from "@mui/material/Modal";
import Zoom from "@mui/material/Zoom";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import MUILink from "@mui/material/Link";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import DeleteIcon from "@mui/icons-material/Delete";
import CheckIcon from "@mui/icons-material/Check";
import EditIcon from "@mui/icons-material/Edit";
import AddIcon from "@mui/icons-material/Add";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";

import giftImagePlaceholder from "../static/giftListPlaceholder.png";

import classes from "./GiftItem.module.css";

const GiftItem = ({ gift, setGifts }) => {
  const [isDelete, setIsDelete] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isGiftAddedMessageOpen, setIsGiftAddedMessageOpen] = useState(false);

  const authCtx = useContext(AuthContext);

  const { userID } = useParams();

  const stringShortener = (str, length) => {
    if (str.length <= length) return str;

    return str.slice(0, length - 3) + "...";
  };

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
    console.log(gift);
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
        imageLink: gift.imageLink,
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
          width: "52rem",
          height: "10rem",
          padding: "0.5rem",
          boxShadow: "none",
          borderRadius: "1.5rem",
        }}
        className={classes.gift}
      >
        <div className={classes["gift-content"]}>
          <div
            className={`${classes["image-container"]} ${
              !gift.imageLink && classes["image-placeholder"]
            }`}
          >
            <CardMedia
              component="img"
              sx={{ objectFit: "contain" }}
              src={gift.imageLink || giftImagePlaceholder}
              alt="gift image"
            />
          </div>
          <div className={classes["gift-text-container"]}>
            <CardContent>
              <Tooltip
                arrow
                TransitionComponent={Zoom}
                placement="top-start"
                title={gift.title}
              >
                <Typography gutterBottom variant="h5" component="div">
                  {stringShortener(gift.title, 50)}
                </Typography>
              </Tooltip>
              {gift.description && (
                <Tooltip
                  arrow
                  TransitionComponent={Zoom}
                  placement="bottom-end"
                  title={gift.description}
                >
                  <Typography variant="body2" color="text.secondary">
                    {stringShortener(gift.description, 150)}
                  </Typography>
                </Tooltip>
              )}
            </CardContent>
          </div>
        </div>
        <div className={classes["gift-actions"]}>
          <Typography
            sx={{ mr: "1rem", width: "70px" }}
          >{`$${gift.price}`}</Typography>
          {!userID && (
            <>
              <IconButton
                aria-label="edit"
                size="large"
                onClick={editClickHandler}
              >
                <EditIcon />
              </IconButton>
              {!isDelete && (
                <IconButton
                  aria-label="delete"
                  color="error"
                  size="large"
                  onClick={deleteButtonHandler}
                >
                  <DeleteIcon />
                </IconButton>
              )}
              {isDelete && (
                <ClickAwayListener onClickAway={cancelDeleteHandler}>
                  <Tooltip open={true} title="Are you sure?" arrow>
                    <IconButton
                      aria-label="delete"
                      color="success"
                      size="large"
                      onClick={deleteGiftHandler}
                    >
                      <CheckIcon />
                    </IconButton>
                  </Tooltip>
                </ClickAwayListener>
              )}
            </>
          )}
          {userID && authCtx.isLoggedIn && (
            <>
              <Tooltip
                arrow
                TransitionComponent={Zoom}
                placement="top"
                title="Add to my gifts"
              >
                <IconButton
                  aria-label="add"
                  color="primary"
                  size="large"
                  onClick={addGiftHandler}
                >
                  <AddIcon />
                </IconButton>
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
          <Tooltip
            arrow
            TransitionComponent={Zoom}
            placement="top"
            title="Open link"
          >
            <MUILink href={gift.link} target="_blank" rel="noopener">
              <IconButton aria-label="open-link" color="primary" size="large">
                <OpenInNewIcon />
              </IconButton>
            </MUILink>
          </Tooltip>
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
            imageLinkInitialValue={gift.imageLink}
            giftID={gift._id}
          />
        </div>
      </Modal>
    </div>
  );
};

export default GiftItem;
