import React, { useState, useEffect } from "react";

import SearchedUsersList from "./SearchedUsersList";

import TextField from "@mui/material/TextField";

import classes from "./SearchUser.module.css";

const SearchUser = () => {
  const [users, setUsers] = useState(null);
  const [searchField, setSearchField] = useState("");
  const [isSearchedUsersShown, setIsSearchedUsersShown] = useState(false);
  const [viewportWidth, setViewportWidth] = useState(window.innerWidth);

  window.onresize = () => {
    setViewportWidth(window.innerWidth);
  };

  useEffect(() => {
    const identifier = setTimeout(async () => {
      if (searchField) {
        const response = await fetch(
          `/api/v1/users/all?name=${searchField}&limit=10`
        );
        const responseData = await response.json();
        setUsers(responseData.data);
      } else {
        setUsers(null);
      }
    }, 500);

    return () => {
      clearTimeout(identifier);
    };
  }, [searchField]);

  const searchFiledChangeHandler = (event) => {
    setSearchField(event.target.value);
  };

  const showSearchResultHandler = () => {
    setIsSearchedUsersShown(true);
  };

  const cancelSearch = (event) => {
    if (event.relatedTarget === null) setIsSearchedUsersShown(false);
  };

  return (
    <div className={classes["search-container"]}>
      <div className={classes.search} onBlur={cancelSearch}>
        <TextField
          onChange={searchFiledChangeHandler}
          onFocus={showSearchResultHandler}
          id="standard-basic"
          label="Search users"
          variant="outlined"
          color="primary"
          value={searchField}
          size="small"
          sx={{ width: viewportWidth <= 700 ? "12rem" : "20rem", mt: "0.5rem" }}
        />
        {isSearchedUsersShown && users && (
          <SearchedUsersList
            users={users}
            setIsSearchedUsersShown={setIsSearchedUsersShown}
            setSearchField={setSearchField}
          />
        )}
      </div>
    </div>
  );
};

export default SearchUser;
