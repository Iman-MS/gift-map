import React, { useState } from "react";

import IconButton from "@mui/material/IconButton";
import Modal from "@mui/material/Modal";

import AddIcon from "@mui/icons-material/Add";

import GiftForm from "./GiftForm";

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
      >
        <AddIcon color="primary" sx={{ fontSize: "2rem" }} />
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
