import React from "react";

import UserResult from "./UserResult";

import Paper from "@mui/material/Paper";
import Divider from "@mui/material/Divider";

import classes from "./SearchedUsersList.module.css";

const SearchedUsersList = ({ users }) => {
  return (
    <Paper elevation={12} className={classes["search-list"]}>
      {users.map((user, i) => {
        return (
          <>
            <UserResult key={user._id} user={user} />
            <Divider />
          </>
        );
      })}
    </Paper>
  );
};

export default SearchedUsersList;
