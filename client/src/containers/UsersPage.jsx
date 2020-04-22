import React, { useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getUsers } from "../actions/userActions";

const UsersPage = ({ users, getUsers }) => {
  useEffect(() => {
    getUsers();
    // eslint-disable-next-line
  }, []);
  return (
    <div>
      <h1>USERS</h1>
      <ul>
        {users.map((user) => (
          <li key={user._id}>{user.name}</li>
        ))}
      </ul>
    </div>
  );
};

UsersPage.propTypes = {
  users: PropTypes.array,
  getUsers: PropTypes.func,
};

const mapStateToProps = (state) => ({
  users: state.allUsers.users,
});

export default connect(mapStateToProps, { getUsers })(UsersPage);
