import React from "react";

import TextField from "@mui/material/TextField";

const SearchUser = () => {
  const searchChangeHandler = (event) => {
    console.log(event.target.value);
  };

  return (
    <>
      <TextField
        onChange={searchChangeHandler}
        id="standard-basic"
        label="search users"
        variant="outlined"
        color="primary"
        sx={{ width: "20rem", mt: "0.5rem" }}
      />
    </>
  );
};

export default SearchUser;
