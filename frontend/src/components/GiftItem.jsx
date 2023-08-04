import React from "react";

import GiftContent from "./GiftContent";
import GiftActions from "./GiftActions";

import Card from "@mui/material/Card";

import classes from "./GiftItem.module.css";

const GiftItem = ({ gift, setGifts }) => {
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
        <GiftContent
          imageLink={gift.imageLink}
          title={gift.title}
          description={gift.description}
        />
        <GiftActions gift={gift} setGifts={setGifts} />
      </Card>
    </div>
  );
};

export default GiftItem;
