import React from "react";

import UserResult from "./UserResult";

import Paper from "@mui/material/Paper";

import classes from "./SearchedUsersList.module.css";

const SearchedUsersList = ({
  users,
  setIsSearchedUsersShown,
  setSearchField,
}) => {
  return (
    <Paper elevation={10} className={classes["search-list"]}>
      {users.map((user, i) => (
        <UserResult
          key={user._id}
          user={user}
          setIsSearchedUsersShown={setIsSearchedUsersShown}
          setSearchField={setSearchField}
        />
      ))}
    </Paper>
  );
};

export default SearchedUsersList;
