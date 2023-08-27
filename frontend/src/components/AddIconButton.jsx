import React, { useState } from "react";

import IconButton from "@mui/material/IconButton";
import Modal from "@mui/material/Modal";

// import AddCircleIcon from "@mui/icons-material/AddCircle";
import AddIcon from "@mui/icons-material/Add";

import GiftForm from "./GiftForm";

import classes from "./AddIconButton.module.css";

const AddIconButton = ({ setGifts }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const addClickHandler = () => {
    setIsModalOpen(true);
  };

  const closeModalHandler = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <IconButton
        aria-label="add"
        color="primary"
        size="large"
        onClick={addClickHandler}
        className={classes["icon-button"]}
      >
        <AddIcon color="primary" sx={{ fontSize: "3rem", color: "#fff" }} />
      </IconButton>
      <Modal
        onClose={closeModalHandler}
        open={isModalOpen}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div>
          <GiftForm
            setGifts={setGifts}
            closeModalHandler={closeModalHandler}
            method="POST"
          />
        </div>
      </Modal>
    </>
  );
};

export default AddIconButton;
