import React, { useContext } from "react";

import { Link, useNavigate } from "react-router-dom";

import MUILink from "@mui/material/Link";
import TextField from "@mui/material/TextField";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Divider from "@mui/material/Divider";

import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import Settings from "@mui/icons-material/Settings";
import Logout from "@mui/icons-material/Logout";

import logo from "../static/logo-transparent-png.png";

import AuthContext from "../contexts/auth-context";

import classes from "./ProfileNavigation.module.css";

const ProfileNavigaion = () => {
  const authCtx = useContext(AuthContext);

  const navigate = useNavigate();

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const buttonStyle = {
    fontSize: "1.1rem",
    margin: "1rem",
  };

  // finding the name initials for the avatar
  let nameInitials;
  if (authCtx.user) {
    nameInitials = authCtx.user.name
      .split(" ")
      .map((word) => word[0])
      .slice(0, 2)
      .join("");
  }

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const profileClickHandler = () => {
    navigate("/profile");
    handleClose();
  };

  const logoutClickHandler = () => {
    authCtx.onLogout();

    navigate("/");
  };

  return (
    <div className={classes.nav}>
      <div>
        <MUILink component={Link} to="/profile" sx={buttonStyle}>
          <img src={logo} alt="GiftMap Logo" className={classes.logo} />
        </MUILink>
      </div>
      <div className={classes.search}>
        <TextField
          id="standard-basic"
          label="search users"
          variant="outlined"
          color="primary"
          sx={{ width: "20rem", mt: "0.5rem" }}
        />
      </div>
      <div className={classes["profile-icon"]}>
        <IconButton
          onClick={handleClick}
          size="small"
          sx={{ ml: 2 }}
          aria-controls={open ? "account-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
        >
          <Avatar color="primary">{nameInitials}</Avatar>
        </IconButton>
      </div>
      <Menu
        onBlur={handleClose}
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 1.5,
            "& .MuiAvatar-root": {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            "&:before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <MenuItem onClick={profileClickHandler}>
          <Avatar /> Profile
        </MenuItem>
        <Divider />
        <MenuItem>
          <ListItemIcon>
            <Settings fontSize="small" />
          </ListItemIcon>
          Settings
        </MenuItem>
        <MenuItem onClick={logoutClickHandler}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
    </div>
  );
};

export default ProfileNavigaion;
