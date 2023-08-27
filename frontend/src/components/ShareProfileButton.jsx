import React, { useState } from "react";

import Tooltip from "@mui/material/Tooltip";
import Zoom from "@mui/material/Zoom";
import IconButton from "@mui/material/IconButton";
import ShareIcon from "@mui/icons-material/Share";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

const ShareProfileButton = ({ userID }) => {
  const [isCopiedMessageOpen, setIsCopiedMessageOpen] = useState(false);

  const shareIconClickHandler = () => {
    navigator.clipboard.writeText(
      `${window.location.origin}/profile/${userID}`
    );

    setIsCopiedMessageOpen(true);
  };

  const closeCopiedMessageHandler = () => {
    setIsCopiedMessageOpen(false);
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
      <Snackbar
        open={isCopiedMessageOpen}
        autoHideDuration={4000}
        onClose={closeCopiedMessageHandler}
      >
        <Alert
          severity="success"
          elevation={6}
          variant="filled"
          sx={{ width: "100%" }}
          onClose={closeCopiedMessageHandler}
        >
          Link copied!
        </Alert>
      </Snackbar>
    </>
  );
};

export default ShareProfileButton;
