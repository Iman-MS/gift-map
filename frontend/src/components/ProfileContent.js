import React, { useState } from "react";

import { useLoaderData } from "react-router-dom";

import AddIconButton from "./AddIconButton";

import classes from "./ProfileContent.module.css";
import GiftList from "./GiftList";

const ProfileContent = () => {
  const [gifts, setGifts] = useState(useLoaderData());

  return (
    <div className={classes.container}>
      <div className={classes.content}>
        <div className={classes["add-icon"]}>
          <AddIconButton setGifts={setGifts} />
        </div>
        {gifts && (
          <ul className={classes.list}>
            <GiftList gifts={gifts} />
          </ul>
        )}
      </div>
    </div>
  );
};

export default ProfileContent;
