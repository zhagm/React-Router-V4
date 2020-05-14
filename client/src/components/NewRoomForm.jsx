import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addRoom } from "../actions/roomActions";
import { getUsers } from "../actions/userActions.js";
import { Button } from "reactstrap";
import classnames from "../utils/classnames";

const NewRoomForm = ({
  cancel,
  getUsers,
  addRoom,
  isLoading,
  user,
  users = [],
}) => {
  const [name, setName] = useState("");
  const [members, setMembers] = useState([]);
  const [description, setDescription] = useState([]);

  useEffect(() => {
    getUsers();
    // eslint-disable-next-line
  }, []);

  const submit = (e) => {
    e.preventDefault();
    addRoom({ name, members, description, admins: [user._id] });
    cancel();
  };

  const updateMembers = (id) => {
    if (members.includes(id)) setMembers(members.filter((m) => m !== id));
    else setMembers([...members, id]);
  };

  if (isLoading || !user)
    return <div>You need to log in to start chatting!</div>;

  return (
    <div>
      <form onSubmit={submit}>
        <div>
          <label>
            Choose a room name:
            <br />
            <input
              type="text"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </label>
        </div>
        <div>
          <label>
            Room Description:
            <br />
            <input
              type="textbox"
              name="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </label>
        </div>
        <br />
        <label>Select members to invite to the room:</label>
        {users.map((u) => (
          <div
            key={u._id}
            onClick={() => updateMembers(u._id)}
            className={classnames("userSelect", {
              selected: members.includes(u._id),
            })}
          >
            {u.name}
          </div>
        ))}
        <div className="text-right pt-3">
          <Button
            color="danger"
            data-dismiss="modal"
            type="button"
            onClick={cancel}
          >
            Cancel
          </Button>
          <Button color="success" type="submit" onClick={submit}>
            Create New Room
          </Button>
        </div>
      </form>
    </div>
  );
};

NewRoomForm.propTypes = {
  addRoom: PropTypes.func.isRequired,
  getUsers: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  isLoading: PropTypes.bool.isRequired,
  users: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.auth.user,
  isLoading: state.auth.isLoading,
  users: state.allUsers.users,
});

export default connect(mapStateToProps, {
  getUsers,
  addRoom,
})(NewRoomForm);
