import React, { useState } from "react";

import { useLoaderData } from "react-router-dom";

import AddIconButton from "./AddIconButton";
import GiftList from "./GiftList";

import classes from "./ProfileContent.module.css";

const ProfileContent = () => {
  const [gifts, setGifts] = useState(useLoaderData());

  return (
    <div className={classes.container}>
      <div className={classes.content}>
        <div className={classes["add-icon"]}>
          <AddIconButton setGifts={setGifts} />
        </div>
        {gifts && <GiftList gifts={gifts} setGifts={setGifts} />}
      </div>
    </div>
  );
};

export default ProfileContent;
