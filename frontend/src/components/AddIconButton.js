import React, { useState } from "react";

import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";

import AddIcon from "@mui/icons-material/Add";

import AddGiftForm from "./AddGiftForm";

const AddIconButton = () => {
  const [isOpen, setIsOpen] = useState(false);

  const addClickHandler = () => {
    setIsOpen(true);
  };

  const closeModalHandler = () => {
    setIsOpen(false);
  };

  return (
    <>
      <Button onClick={addClickHandler}>
        <AddIcon color="primary" sx={{ fontSize: "2rem" }} />
      </Button>
      <Modal
        onClose={closeModalHandler}
        open={isOpen}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <AddGiftForm />
      </Modal>
    </>
  );
};

export default AddIconButton;
