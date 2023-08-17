import React, { useState, useContext } from "react";

import { useNavigate } from "react-router-dom";

import AuthContext from "../contexts/auth-context";

import SettingsModalForm from "./SettingsModalForm";

import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Divider from "@mui/material/Divider";
import Modal from "@mui/material/Modal";

import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import Settings from "@mui/icons-material/Settings";
import Logout from "@mui/icons-material/Logout";

const AvatarIcon = () => {
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);

  const authCtx = useContext(AuthContext);

  const navigate = useNavigate();

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

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

  const closeSettingsModalHandler = () => {
    setIsSettingsModalOpen(false);
  };

  return (
    <>
      <IconButton
        onClick={handleClick}
        size="small"
        // sx={{ ml: 2 }}
        aria-controls={open ? "account-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
      >
        <Avatar color="primary">{nameInitials}</Avatar>
      </IconButton>
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
        <MenuItem onClick={() => setIsSettingsModalOpen(true)}>
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
      <Modal
        onClose={closeSettingsModalHandler}
        open={isSettingsModalOpen}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div>
          <SettingsModalForm
            closeSettingsModalHandler={closeSettingsModalHandler}
          />
        </div>
      </Modal>
    </>
  );
};

export default AvatarIcon;
