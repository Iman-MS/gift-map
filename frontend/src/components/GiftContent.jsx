import React from "react";

import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Zoom from "@mui/material/Zoom";
import Tooltip from "@mui/material/Tooltip";

import giftImagePlaceholder from "../static/giftListPlaceholder.png";

import classes from "./GiftContent.module.css";

const GiftContent = ({ imageLink, title, description }) => {
  const stringShortener = (str, length) => {
    if (str.length <= length) return str;

    return str.slice(0, length - 3) + "...";
  };

  return (
    <div className={classes["gift-content"]}>
      <div className={classes["image-container"]}>
        <CardMedia
          component="img"
          sx={{ objectFit: "contain" }}
          src={imageLink || giftImagePlaceholder}
          alt="gift image"
        />
      </div>
      <div className={classes["gift-text-container"]}>
        <CardContent>
          <Tooltip
            arrow
            TransitionComponent={Zoom}
            placement="top-start"
            title={title}
          >
            <Typography gutterBottom variant="h5" component="div">
              {stringShortener(title, 50)}
            </Typography>
          </Tooltip>
          {description && (
            <Tooltip
              arrow
              TransitionComponent={Zoom}
              placement="bottom-end"
              title={description}
            >
              <Typography variant="body2" color="text.secondary">
                {stringShortener(description, 100)}
              </Typography>
            </Tooltip>
          )}
        </CardContent>
      </div>
    </div>
  );
};

export default GiftContent;
