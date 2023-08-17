import React, { useState, useEffect } from "react";

import { useLoaderData, useParams } from "react-router-dom";

import Typography from "@mui/material/Typography";

import RecentlyAddedGiftsButton from "./RecentlyAddedGiftsButton";
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
        <div className={classes["title-container"]}>
          <div className={classes.title}>
            {isRecentlyAddedGiftsPage ? (
              <Typography
                variant="h3"
                color="text"
                sx={{ mb: "0.5rem", fontWeight: "200" }}
              >
                Recently Added Gifts
              </Typography>
            ) : (
              <Typography
                variant="h3"
                color="text"
                sx={{ mb: "0.5rem", fontWeight: "200" }}
              >
                {`${userID ? `${loaderData.user.name}'s` : "My"} Gifts`}
              </Typography>
            )}
            <div className={classes.divider}></div>
          </div>
          <RecentlyAddedGiftsButton />
        </div>
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
