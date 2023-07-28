import React, { useState, useEffect } from "react";

import { useLoaderData } from "react-router-dom";

import AddIconButton from "./AddIconButton";
import GiftList from "./GiftList";

import classes from "./ProfileContent.module.css";

const ProfileContent = ({ isLoggedInUser }) => {
  const loaderData = useLoaderData();

  const [gifts, setGifts] = useState(loaderData);

  useEffect(() => {
    setGifts(loaderData);
  }, [loaderData]);

  return (
    <div className={classes.container}>
      <div className={classes.content}>
        {isLoggedInUser && (
          <div className={classes["add-icon"]}>
            <AddIconButton setGifts={setGifts} />
          </div>
        )}
        {gifts && (
          <GiftList
            gifts={gifts}
            setGifts={setGifts}
            isLoggedInUser={isLoggedInUser}
          />
        )}
      </div>
    </div>
  );
};

export default ProfileContent;
