import React from "react";

import Tooltip from "@mui/material/Tooltip";
import Zoom from "@mui/material/Zoom";
import IconButton from "@mui/material/IconButton";
import ShareIcon from "@mui/icons-material/Share";

const ShareProfileButton = ({ userID }) => {
  const shareIconClickHandler = () => {
    navigator.clipboard.writeText(
      `${window.location.origin}/profile/${userID}`
    );
  };

  return (
    <>
      <Tooltip
        arrow
        TransitionComponent={Zoom}
        placement="top"
        title="Share this gift list!"
      >
        <IconButton
          aria-label="add"
          color="primary"
          size="large"
          onClick={shareIconClickHandler}
        >
          <ShareIcon />
        </IconButton>
      </Tooltip>
    </>
  );
};

export default ShareProfileButton;
