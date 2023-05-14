import React from "react";

import classes from "./MainNavigation.module.css";

const MainNavigation = () => {
  return (
    <div className={classes.navigation}>
      <div className={classes.icon}>GiftMap</div>
      <div>
        <a className={classes.button}>login</a>
        <a className={classes.button}>create account</a>
        <a className={classes.button}>more</a>
        <a className={classes.button}>about</a>
        <a className={classes.button}>search</a>
      </div>
    </div>
  );
};

export default MainNavigation;
