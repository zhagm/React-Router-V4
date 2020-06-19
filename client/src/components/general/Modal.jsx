import React from "react";
import { modalStyles as useStyles } from "../../utils/makeStylers";
import Modal from "@material-ui/core/Modal";

/**
 * Returns hidden modal object that will be visible when open prop is passed true.
 * @function Modal
 * @param {bool} open - whether or not the modal is open.
 * @param {func} handleClose - modal close handler.
 * @param {obj} children - what to render inside the modal.
 * @returns {Material UI Modal}
 */
const SimpleModal = ({ open, handleClose, children }) => {
  const classes = useStyles();

  const modalStyle = {
    top: `50%`,
    left: `50%`,
    transform: `translate(-50%, -50%)`,
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
    >
      <div style={modalStyle} className={classes.paper}>
        {children}
      </div>
    </Modal>
  );
};

export default SimpleModal;
