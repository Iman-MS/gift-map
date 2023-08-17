import React, { useState, useEffect } from "react";

import { useLoaderData, useParams } from "react-router-dom";

import Typography from "@mui/material/Typography";

import AddIconButton from "./AddIconButton";
import GiftList from "./GiftList";

import classes from "./ProfileContent.module.css";

const ProfileContent = ({ isRecentlyAddedGiftsPage = false }) => {
  const loaderData = useLoaderData();

  const [gifts, setGifts] = useState(loaderData.gifts);

  useEffect(() => {
    setGifts(loaderData.gifts);
  }, [loaderData]);

  const { userID } = useParams();

  return (
    <div className={classes.container}>
      <div className={classes.content}>
        {!userID && !isRecentlyAddedGiftsPage && (
          <div className={classes["add-icon"]}>
            <AddIconButton setGifts={setGifts} />
          </div>
        )}
        {isRecentlyAddedGiftsPage ? (
          <Typography variant="h3" color="primary" sx={{ mb: "2rem" }}>
            Recently Added Gifts
          </Typography>
        ) : (
          <Typography variant="h3" color="primary" sx={{ mb: "2rem" }}>
            {`${userID ? `${loaderData.user.name}'s` : "My"} Gifts`}
          </Typography>
        )}
        {gifts && (
          <GiftList
            gifts={gifts}
            setGifts={setGifts}
            isRecentlyAddedGiftsPage={isRecentlyAddedGiftsPage}
          />
        )}
      </div>
    </div>
  );
};

export default ProfileContent;
