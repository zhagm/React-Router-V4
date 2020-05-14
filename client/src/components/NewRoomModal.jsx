import React, { useState } from "react";
import { Button, Modal } from "reactstrap";
import NewRoomForm from "./NewRoomForm";

const NewRoomModal = ({ buttonText, title }) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleModal = () => {
    setIsOpen(!isOpen);
  };
  return (
    <React.Fragment>
      <Button color="primary" type="button" onClick={toggleModal}>
        {buttonText}
      </Button>
      <Modal
        className="modal-dialog-centered"
        isOpen={isOpen}
        toggle={toggleModal}
      >
        <div className="modal-header">
          <h5 className="modal-title" id="exampleModalLabel">
            {title}
          </h5>
        </div>
        <div className="modal-body">
          <NewRoomForm cancel={toggleModal} />
        </div>
        {/* <div className="modal-footer">
          <Button
            color="danger"
            data-dismiss="modal"
            type="button"
            onClick={toggleModal}
          >
            Cancel
          </Button>
          <Button
            color="success"
            type="button"
            onClick={() => setSumbitting(true)}
          >
            {confirmButtonText}
          </Button>
        </div> */}
      </Modal>
    </React.Fragment>
  );
};

export default NewRoomModal;
