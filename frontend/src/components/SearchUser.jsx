import React, { useState } from "react";

import SearchedUsersList from "./SearchedUsersList";

import TextField from "@mui/material/TextField";

import classes from "./SearchUser.module.css";

const SearchUser = () => {
  const [users, setUsers] = useState(null);

  const searchHandler = async (event) => {
    if (event.target.value) {
      const response = await fetch(
        `/api/v1/users/all?name=${event.target.value}`
      );
      const responseData = await response.json();
      setUsers(responseData.data);
    } else {
      setUsers(null);
    }
  };

  const cancelSearch = () => {
    setUsers(null);
  };

  return (
    <div className={classes["search-container"]}>
      <div className={classes.search}>
        <TextField
          onChange={searchHandler}
          onFocus={searchHandler}
          onBlur={cancelSearch}
          id="standard-basic"
          label="search users"
          variant="outlined"
          color="primary"
          sx={{ width: "20rem", mt: "0.5rem" }}
        />
        {users && <SearchedUsersList users={users} />}
      </div>
    </div>
  );
};

export default SearchUser;
