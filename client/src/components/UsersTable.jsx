import React from "react";
import PropTypes from "prop-types";

const UsersTable = ({ users = [], onlineUsers = [] }) => {
  return (
    <table>
      <thead>
        <tr>
          <th></th>
          <th>Username</th>
          <th>Email</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user) => (
          <tr key={user._id}>
            <td
              className={`status ${
                onlineUsers.includes(user._id) ? "online" : ""
              }`}
            >
              •
            </td>
            <td>{user.name}</td>
            <td>{user.email}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

UsersTable.propTypes = {
  users: PropTypes.array,
  onlineUsers: PropTypes.array,
};

export default UsersTable;
