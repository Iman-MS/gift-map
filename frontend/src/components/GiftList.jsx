import React, { useState } from "react";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Button } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import CheckIcon from "@mui/icons-material/Check";
import EditIcon from "@mui/icons-material/Edit";

import giftImage from "../static/giftListPlaceholder.png";

import classes from "./GiftList.module.css";

const GiftList = ({ gifts, setGifts }) => {
  const [isDelete, setIsDelete] = useState([]);

  const deleteButtonHandler = (giftID) => {
    setIsDelete((isDelete) => [...isDelete, giftID]);
  };

  const deleteGiftHandler = async (giftID) => {
    console.log(giftID);

    setGifts((gifts) => gifts.filter((gift) => gift._id !== giftID));

    fetch(`/api/v1/gifts/${giftID}`, {
      method: "DELETE",
    });
  };

  return (
    <>
      {gifts.map((gift) => (
        <Card key={gift._id} sx={{ width: "40rem" }} className={classes.gift}>
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
            <Button size="small" color="primary">
              <EditIcon />
            </Button>
            {!isDelete.includes(gift._id) && (
              <Button
                size="small"
                color="error"
                onClick={() => deleteButtonHandler(gift._id)}
              >
                <DeleteIcon />
              </Button>
            )}
            {isDelete.includes(gift._id) && (
              <Button
                size="small"
                color="error"
                onClick={() => deleteGiftHandler(gift._id)}
              >
                <CheckIcon />
              </Button>
            )}
          </div>
        </Card>
      ))}
    </>
  );
};

export default GiftList;
