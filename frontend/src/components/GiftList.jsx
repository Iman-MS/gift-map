import React from "react";

import GiftItem from "./GiftItem";

import classes from "./GiftList.module.css";

const GiftList = ({ gifts, setGifts, isRecentlyAddedGiftsPage }) => {
  return (
    <ul className={classes.list}>
      {gifts.map((gift) => (
        <GiftItem
          key={gift._id}
          gift={gift}
          setGifts={setGifts}
          isRecentlyAddedGiftsPage={isRecentlyAddedGiftsPage}
        />
      ))}
    </ul>
  );
};

export default GiftList;
