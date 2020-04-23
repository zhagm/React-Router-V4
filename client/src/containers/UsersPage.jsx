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
      <table>
        <thead>
          <tr>
            <th>Username</th>
            <th>Email</th>
            <th>ID</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user._id}</td>
            </tr>
          ))}
        </tbody>
      </table>
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
