import React, { useState, useEffect } from "react";

import { useLoaderData, useParams } from "react-router-dom";

import AddIconButton from "./AddIconButton";
import GiftList from "./GiftList";

import classes from "./ProfileContent.module.css";

const ProfileContent = ({ isRecentlyAddedGiftsPage = false }) => {
  const loaderData = useLoaderData();

  const [gifts, setGifts] = useState(loaderData);

  useEffect(() => {
    setGifts(loaderData);
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
