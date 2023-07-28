import React from "react";

import { useNavigate } from "react-router-dom";

import Card from "@mui/material/Card";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";

import classes from "./UserResult.module.css";

const UserResult = ({ user, setIsSearchedUsersShown }) => {
  const navigate = useNavigate();

  const navigateUserPageHandler = () => {
    navigate(`/profile/${user._id}`);
    setIsSearchedUsersShown(false);
  };

  return (
    <>
      <Card
        tabIndex="0"
        className={classes["user-container"]}
        onClick={navigateUserPageHandler}
        sx={{ borderRadius: "0", boxShadow: "none" }}
      >
        <Avatar
          alt="avatar"
          src={`https://api.dicebear.com/6.x/bottts/svg?seed=${user.name}`}
        />
        <Typography sx={{ ml: "0.5rem" }}>{user.name}</Typography>
      </Card>
      <Divider variant="middle" />
    </>
  );
};

export default UserResult;
