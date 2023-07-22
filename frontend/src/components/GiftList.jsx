import React from "react";

import GiftItem from "./GiftItem";

const GiftList = ({ gifts, setGifts }) => {
  return (
    <>
      {gifts.map((gift) => (
        <GiftItem key={gift._id} gift={gift} setGifts={setGifts} />
      ))}
    </>
  );
};

export default GiftList;
