import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addRoom } from "../actions/roomActions";
import { getUsers } from "../actions/userActions.js";
import classnames from "../utils/classnames";

const NewRoomForm = ({ getUsers, addRoom, isLoading, user, users = [] }) => {
  const [name, setName] = useState("");
  const [members, setMembers] = useState([]);

  useEffect(() => {
    getUsers();
    // eslint-disable-next-line
  }, []);

  const submit = (e) => {
    e.preventDefault();
    addRoom({ name, members, admins: [user._id] });
  };

  const updateMembers = (id) => {
    if (members.includes(id)) setMembers(members.filter((m) => m !== id));
    else setMembers([...members, id]);
  };

  if (isLoading || !user)
    return <div>You need to log in to start chatting!</div>;

  return (
    <div>
      <h1>ADD A NEW ROOM</h1>
      <form onSubmit={submit}>
        <label>
          Choose a room name:
          <input
            type="text"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>
        <br />
        <label>Select members to invite to the room:</label>
        {users
          // .filter((u) => u._id !== user._id)
          .map((u) => (
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
        <input type="submit" value="Submit" />
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
