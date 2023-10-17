import React, { useState, useEffect, useContext } from "react";

import { useLoaderData, useParams } from "react-router-dom";

import AuthContext from "../contexts/auth-context";

import Typography from "@mui/material/Typography";
import ShareProfileButton from "./ShareProfileButton";
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

  const authCtx = useContext(AuthContext);

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
          <div>
            <ShareProfileButton
              userID={userID || !authCtx.user || authCtx.user.id}
            />
            <RecentlyAddedGiftsButton />
          </div>
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
