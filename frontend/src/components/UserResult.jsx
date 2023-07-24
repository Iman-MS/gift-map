import React from "react";

import { useNavigate } from "react-router-dom";

import Card from "@mui/material/Card";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";

import classes from "./UserResult.module.css";

const UserResult = ({ user }) => {
  const navigate = useNavigate();

  const navigateUserPageHandler = () => {
    navigate(`/profile/${user._id}`);
  };

  return (
    <>
      <Card
        className={classes["user-container"]}
        onClick={navigateUserPageHandler}
      >
        <Avatar
          alt="avatar"
          src={`https://api.dicebear.com/6.x/bottts/svg?seed=${user.name}`}
        />
        <Typography sx={{ ml: "0.5rem" }}>{user.name}</Typography>
      </Card>
      <Divider />
    </>
  );
};

export default UserResult;
